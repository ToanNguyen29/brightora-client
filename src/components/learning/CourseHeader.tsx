// CourseHeader.tsx
import React from 'react';
import { Box, Typography, Rating } from "@mui/material";

interface CourseHeaderProps {
  title: string;
  rating: number;
  reviewCount: number;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ title, rating, reviewCount }) => (
  <Box display="flex" flexDirection="column" mb={3}>
    <Typography variant="h4" fontWeight="bold">{title}</Typography>
    <Box display="flex" alignItems="center" mt={1}>
      <Rating value={rating} readOnly precision={0.5} sx={{ mr: 1 }} />
      <Typography variant="body2">({rating}) {reviewCount} Reviews</Typography>
    </Box>
  </Box>
);

export default CourseHeader;
