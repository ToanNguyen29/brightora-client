import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { ICourseCard } from "../../../models/Course";
import { useNavigate } from "react-router-dom";
import CourseRating from "../../course/header/CourseRating";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteItemFromWishlistMe } from "../../../services/WishListService";
import { useTranslation } from "react-i18next";
import PriceSection from "../../course/rightbox/PriceSection";

interface CourseProps {
  course: ICourseCard;
  isWishListCard?: boolean;
  fetchWishList?: () => Promise<void>;
}

const CourseCard: React.FC<CourseProps> = ({
  course,
  isWishListCard = false,
  fetchWishList,
}) => {
  const token = localStorage.getItem("token");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log("Date", course);
    navigate(`/course/${course._id}`);
  };

  const handleDelete = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!fetchWishList) return;
    console.log("Delete clicked");
    try {
      await deleteItemFromWishlistMe(token, course._id).then((data) => {
        console.log(data);
        if (data.status <= 205) {
          fetchWishList();
        }
      });
    } catch (error) {}
  };

  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        position: "relative",
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
      {isWishListCard && (
        <IconButton
          sx={{
            position: "absolute",
            top: "8px",
            right: "8px",
            color: "red",
            zIndex: 10,
          }}
          onClick={handleDelete} // Gọi hàm xử lý delete click
        >
          <DeleteIcon />
        </IconButton>
      )}

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
            WebkitLineClamp: 2, // Giới hạn tiêu đề trong 2 dòng
            // height: "2.8em", // Đặt chiều cao tối đa bằng 2 dòng
            // lineHeight: "1.4em",
            fontSize: "1.1rem",
          }}
        >
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {course.owner.first_name} {course.owner.last_name}
        </Typography>
        <CourseRating
          rating={course.review.average_rating}
          numberRating={course.review.total_reviews}
        />

        <Box>
          {course.discount_percentage ? (
            <Box
              sx={{
                display: "flex",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  mr: 2,
                  fontWeight: "bold",
                  alignContent: "center",
                  textAlign: "center",
                }}
              >
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(
                  (course.price * (100 - course?.discount_percentage)) / 100
                )}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  textDecoration: "line-through",
                  color: "gray",
                  alignContent: "center",
                  textAlign: "center",
                }}
              >
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(course.price)}
              </Typography>
            </Box>
          ) : (
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                fontWeight: "bold",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(course.price)}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {course.review.average_rating >= 4.5 && (
            <Typography
              variant="caption"
              sx={{
                bgcolor: "#FFB74D",
                fontSize: "0.7rem",
                color: "white",
                borderRadius: 1,
                px: 0.5,
                py: 0.25,
              }}
            >
              {t("high_rating")}
            </Typography>
          )}
          {course.updated_at &&
            new Date(course.updated_at) >=
              new Date(new Date().setMonth(new Date().getMonth() - 3)) && (
              <Typography
                variant="caption"
                sx={{
                  bgcolor: "success.main", // Màu xanh
                  color: "white",
                  fontSize: "0.7rem",
                  borderRadius: 1,
                  px: 0.5,
                  py: 0.25,
                }}
              >
                {t("updated_recently")}
              </Typography>
            )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
