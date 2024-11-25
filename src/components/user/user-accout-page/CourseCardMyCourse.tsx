import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
// import { CourseTypeShow } from "../../../models/Course";
import { useNavigate } from "react-router-dom";
import { IOwner } from "../../../models/Course";

interface CourseItem {
  _id: string;
  thumbnail: string;
  title: string;
  duration: number;
  buying: number;
  owner: IOwner;
  price: number;
  review: any;
  tag: string[];
}

interface CourseProps {
  course: CourseItem;
}

const CourseCardMyCourse: React.FC<CourseProps> = ({ course }) => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleCardClick = () => {
    navigate(`/course/${course._id}`); // Change this to your route
  };
  return (
    <Card
      sx={{ maxWidth: 345, maxHeight: 350, cursor: "pointer" }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="160"
        image={course.thumbnail}
        alt={course.title}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            height: 58,
          }}
        >
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.duration} - {course.price}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {course.owner.first_name} {course.owner.last_name}
        </Typography>
        <Typography variant="body2" style={{ fontWeight: "bold" }}>
          {course.review.averageRating} Stars ({course.buying} students)
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {course.tag &&
            course.tag.map((tag: string, index: number) => (
              <Typography
                key={index}
                variant="caption"
                sx={{
                  bgcolor: "secondary.main",
                  color: "white",
                  borderRadius: 1,
                  px: 1,
                  py: 0.25,
                }}
              >
                {tag}
              </Typography>
            ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseCardMyCourse;
