import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Import icon trái tim
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";
import { useNavigate } from "react-router-dom";

export interface MouseEnterCourseBoxProps {
  id: string;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

const MouseEnterCourseBox: React.FC<MouseEnterCourseBoxProps> = ({ id }) => {
  const { mode } = useThemeContext();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  return (
    <Box
      sx={{
        position: "absolute",
        top: "auto",
        bottom: "100%",
        left: "70%",
        transform: "translateX(-40%)",
        minWidth: "300px",
        maxWidth: "450px",
        bgcolor: "background.paper",
        boxShadow: 3,
        p: 2,
        zIndex: 10,
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", // Align items to the left
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          fontWeight: "bold",
          color: textColor,
        }}
      >
        {t("What'll you learn?")}
      </Typography>

      {/* List of items */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="body2"
          sx={{
            color: textColor,
            mb: 0.5,
            fontSize: "0.9rem",
          }}
        >
          - {t("Learn the basics of React")}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: textColor,
            mb: 0.5,
            fontSize: "0.9rem",
          }}
        >
          - {t("Master state management")}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: textColor,
            fontSize: "0.9rem",
          }}
        >
          - {t("Build real-world applications")}
        </Typography>
      </Box>

      {/* Buttons Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Add to Cart Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{
            flex: 3, // Chiếm 3 phần
            textTransform: "none",
            fontWeight: "bold",
          }}
          onClick={() => navigate(`/course/${id}`)}
        >
          {t("Add to Cart")}
        </Button>

        {/* Add to Wishlist Icon */}
        <IconButton
          sx={{
            flex: 1, // Chiếm 1 phần
            ml: 1,
            color: "secondary.main",
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MouseEnterCourseBox;
