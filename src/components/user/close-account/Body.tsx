import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import CloseAccountButtonComponent from "./CloseAccountButton";

const CloseAccountBody: React.FC = () => {
   const { t } = useTranslation();

   const handleClose = () => {
      console.log("Form values Closed:");
   };
   return (
      <Box
         sx={{
            backgroundColor: "transparent",
            // height: "120px",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
            width: "100%",
            mt: "50px",
            px: "50px",
            textAlign: "justify",
         }}
      >
         <Typography>
            <Typography
               variant="h5"
               component="span"
               fontWeight="bold"
               color="red"
            >
               {t("warning")}
            </Typography>
            <Typography
               variant="h5"
               component="span"
               fontWeight="normal"
               color="black"
            >
               {` : ${t("close_account_warning_1")}`}
            </Typography>
         </Typography>

         <Typography variant="h5" mt="20px">
            {t("close_account_warning_2")}
         </Typography>

         <CloseAccountButtonComponent handleClose={handleClose} />
      </Box>
   );
};

export default CloseAccountBody;
