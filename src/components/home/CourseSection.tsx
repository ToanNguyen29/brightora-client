import React from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import FullWidthTabs from "./tabview/TabView";
import { useThemeContext } from "../../theme/ThemeContext";

const CourseSection: React.FC = () => {
   const { mode } = useThemeContext();

   const { t } = useTranslation();
   const textColor = mode === "light" ? "black" : "white";

   return (
      <>
         <Box sx={{ mx: "10%", my: "30px" }}>
            <Typography
               variant="h4"
               sx={{
                  color: textColor,
                  fontFamily: "math",
                  fontWeight: "bold",
               }}
            >
               {t("selection_of_course")}
            </Typography>
            <Typography
               variant="h5"
               sx={{
                  color: textColor,
                  fontFamily: "system-ui",
                  my: "10px",
               }}
            >
               {t("introduction_online_video")}
            </Typography>
            <FullWidthTabs />
         </Box>
      </>
   );
};

export default CourseSection;
