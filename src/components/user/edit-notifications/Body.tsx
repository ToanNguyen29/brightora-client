import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import NotificationCheckboxList from "./NotificationCheckboxList";
import SaveComponent from "../intercommunity/SaveComponent";

const EditNotificationsBody: React.FC = () => {
   const { t } = useTranslation();

   // State to control the checkboxes
   const [formState, setFormState] = useState({
      promotions: true,
      announcements: true,
      dontSend: true,
   });

   const handleSave = () => {
      console.log("Form values saved:", formState);
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
         }}
      >
         <Typography variant="h5" fontWeight="bold" mt="20px">
            {t("want_to_received")}
         </Typography>
         <NotificationCheckboxList
            formState={formState}
            setFormState={setFormState}
         />
         <SaveComponent handleSave={handleSave} />
      </Box>
   );
};

export default EditNotificationsBody;
