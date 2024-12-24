// Reviews.tsx
import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import RatingStats from "../course/rating/RatingStats";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import {
  createReview,
  getReviewByCourse,
  getReviewMeOfCourse,
  updateReview,
} from "../../services/ReviewService";
import { IReview, IReviewDetail } from "../../models/Course";
import ReviewItem from "../review/ReviewItem";

interface ReviewsProps {
  courseId: string | undefined;
  reviewStat: IReview | undefined;
}

const Reviews: React.FC<ReviewsProps> = ({ reviewStat, courseId }) => {
  const token = localStorage.getItem("token");
  const [rating, setRating] = useState<number>(1);
  const [comment, setComment] = useState<string>("");
  const [reviews, setReviews] = useState<IReviewDetail[]>();
  const [isRated, setIsRated] = useState<boolean>(false);
  const [reviewId, setReviewId] = useState("");
  const { t } = useTranslation();
  const { mode } = useThemeContext();

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  useEffect(() => {
    if (!courseId) return;
    const fetchReviewMeOfCourse = async () => {
      await getReviewMeOfCourse(token, courseId).then((data) => {
        console.log(data);
        if (data.status <= 305) {
          setRating(data.data.data.rating);
          setComment(data.data.data.comment);
          setReviewId(data.data.data._id);
          setIsRated(true);
        }
      });
    };
    fetchReviewMeOfCourse();
  }, [token, courseId]);

  useEffect(() => {
    console.log("hello My", courseId);
    if (!courseId) return;
    const fetchReview = async () => {
      try {
        await getReviewByCourse(courseId, pageNumber, pageSize).then((data) => {
          console.log("getReviewByCourseInstructor", data);
          if (data.status <= 305) {
            setReviews(data.data.data);
          }
        });
      } catch (error) {}
    };
    fetchReview();
  }, [courseId, pageNumber, pageSize]);

  const fetchReview = useCallback(async () => {
    if (!courseId) return;
    try {
      await getReviewByCourse(courseId, pageNumber, pageSize).then((data) => {
        console.log("getReviewByCourseInstructor", data);
        if (data.status <= 305) {
          setReviews(data.data.data);
        }
      });
    } catch (error) {}
  }, [courseId, pageNumber, pageSize]);

  useEffect(() => {
    fetchReview();
  }, [fetchReview]);

  const handleSubmitRating = async () => {
    if (!courseId) return;
    try {
      await createReview(token, courseId, rating, comment).then((data) => {
        console.log(data.data);
        if (data.status <= 305) {
          fetchReview();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateRating = async () => {
    try {
      await updateReview(token, reviewId, rating, comment).then((data) => {
        console.log(data.data);
        if (data.status <= 305) {
          fetchReview();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box pb={3} pl={10} pr={10} pt={3}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ mx: "10%", fontWeight: "bold" }}
      >
        {t("your_review")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "70%",
          alignItems: "center",
          mx: "auto",
        }}
      >
        <Rating
          value={rating}
          precision={0.5}
          onChange={(e, newValue) => {
            setRating(newValue || 1);
          }}
          sx={{ mb: 2 }}
        />
        <TextField
          label={t("Review")}
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{
            mb: 2,
            borderColor: textColor,
            color: textColor,
            backgroundColor: backgroundColor,
          }}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            if (!isRated) handleSubmitRating();
            else handleUpdateRating();
          }}
          sx={{
            width: "20%",
            borderColor: textColor,
            color: textColor,
            backgroundColor: backgroundColor,
          }}
        >
          {t("submit")}
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />
      <Typography
        variant="h6"
        gutterBottom
        sx={{ mx: "10%", fontWeight: "Bold", mb: 3 }}
      >
        {t("student_feedback")}
      </Typography>
      <RatingStats data={reviewStat} />
      {reviews?.map((review) => (
        <ReviewItem review={review} />
      ))}
    </Box>
  );
};

export default Reviews;
