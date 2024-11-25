import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface HomePromptProps {
   textColor: string;
   borderColor: string;
}

const HomePrompt: React.FC<HomePromptProps> = ({ textColor, borderColor }) => {
   const { t } = useTranslation();

   const handleClick = () => {
      window.location.href = "/";
   };

   return (
      <Box
         justifyContent="center"
         sx={{
            display: "flex",
            mt: 4,
            flexDirection: "row",
            alignItems: "center",
            p: 2,
         }}
      >
         <Typography sx={{ color: textColor, fontSize: "18px" }}>
            {t("go")}
         </Typography>

         <Button
            variant="text"
            onClick={handleClick}
            sx={{
               ml: 1,
               color: textColor,
               fontSize: "18px",
               border: `1px solid ${borderColor}`,
            }}
         >
            {t("home")}
         </Button>
      </Box>
   );
};

export default HomePrompt;
