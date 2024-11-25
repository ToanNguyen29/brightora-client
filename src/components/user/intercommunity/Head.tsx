import React from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../theme/ThemeContext";

interface UserHeadProps {
   title: string;
   subtitle: string;
}

const UserHead: React.FC<UserHeadProps> = ({ title, subtitle }) => {
   const { t } = useTranslation();
   const { mode } = useThemeContext();

   return (
      <Box
         sx={{
            backgroundColor: "transparent",
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            // border: "1px solid",
            borderColor: mode === "dark" ? "white" : "black",
            width: "100%",
            borderBottom: "1px solid",
         }}
      >
         <Typography
            variant="h4"
            color={mode === "dark" ? "white" : "black"}
            fontWeight="bold"
            mb="5px"
         >
            {t(title)}
         </Typography>
         <Typography variant="h6" color={mode === "dark" ? "white" : "black"}>
            {t(subtitle)}
         </Typography>
      </Box>
   );
};

export default UserHead;
