import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  LinearProgress,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IMyCourseCard } from "../../models/Course";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import StarIcon from "@mui/icons-material/Star";
import DialogRating from "./DialogRating";

interface CourseProps {
  course: IMyCourseCard;
}

const MyCourseCard: React.FC<CourseProps> = ({ course }) => {
  const navigate = useNavigate();
  const { mode } = useThemeContext();
  const { t } = useTranslation();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);

  const handleRatingOpen = (event: React.MouseEvent) => {
    event.stopPropagation();
    setRatingDialogOpen(true);
  };

  // const handleSubmitRating = async () => {
  //   try {
  //     await createReview(token, course._id, selectedRating, reviewText).then(
  //       (data) => {
  //         console.log(data);
  //       }
  //     );
  //   } catch (error) {}
  // };

  const handleCardClick = () => {
    navigate(`/course/${course._id}/learn`);
  };

  return (
    <>
      <DialogRating
        ratingDialogOpen={ratingDialogOpen}
        courseId={course._id}
        setRatingDialogOpen={setRatingDialogOpen}
      />
      <Card
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          position: "relative", // Đặt relative để nút Rate căn chỉnh dựa trên Card
          cursor: "pointer",
          boxShadow: "none",
          border: "none",
          "&:hover": {
            boxShadow: 6,
            transform: "translateY(-5px)",
            transition: "all 0.3s ease-in-out",
          },
        }}
        onClick={handleCardClick}
      >
        <CardMedia
          component="img"
          image={course.thumbnail}
          alt={course.title}
          sx={{
            aspectRatio: "16/9",
            objectFit: "cover",
            position: "relative",
          }}
        />

        <Button
          variant="outlined"
          onClick={handleRatingOpen}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            // zIndex: 1,
            color: textColor,
            borderColor: textColor,
            backgroundColor: backgroundColor,
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          <StarIcon sx={{ fontSize: "1rem", marginRight: 0.5 }} /> {t("rate")}
        </Button>

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            flexGrow: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              height: "2.8em", // Đặt chiều cao tối đa bằng 2 dòng
              lineHeight: "1.4em",
              fontSize: "1.1rem",
            }}
          >
            {course.title}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {course.owner.first_name} {course.owner.last_name}
          </Typography>

          {/* Linear Progress */}
          <Box sx={{ marginTop: 1 }}>
            <LinearProgress
              variant="determinate"
              value={50}
              sx={{
                marginTop: 1,
                height: 6,
                borderRadius: 3, // Góc bo tròn
              }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "left", marginTop: 0.5, fontSize: "0.7rem" }}
            >
              {50}% completed
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default MyCourseCard;
