import { Box, Typography, Stack } from "@mui/material";
import CourseIcon from "@mui/icons-material/School"; // Example icon
import TestIcon from "@mui/icons-material/Assignment"; // Example icon
import { useState } from "react";
import { useThemeContext } from "../../../theme/ThemeContext";
import { useTranslation } from "react-i18next";

// Example icons
type CourseTypeFormProps = {
   courseType: string;
   handleCourseTypeChange: (value: string) => void;
};

export default function CourseTypeForm({
   courseType,
   handleCourseTypeChange,
}: CourseTypeFormProps) {
   const { t } = useTranslation();
   const { mode } = useThemeContext();

   const backgroundColor = mode === "dark" ? "#000000" : "#ffffff";
   const textColor = mode === "dark" ? "#ffffff" : "#000000";

   const [selectedCourseType, setSelectedCourseType] = useState(courseType[0]);

   const handleSelect = (value: string) => {
      handleCourseTypeChange(value);
      setSelectedCourseType(value);
   };

   const boxStyle = (isSelected: boolean) => ({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      p: 2,
      border: isSelected ? "2px solid blue" : "2px solid grey",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "border-color 0.3s ease",
      backgroundColor: isSelected ? "dimgrey" : "transparent",
   });

   return (
      <Box
         sx={{
            mt: 5,
            textAlign: "center",
            backgroundColor: backgroundColor,
            color: textColor,
            borderRadius: "8px",
         }}
      >
         <Typography variant="h4" gutterBottom mb={15} fontFamily={"monospace"}>
            {t("create_course.what_type?")}
         </Typography>

         <Stack direction="row" spacing={4} justifyContent="center">
            {/* Course Box */}
            <Box
               onClick={() => handleSelect("course")}
               sx={boxStyle(selectedCourseType === "course")}
            >
               <CourseIcon fontSize="large" />
               <Typography variant="body1">{t("course")}</Typography>
               <Typography variant="body2" color="textSecondary">
                  {t("course.full_course")}
               </Typography>
            </Box>

            {/* Practice Test Box */}
            <Box
               onClick={() => handleSelect("practiceTest")}
               sx={boxStyle(selectedCourseType === "practiceTest")}
            >
               <TestIcon fontSize="large" />
               <Typography variant="body1">{t("practice_test")}</Typography>
               <Typography variant="body2" color="textSecondary">
                  {t("course.help")}
               </Typography>
            </Box>
         </Stack>
      </Box>
   );
}
