import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Rating,
} from "@mui/material";

import { useThemeContext } from "../../theme/ThemeContext";

import { IReviewDetail } from "../../models/Course";

interface ReviewItemProps {
  review: IReviewDetail;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 3,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
        border: "2px solid", // Solid border
        borderColor: "grey.300", // Border color from the theme
        overflow: "hidden", // Ensures border-radius applies properly
        "&:hover": {
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Elevated shadow on hover
        },
        backgroundColor: "background.paper",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            alt={`Toan Nguyen`}
            src="https://brightora.s3.amazonaws.com/userPhoto/1732967549831.png"
          />
        }
        title={`Toan Nguyen`}
        subheader={`Rating: ${review.rating}`}
      />
      <CardContent>
        <Rating value={review.rating} readOnly />
        <Typography variant="body2" color="text.secondary">
          {review.comment}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 1 }}
        >
          <strong>Created at:</strong>{" "}
          {new Date(review.created_at).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewItem;
