import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Rating,
  TextField,
  Typography,
  Pagination, // Import Pagination
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
  const [totalPages, setTotalPages] = useState<number>(1); // Tổng số trang

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  // Fetch user's review
  useEffect(() => {
    if (!courseId) return;
    const fetchReviewMeOfCourse = async () => {
      const data = await getReviewMeOfCourse(token, courseId);
      if (data.status <= 305) {
        setRating(data.data.data.rating);
        setComment(data.data.data.comment);
        setReviewId(data.data.data._id);
        setIsRated(true);
      }
    };
    fetchReviewMeOfCourse();
  }, [token, courseId]);

  // Fetch all reviews
  const fetchReview = useCallback(async () => {
    if (!courseId) return;
    try {
      const data = await getReviewByCourse(courseId, pageNumber, pageSize);
      console.log("getReviewByCourse", data);
      if (data.status <= 305) {
        setReviews(data.data.data); // Dữ liệu đánh giá
        setTotalPages(Math.ceil(data.data.total_items / pageSize)); // Tính tổng số trang
      }
    } catch (error) {
      console.error(error);
    }
  }, [courseId, pageNumber, pageSize]);

  useEffect(() => {
    fetchReview();
  }, [fetchReview]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageNumber(value);
  };

  const handleSubmitRating = async () => {
    if (!courseId) return;
    try {
      await createReview(token, courseId, rating, comment);
      fetchReview();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateRating = async () => {
    try {
      await updateReview(token, reviewId, rating, comment);
      fetchReview();
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
          width: "80%",
          alignItems: "center",
          mx: "auto",
        }}
      >
        <Rating
          value={rating}
          precision={0.5}
          onChange={(e, newValue) => setRating(newValue || 1)}
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
          onClick={() =>
            isRated ? handleUpdateRating() : handleSubmitRating()
          }
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
        <ReviewItem key={review._id} review={review} />
      ))}

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={pageNumber}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Reviews;
