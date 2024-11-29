import React from "react";
import { Box, Typography, LinearProgress, Grid } from "@mui/material";
import { Star, StarHalf, StarBorder } from "@mui/icons-material";
import { IReview } from "../../../models/Course";

interface RatingData {
  data: IReview;
}

const RatingStats: React.FC<RatingData> = ({ data }) => {
  const stars = [5, 4, 3, 2, 1]; // Star rating levels in descending order
  const totalReviews = data.total_reviews;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => {
      if (index < rating)
        return <Star key={index} fontSize="small" color="warning" />;
      if (index < rating + 0.5)
        return <StarHalf key={index} fontSize="small" color="warning" />;
      return <StarBorder key={index} fontSize="small" color="warning" />;
    });
  };

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
      {/* Left Section: Average Rating */}
      <Box sx={{ textAlign: "center", width: "20%" }}>
        <Typography variant="h4" color="warning.main">
          {data.average_rating.toFixed(1)}
        </Typography>
        <Box>{renderStars(data.average_rating)}</Box>
        <Typography variant="subtitle2" color="text.secondary">
          Course Rating
        </Typography>
      </Box>

      {/* Right Section: Star Distribution */}
      <Box sx={{ flex: 1 }}>
        {stars.map((star) => {
          const starCount = data.star[`${star}_star`];
          const percentage = totalReviews
            ? (starCount / totalReviews) * 100
            : 0;

          return (
            <Grid container alignItems="center" spacing={1} key={star}>
              <Grid item xs={1}>
                {/* Star Icon */}
                <Typography>{star}</Typography>
              </Grid>
              <Grid item xs={7}>
                {/* Progress Bar */}
                <LinearProgress
                  variant="determinate"
                  value={percentage}
                  sx={{
                    height: 8,
                    borderRadius: 2,
                    backgroundColor: "grey.300",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "warning.main",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                {/* Star Icons */}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {renderStars(star)}
                </Box>
              </Grid>
              <Grid item xs={2}>
                {/* Percentage */}
                <Typography color="primary" variant="body2">
                  {Math.round(percentage)}%
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </Box>
    </Box>
  );
};

export default RatingStats;
