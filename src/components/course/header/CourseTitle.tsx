import React from "react";
import { Typography, Box } from "@mui/material";
import { useThemeContext } from "../../../theme/ThemeContext";

interface CourseTitleProps {
  title: string;
  subtitle: string;
}

const CourseTitle: React.FC<CourseTitleProps> = ({ title, subtitle }) => {
  const { mode } = useThemeContext();
  const textColor = mode === "light" ? "black" : "white";
  const fontFamily = "system-ui";
  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: textColor,
          fontWeight: "bold",
          fontFamily: fontFamily,
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="h6"
        paragraph
        sx={{
          color: textColor,
          fontStyle: "italic",
          fontFamily: fontFamily,
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default CourseTitle;
