import React from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";

interface HeadProps {
   title: string;
}

const Head: React.FC<HeadProps> = ({ title }) => {
   const { t } = useTranslation();
   const { mode } = useThemeContext();

   return (
      <Box
         sx={{
            backgroundColor: "transparent",
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
            borderBottom: "0.5px groove",
            width: "100%",
         }}
      >
         <Typography
            variant="h4"
            color={mode === "dark" ? "white" : "black"}
            fontWeight="bold"
            mb="5px"
            ml="20px"
            fontFamily={"monospace"}
         >
            {t(title)}
         </Typography>
      </Box>
   );
};

export default Head;
