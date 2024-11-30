import { Box, Button, TextField, Typography } from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CourseOfInstructor from "./CoursesOfInstructor";

const InstructorCoursePage = () => {
  const { t } = useTranslation();
  const { mode } = useThemeContext();

  const backgroundColor = mode === "dark" ? "#ffffff" : "#000000";
  const textColor = mode === "dark" ? "#000000" : "#ffffff";

  return (
    <Box ml={4}>
      <Typography variant="h3" fontFamily={"monospace"}>
        {t("course")}
      </Typography>

      <Button
        component={Link}
        to="/instructor/course/create"
        sx={{
          height: "40px",
          fontSize: "16px",
          backgroundColor: backgroundColor,
          color: textColor,
          fontWeight: "bold",
          ":hover": {
            backgroundColor: backgroundColor,
          },
          border: "1px solid",
          mt: 5,
          padding: "10px 20px",
        }}
      >
        {t("add_new_course")}
      </Button>
      <CourseOfInstructor />
      <CourseOfInstructor />
    </Box>
  );
};

export default InstructorCoursePage;
