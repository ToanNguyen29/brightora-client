import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Rating,
} from "@mui/material";

import { IReviewDetail } from "../../models/Course";

interface ReviewItemProps {
  review: IReviewDetail;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 2,
        borderColor: "grey.300",
        overflow: "hidden",
        "&:hover": {
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
        backgroundColor: "background.paper",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            alt={`${review.owner.first_name} ${review.owner.last_name}`}
            src={`${review.owner.photo}`}
          />
        }
        title={`${review.owner.first_name} ${review.owner.last_name}`}
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
