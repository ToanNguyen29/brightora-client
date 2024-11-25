import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface LogInPromptProps {
   textColor: string;
   borderColor: string;
}

const LogInPrompt: React.FC<LogInPromptProps> = ({
   textColor,
   borderColor,
}) => {
   const { t } = useTranslation();

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
            {t("or")}
         </Typography>

         <Button
            variant="text"
            component={Link}
            to="/login"
            sx={{
               ml: 1,
               color: textColor,
               fontSize: "18px",
               border: `1px solid ${borderColor}`,
            }}
         >
            {t("login")}
         </Button>
      </Box>
   );
};

export default LogInPrompt;
