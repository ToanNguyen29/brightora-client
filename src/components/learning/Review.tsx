// Reviews.tsx
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import RatingStats from "../course/rating/RatingStats";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";

// interface Review {
//   id: string;
//   name: string;
//   rating: number;
//   content: string;
// }

// interface ReviewsProps {
//   reviews: Review[];
//   newReview: { name: string; rating: number; content: string };
//   setNewReview: React.Dispatch<
//     React.SetStateAction<{ name: string; rating: number; content: string }>
//   >;
//   handleAddReview: () => void;
// }
const data = {
  average_rating: 5,
  course: "2",
  star: {
    "1_star": 0,
    "2_star": 0,
    "3_star": 0,
    "4_star": 0,
    "5_star": 3,
  },
  total_reviews: 5,
};
const Reviews: React.FC = () => {
  const [rating, setRating] = useState<number>(1);
  const [comment, setComment] = useState<string>();
  const [reviews, setReviews] = useState([
    {
      id: "1",
      name: "Toan",
      rating: 5,
      content: "Toan",
    },
  ]);
  const { t } = useTranslation();
  const { mode } = useThemeContext();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  return (
    <Box p={3}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ mx: "10%", fontWeight: "Bold" }}
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
          variant="outlined"
          label={t("your_review")}
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
            console.log("toan");
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
      <RatingStats data={data} />
      {reviews.map((review) => (
        <Card key={review.id} sx={{ mt: 3, width: "80%", mx: "auto" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "primary.main" }}>
                {review.name.charAt(0)}
              </Avatar>
            }
            title={review.name}
            subheader={
              <Rating value={review.rating} readOnly precision={0.5} />
            }
          />
          <CardContent>
            <Typography>{review.content}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Reviews;
