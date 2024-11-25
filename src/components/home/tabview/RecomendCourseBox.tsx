import React from "react";
import { Box, Button, Typography } from "@mui/material";
import CourseGrid from "./CourseGrid";
import fakeData from "./fakeData.json";
import { useThemeContext } from "../../../theme/ThemeContext";
import { t } from "i18next";
interface RecomendCourseBoxProps {
   tabName: string;
}

const RecomendCourseBox: React.FC<RecomendCourseBoxProps> = ({ tabName }) => {
   const { mode } = useThemeContext();

   return (
      <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
         <Typography variant="h4" sx={{ margin: 2 }}>
            {fakeData.title}
         </Typography>
         <Typography variant="body1" sx={{ margin: 2 }}>
            {fakeData.description}
         </Typography>
         <Button
            sx={{
               fontSize: "16px",
               backgroundColor: mode === "dark" ? "white" : "black",
               color: mode === "dark" ? "black" : "white",
               padding: "10px 20px",
               fontWeight: "bold",
               ":hover": {
                  backgroundColor: mode === "dark" ? "white" : "black",
               },
               margin: 2,
            }}
         >
            {t("explore") + " " + t(tabName)}
         </Button>{" "}
         {/* <CourseGrid courses={fakeData.courses} /> */}
      </Box>
   );
};

export default RecomendCourseBox;
