import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { useThemeContext } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import CourseListByType from "../components/courseviewing/CourseListByType";
import SearchCoursePage from "../components/searchcourse/SearchCoursePage";
import { Type } from "../components/searchcourse/FilterBar";

const CourseTypePage: React.FC = () => {
  const { t } = useTranslation();
  const { mode } = useThemeContext();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";
  const { type } = useParams();

  const defaultType: Type | undefined = Object.values(Type).find(
    (value) => value === type
  );

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 5,
        px: "15%",
        mt: 5,
        minHeight: "90vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          color: textColor,
          fontFamily: "math",
          fontWeight: "bold",
        }}
      >
        {type?.toUpperCase()} {t("courses")}
      </Typography>
      <Typography
        variant="h5"
        sx={{ color: textColor, fontFamily: "math", fontWeight: "bold" }}
      >
        New course
      </Typography>
      <CourseListByType type={type} />
      <Typography
        variant="h5"
        sx={{ color: textColor, fontFamily: "math", fontWeight: "bold", mt: 3 }}
      >
        {`All "${type}" course`}
      </Typography>
      <SearchCoursePage defaultType={defaultType} />
    </Box>
  );
};

export default CourseTypePage;
