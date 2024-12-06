import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";
import { useNavigate } from "react-router-dom";

import CourseRating from "../course/header/CourseRating";
import MouseEnterCourseBox from "./MouseEnterCourseBox";

interface SearchCourseItemProps {
  id: string;
  thumbnail: string;
  title: string;
  subtitle: string;
  first_name: string;
  last_name: string;
  rating: number;
  numberRating: number;
  updated_at: string;
  price: number;
  level: string[];
  discount_percentage?: number;
}

const SearchCourseItem: React.FC<SearchCourseItemProps> = ({
  id,
  thumbnail,
  title,
  subtitle,
  first_name,
  last_name,
  updated_at,
  rating,
  numberRating,
  price,
  discount_percentage,
  level,
}) => {
  const { mode } = useThemeContext();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <Box
      sx={{
        borderBottom: "1px solid",
        borderColor: mode === "light" ? "#ccc" : "#555",
        borderRadius: "0px",
        p: 1.5,
        width: "100%",
        display: "flex",
        cursor: "pointer",
        backgroundColor: backgroundColor,
        color: textColor,
        position: "relative",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        onClick={() => navigate(`/course/${id}`)}
        sx={{
          flex: 6,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            mr: 1.5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={thumbnail}
            alt={title}
            style={{
              aspectRatio: "16/9",
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>
        <Box sx={{ flex: 3, textAlign: "left", ml: 3 }}>
          <Typography
            variant="body1"
            sx={{
              color: textColor,
              fontWeight: "bold",
              mb: 0.5,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: textColor,
              mb: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {subtitle}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: textColor, mb: 0.5, fontSize: "0.9rem" }}
          >
            {first_name} {last_name}
          </Typography>

          <CourseRating rating={rating} numberRating={numberRating} />

          <Box sx={{ display: "flex" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.8rem",
                mr: 1,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              {t("level")}:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.8rem",
                mr: 3,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              {level.join(", ")}
            </Typography>
            {updated_at && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ color: textColor, fontSize: "0.9rem" }}
              >
                {t("updated_at")}: {updated_at.slice(0, 10)}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      {/* Price Section */}
      <Box
        sx={{
          flex: 1,
        }}
      >
        {discount_percentage ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format((price * (100 - discount_percentage)) / 100)}
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
              }).format(price)}
            </Typography>
          </Box>
        ) : (
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              alignContent: "center",
              textAlign: "center",
            }}
          >
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(price)}
          </Typography>
        )}
      </Box>

      {isHovered && (
        <MouseEnterCourseBox
          id={id}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      )}
    </Box>
  );
};

export default SearchCourseItem;
