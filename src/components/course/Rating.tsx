import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";
import { Box, Paper, Typography, Button } from "@mui/material";
import RatingList from "./rating/RatingList";
import RatingModal from "./rating/RatingModal";
import { getReviewByCourse } from "../../services/ReviewService";
import { IReview, IReviewDetail } from "../../models/Course";
import StarIcon from "@mui/icons-material/Star";

interface RatingProps {
  courseId: string | undefined;
  ratingStat: IReview | undefined;
}

const Rating: React.FC<RatingProps> = ({ courseId, ratingStat }) => {
  const { mode } = useThemeContext();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const page_size = 4;
  const page_number = 1;

  const [reviewsOfCourse, setReviewOfCourse] = useState<IReviewDetail[]>();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";
  const headerBackgroundColor = mode === "light" ? "#f0f0f0" : "#333333";

  useEffect(() => {
    if (!courseId) return;
    const fetchReview = async () => {
      try {
        await getReviewByCourse(courseId, page_number, page_size).then(
          (data) => {
            console.log("getReviewByCourse", data);
            if (data.status <= 305) {
              setReviewOfCourse(data.data.data);
            }
          }
        );
      } catch (error) {}
    };
    fetchReview();
  }, [courseId]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: backgroundColor,
          mb: "20px",
          width: "100%",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            borderRadius: "12px",
            backgroundColor: backgroundColor,
            color: textColor,
            padding: 2,
            width: "100%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 2,
              textAlign: "center",
              backgroundColor: headerBackgroundColor,
              borderRadius: "4px",
              color: textColor,
              padding: "8px",
            }}
          >
            {t("rating")}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              mb: 2,
              display: "flex",

              color: textColor,
              padding: "8px",
            }}
          >
            <StarIcon sx={{ mr: 1 }} />
            {`${ratingStat?.average_rating.toFixed(1)} course rating  - ${
              ratingStat?.total_reviews
            } ratings`}
          </Typography>

          <RatingList
            ratings={reviewsOfCourse}
            textColor={textColor}
            backgroundColor={backgroundColor}
            headerBackgroundColor={headerBackgroundColor}
            isGrid={true} // Two items per row
          />

          <Button
            variant="outlined"
            sx={{
              mt: 2,
              display: "block",
              mx: "auto",
              borderColor: textColor,
              color: textColor,
            }}
            onClick={handleOpen}
          >
            {t("show_more")}
          </Button>
        </Paper>
      </Box>

      <RatingModal
        open={open}
        onClose={handleClose}
        courseId={courseId}
        ratingStat={ratingStat}
        textColor={textColor}
        backgroundColor={backgroundColor}
        headerBackgroundColor={headerBackgroundColor}
      />
    </>
  );
};

export default Rating;
