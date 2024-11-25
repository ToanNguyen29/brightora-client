import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CourseGrid from "../../home/tabview/CourseGrid";
import fakeData from "../../home/tabview/fakeData.json";
import { useThemeContext } from "../../../theme/ThemeContext";
import CourseCard from "../../home/tabview/CourseCard";
import CourseCardMyCourse from "./CourseCardMyCourse";

interface CourseListProps {
   courseOfUser: any;
}

const CourseList: React.FC<CourseListProps> = ({ courseOfUser }) => {
   const { t } = useTranslation();
   const { mode } = useThemeContext();

   const textColor = mode === "light" ? "#000000" : "#ffffff";
   const totalCourse = fakeData.courses.length;
   const courses = fakeData.courses;
   return (
      <Box>
         <Typography
            variant="h6"
            fontWeight={"bold"}
            sx={{ mb: 2, color: textColor }}
         >
            {t("my_courses")} ({totalCourse})
         </Typography>

         <Grid container spacing={3}>
            {courses.map((course, index) => (
               <Grid item xs={12} sm={4} md={4} lg={4} key={index}>
                  <CourseCardMyCourse course={course} />
               </Grid>
            ))}
         </Grid>
      </Box>
   );
};

export default CourseList;
