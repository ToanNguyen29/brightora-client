import { Typography } from "@mui/material";
import React from "react";
import CourseCardPayment from "./CourseCardPayment";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";

interface CourseListPaymentProps {
   courses: any[];
}

const CourseListPayment: React.FC<CourseListPaymentProps> = ({ courses }) => {
   const { t } = useTranslation();
   const { mode } = useThemeContext();

   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";

   const course = {};

   return (
      <>
         <Typography
            variant="h6"
            sx={{
               ml: 1.5,
               mb: 1,
               color: textColor,
               borderBottom: "1px solid",
               fontWeight: "bold",
            }}
         >
            {`Course in Order`}
         </Typography>
         {courses.map((course: any) => (
            <CourseCardPayment
               key={course._id}
               _id={course._id}
               title={course.title}
               duration={course.duration}
               price={course.price}
               rating={course.rating}
               buying={course.buying}
               thumbnail={course.thumbnail}
               owner_name={course.owner_name}
            />
         ))}
      </>
   );
};

export default CourseListPayment;
