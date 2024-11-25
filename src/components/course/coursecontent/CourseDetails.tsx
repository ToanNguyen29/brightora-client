import React from "react";
import { Box } from "@mui/material";
import CourseSection from "./CourseSection";
import { ISectionLearn } from "../../../models/Course";

interface Content {
  type: string;
  at: number;
  title: string;
  canReview: boolean;
}

interface Section {
  title: string;
  lecturersNumber: number;
  duration: number;
  contents: Content[];
}

interface CourseDetailsProps {
  sections: ISectionLearn[] | undefined;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ sections }) => {
  const backgroundColor = "transparent";

  return (
    <Box sx={{ backgroundColor: backgroundColor }}>
      {sections?.map((section, index) => (
        <CourseSection key={index} section={section} />
      ))}
    </Box>
  );
};

export default CourseDetails;
