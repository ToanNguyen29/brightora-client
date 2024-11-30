import React, { useEffect, useState } from "react";
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  Box,
  Paper,
} from "@mui/material";
import { getCoursesMe } from "../services/CourseService";

import { useTranslation } from "react-i18next";
import { useThemeContext } from "../theme/ThemeContext";
import { getReviewByCourse } from "../services/ReviewService";
import { IReview, IReviewDetail } from "../models/Course";
import ReviewItem from "../components/review/ReviewItem";
import RatingStats from "../components/course/rating/RatingStats";

interface ICourse {
  _id: string;
  title: string;
  review: IReview;
}

const InstructorReviewPage: React.FC = () => {
  const token = localStorage.getItem("token");
  const [courses, setCourses] = useState<ICourse[] | undefined>();
  const [currentCourseId, setCurrentCourseId] = useState<string>();
  const [reviewOfCourse, setReviewOfCourse] = useState<
    IReviewDetail[] | undefined
  >();
  const [reviewStats, setReviewStats] = useState<IReview>();
  const [filteredReviews, setFilteredReviews] = useState<
    IReviewDetail[] | undefined
  >();
  const [filter, setFilter] = useState<string>("all");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const { t } = useTranslation();
  const { mode } = useThemeContext();

  useEffect(() => {
    const fetchCoursesMe = async () => {
      await getCoursesMe(token).then((data) => {
        if (data.status <= 305) {
          setCourses(data.data.data);
          if (data.data.data) {
            setCurrentCourseId(data.data.data[0]._id); // Set the first course as the default
            // console.log("course", data.data.data);
            setReviewStats(data.data.data[0].review);
          }
        }
      });
    };
    fetchCoursesMe();
  }, [token]);

  useEffect(() => {
    if (!currentCourseId) return;
    const fetchReview = async () => {
      try {
        await getReviewByCourse(currentCourseId, pageNumber, pageSize).then(
          (data) => {
            console.log("getReviewByCourseInstructor", data);
            if (data.status <= 305) {
              setReviewOfCourse(data.data.data);
            }
          }
        );
      } catch (error) {}
    };
    fetchReview();
  }, [currentCourseId, pageNumber, pageSize]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredReviews(reviewOfCourse);
    } else if (filter == "fivestar") {
      setFilteredReviews(
        reviewOfCourse?.filter((review) => review.rating == 5)
      );
    } else if (filter === "fourstar") {
      setFilteredReviews(
        reviewOfCourse?.filter((review) => review.rating == 4)
      );
    } else if (filter === "threestar") {
      setFilteredReviews(
        reviewOfCourse?.filter((review) => review.rating == 3)
      );
    } else if (filter === "twostart") {
      setFilteredReviews(
        reviewOfCourse?.filter((review) => review.rating == 2)
      );
    } else if (filter === "onestart") {
      setFilteredReviews(
        reviewOfCourse?.filter((review) => review.rating == 1)
      );
    }
  }, [filter, reviewOfCourse]);

  //   const handleReply = async (questionId: string) => {};

  return (
    <Box display="flex" sx={{ width: "100%" }}>
      {/* Left Box */}
      <Box
        sx={{
          width: "300px",
          border: "1px solid #ccc",
          padding: "16px",
          borderRadius: "8px",
          overflowY: "auto",
          marginRight: "16px",
          flexShrink: 0, // Prevent shrinking
          mb: 2,
        }}
      >
        <h3>Courses</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {courses &&
            courses.map((course) => (
              <li
                key={course._id}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  background:
                    currentCourseId === course._id ? "#e0e0e0" : "transparent",
                  borderRadius: "4px",
                }}
                onClick={() => {
                  setCurrentCourseId(course._id);
                  setReviewStats(course.review);
                }}
              >
                {course.title}
              </li>
            ))}
        </ul>
      </Box>
      {/* Right Box */}
      <Box
        sx={{
          flex: 1, // Take up the remaining space
          display: "flex",
          flexDirection: "column",
          width: "900px",
        }}
      >
        <RatingStats data={reviewStats} />
        <FormControl
          sx={{
            mb: 2,
            mt: 2,
          }}
        >
          <Select
            labelId="filter-label"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="fivestar">5 star</MenuItem>
            <MenuItem value="fourstar">4 star</MenuItem>
            <MenuItem value="threestar">3 star</MenuItem>
            <MenuItem value="twostar">2 star</MenuItem>
            <MenuItem value="onestar">1 star</MenuItem>
          </Select>
        </FormControl>
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
          }}
        >
          {filteredReviews && filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              //   <QAItem key={q._id} qAndA={q} onReplySubmit={handleReply} />
              <ReviewItem key={review._id} review={review} />
            ))
          ) : (
            <Paper
              elevation={0}
              sx={{
                p: 2,
                border: "1px solid",
                borderColor: "grey.300", // Light grey border color
                borderRadius: 2, // Rounded corners
                backgroundColor: "background.paper", // Background color from theme
                textAlign: "center", // Center-align text
              }}
            >
              <Typography variant="body1" color="text.secondary">
                No reviews match the filter.
              </Typography>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default InstructorReviewPage;
