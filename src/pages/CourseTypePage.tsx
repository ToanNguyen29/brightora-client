import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { useThemeContext } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import CourseListByType from "../components/courseviewing/CourseListByType";

const CourseTypePage: React.FC = () => {
  const { t } = useTranslation();
  const { mode } = useThemeContext();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";
  const { type } = useParams();
  console.log("type", type);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        px: "20%",
        mb: 5,
        minHeight: "90vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mt: 10,
          mb: 5,
          color: textColor,
          fontFamily: "math",
          fontWeight: "bold",
        }}
      >
        {type?.toUpperCase()} {t("courses")}
      </Typography>

      <CourseListByType type={type} />
    </Box>
  );
};

export default CourseTypePage;
