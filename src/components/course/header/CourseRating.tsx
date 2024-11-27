import React from "react";
import { Rating, Typography, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useThemeContext } from "../../../theme/ThemeContext";

interface CourseRatingProps {
  rating: number;
  numberRating: number;
}

const CourseRating: React.FC<CourseRatingProps> = ({
  rating,
  numberRating,
}) => {
  const { mode } = useThemeContext();
  const textColor = mode === "light" ? "black" : "white";

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        width: "100%", // Để component tự co dãn theo chiều ngang của cha
      }}
    >
      {/* Số rating */}
      <Typography
        //   fontSize="smal"
        sx={{
          color: textColor,
          fontWeight: "bold",
        }}
      >
        {rating.toFixed(1)}
      </Typography>

      {/* Ngôi sao */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Rating
          name="read-only"
          value={rating}
          precision={0.1}
          readOnly
          icon={<StarIcon fontSize="small" />} // Thay đổi kích thước ở đây
          sx={{ color: "#FFD700" }}
        />
      </Box>

      <Typography
        fontSize="small"
        sx={{
          color: textColor,
          textAlign: "right",
          // Tự co dãn để phù hợp
        }}
      >
        ({numberRating.toLocaleString()})
      </Typography>
    </Box>
  );
};

export default CourseRating;
