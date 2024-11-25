import React from "react";
import { Paper } from "@mui/material";
import CourseTitle from "./header/CourseTitle";
import CourseRating from "./header/CourseRating";
import CourseDetails from "./header/CourseDetails";
import CourseCreator from "./header/CourseCreator";
import { useThemeContext } from "../../theme/ThemeContext";
import { IOwner } from "../../models/Course";

interface HeaderProps {
  title: string;
  subtitle: string;
  rating: number;
  students: number;
  owner: IOwner | undefined;
  lastUpdated: string;
  lang: string[];
  sub: string;
  // additionalContent: string;
}

const CourseHeader: React.FC<HeaderProps> = ({
  title,
  subtitle,
  rating,
  students,
  owner,
  lastUpdated,
  lang,
  sub,
  // additionalContent,
}) => {
  const { mode } = useThemeContext();
  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  return (
    <Paper
      elevation={4}
      sx={{
        width: "100%",
        padding: 3,
        borderRadius: "12px",
        backgroundColor: backgroundColor,
        color: textColor,
        mb: "20px",
        mt: "10px",
      }}
    >
      <CourseTitle title={title} subtitle={subtitle} />
      <CourseRating rating={rating} numberRating={rating} />
      <CourseCreator owner={owner} />
      <CourseDetails
        students={students}
        lastUpdated={lastUpdated}
        lang={lang}
        sub={sub}
      />
    </Paper>
  );
};

export default CourseHeader;
