import { Paper, Typography } from "@mui/material";
import CourseDetails from "./coursecontent/CourseDetails";
import { useThemeContext } from "../../theme/ThemeContext";
import fakeData from "./fakeData.json";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getSectionByCourseId } from "../../services/SectionService";
import { ISectionLearn } from "../../models/Course";

// const data = fakeData;

interface CourseContentProps {
  courseId: string;
}

const CourseContent: React.FC<CourseContentProps> = ({ courseId }) => {
  const { mode } = useThemeContext();
  const { t } = useTranslation();
  const headerBackgroundColor = mode === "light" ? "#f0f0f0" : "#333333";

  const [sections, setSections] = useState<ISectionLearn[] | undefined>();

  const backgroundColor = mode === "light" ? "white" : "black";
  const textColor = mode === "light" ? "black" : "white";

  useEffect(() => {
    if (!courseId) return;
    const fetchSectionByCourse = async () => {
      await getSectionByCourseId(courseId)
        .then((data) => {
          console.log("Hi", data);
          if (data.status <= 305) {
            console.log("section In coursePage", data.data);
            setSections(data.data);
          } else {
            console.log();
          }
        })
        .catch((err) => {
          alert("Error: " + err);
        });
    };
    fetchSectionByCourse();
  }, [courseId]);

  return (
    <Paper
      elevation={4}
      sx={{
        width: "100%",
        borderRadius: "12px",
        backgroundColor: backgroundColor,
        color: textColor,
        mb: "20px",
        mt: "10px",
        padding: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          mb: 2,
          textAlign: "center",
          backgroundColor: headerBackgroundColor,
          padding: "8px",
          borderRadius: "4px",
        }}
      >
        {t("course_contents")}
      </Typography>
      <CourseDetails sections={sections} />
    </Paper>
  );
};

export default CourseContent;
