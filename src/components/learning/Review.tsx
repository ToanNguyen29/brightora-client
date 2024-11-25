// Reviews.tsx
import React from 'react';
import { Box, TextField, Button, Divider, Card, CardHeader, CardContent, Avatar, Rating, Typography } from "@mui/material";

interface Review {
  id: string;
  name: string;
  rating: number;
  content: string;
}

interface ReviewsProps {
  reviews: Review[];
  newReview: { name: string; rating: number; content: string };
  setNewReview: React.Dispatch<React.SetStateAction<{ name: string; rating: number; content: string }>>;
  handleAddReview: () => void;
}

const Reviews: React.FC<ReviewsProps> = ({ reviews, newReview, setNewReview, handleAddReview }) => (
  <Box p={3}>
    <Typography variant="h6" gutterBottom>Add a Review</Typography>
    <TextField 
      variant="outlined" 
      label="Your Name" 
      fullWidth 
      value={newReview.name}
      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
      sx={{ mb: 2 }}
    />
    <Rating 
      value={newReview.rating} 
      onChange={(e, newRating) => setNewReview({ ...newReview, rating: newRating ?? 0 })} 
      sx={{ mb: 2 }}
    />
    <TextField 
      variant="outlined" 
      label="Your Review" 
      fullWidth 
      multiline 
      rows={4}
      value={newReview.content}
      onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
      sx={{ mb: 2 }}
    />
    <Button variant="contained" color="primary" onClick={handleAddReview}>Submit Review</Button>
    <Divider sx={{ my: 3 }} />
    <Typography variant="h6">Reviews</Typography>
    {reviews.map((review) => (
      <Card key={review.id} sx={{ mb: 2 }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>{review.name.charAt(0)}</Avatar>}
          title={review.name}
          subheader={<Rating value={review.rating} readOnly precision={0.5} />}
        />
        <CardContent>
          <Typography>{review.content}</Typography>
        </CardContent>
      </Card>
    ))}
  </Box>
);

export default Reviews;
