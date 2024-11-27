import { Box, Grid } from "@mui/material";
import CourseHeader from "../components/course/Header";
import RightBox from "../components/course/RightBox";
import CourseLearn from "../components/course/CourseLearn";
import CourseContent from "../components/course/CourseContent";
import Requiments from "../components/course/Requiments";
import Description from "../components/course/Description";
// import FeaturedReview from "../components/course/FeaturedReview";
import Intructor from "../components/course/Instructor";
import Rating from "../components/course/Rating";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourse } from "../services/CourseService";
import { ICourseInfoPage } from "../models/Course";

const CoursePage = () => {
  // const token = localStorage.getItem("token");
  const [course, setCourse] = useState<ICourseInfoPage | undefined>();
  // const [section, setSection] = useState();
  const navigate = useNavigate();
  const { courseId } = useParams();

  useEffect(() => {
    if (!courseId) return;
    const fetchCourse = async () => {
      await getCourse(courseId)
        .then((data) => {
          if (data.status <= 305) {
            console.log("course info page: ", data.data);
            setCourse(data.data);
          } else {
            console.log();
          }
        })
        .catch((err) => {
          alert("Error: " + err.detail);
        });
    };
    fetchCourse();
  }, [courseId]);

  const handleCheckout = async () => {
    if (courseId) {
      const courses = [];
      courses.push(course);
      navigate("/checkout", { state: { courses } });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "90vh",
        //   gap: 3,
        px: "20%",
        width: "100%",
        height: "100%",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <CourseHeader
            title={course?.title || ""}
            subtitle={course?.subtitle || ""}
            rating={course?.review.average_rating || 0}
            numberRating={course?.review.total_reviews || 0}
            students={100}
            owner={course?.owner || undefined}
            lastUpdated={course?.updated_at || ""}
            lang={course?.language || []}
            // sub="Dutch, French, German, Indonesian, Italian, Japanese, Korean, Polish, Portuguese, Simplified Chinese, Spanish, Thai, Turkish, Vietnamese"
          />
          <CourseLearn
            learningObjectives={course?.goals.learningObjectives || []}
          />
          <CourseContent courseId={courseId || ""} />
          <Requiments requirements={course?.goals.requirements || []} />
          <Description description={course?.description || ""} />
          {/* <FeaturedReview /> */}
          <Intructor owner_id={course?.owner._id || ""} />
          <Rating courseId={courseId} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              position: "sticky",
              top: 20,
            }}
          >
            <RightBox
              price={course?.price || 0}
              handleCheckout={handleCheckout}
              promotional_video={course?.promotional_video || ""}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CoursePage;
