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
  level,
}) => {
  const { mode } = useThemeContext();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false); // State để kiểm soát hiển thị component phụ
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
        backgroundColor: backgroundColor,
        color: textColor,
        position: "relative", // Quan trọng để định vị component phụ
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      }}
      onMouseEnter={handleMouseEnter} // Hiển thị component phụ khi chuột di vào card
      onMouseLeave={handleMouseLeave} // Ẩn component phụ khi chuột di ra khỏi card
    >
      <Box
        onClick={() => navigate(`/course/${id}`)}
        sx={{
          flex: 6,
          display: "flex",
          alignItems: "center",
          mr: 1,
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
              maxWidth: "200px",
              maxHeight: "200px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>
        <Box sx={{ flex: 2, textAlign: "left" }}>
          <Typography
            variant="h6"
            sx={{
              color: textColor,
              fontWeight: "bold",
              mb: 1,
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: textColor,
              fontWeight: "bold",
              mb: 1,
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
            {t("By")}: {first_name} {last_name}
          </Typography>

          <CourseRating rating={rating} numberRating={numberRating} />
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5, fontSize: "0.9rem", mr: 3 }}
            >
              {t("level")}:
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                {level.map((item) => (
                  <Box
                    key={item}
                    sx={{
                      backgroundColor: "lightblue",
                      color: "black",
                      padding: "0.3rem 0.6rem",
                      borderRadius: "16px",
                      fontSize: "0.85rem",
                      display: "inline-block",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    }}
                  >
                    {item}
                  </Box>
                ))}
              </Box>
            </Typography>
            {updated_at && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ color: textColor, mt: 0.5, fontSize: "0.9rem" }}
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
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ color: textColor, fontWeight: "bold" }}>
          ${price.toFixed(2)}
        </Typography>
      </Box>

      {/* Component phụ (Hiển thị khi hover) */}
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
