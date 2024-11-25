import React from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import HowToLearn from "./how2learn/HowToLearn";
import { useThemeContext } from "../../theme/ThemeContext";

const GoalSection: React.FC = () => {
   const { mode } = useThemeContext();

   const { t } = useTranslation();
   const textColor = mode === "light" ? "white" : "black";
   const bgColor = mode === "light" ? "lightgrey" : "dimgrey";
   return (
      <>
         <Box py={"50px"} bgcolor={bgColor}>
            <Typography
               variant="h4"
               sx={{
                  color: textColor,
                  fontFamily: "math",
                  my: "10px",
                  mx: "10%",
                  fontWeight: "bold",
               }}
            >
               {t("introduction_how_learners")}
            </Typography>
            <HowToLearn />
         </Box>
      </>
   );
};

export default GoalSection;
