import {
   Box,
   Checkbox,
   FormControlLabel,
   FormGroup,
   Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import SaveComponent from "../intercommunity/SaveComponent";

const EditPrivacyBody: React.FC = () => {
   const { t } = useTranslation();
   const handleSave = () => {
      console.log("Form values saved:");
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
         <Typography variant="h6" fontWeight="bold">
            {t("profile_page_settings")}
         </Typography>

         <FormGroup>
            <FormControlLabel
               control={<Checkbox defaultChecked />}
               label={t("show_profile_privacy")}
            />
            <FormControlLabel
               control={<Checkbox defaultChecked />}
               label={t("show_course_privacy")}
            />{" "}
         </FormGroup>
         <SaveComponent handleSave={handleSave} />
      </Box>
   );
};

export default EditPrivacyBody;
