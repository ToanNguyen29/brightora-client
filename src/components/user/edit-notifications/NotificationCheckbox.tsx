import { Checkbox, FormControlLabel, Typography, Box } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

interface NotificationCheckboxProps {
   name: string;
   checked: boolean;
   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   label: string;
}

const NotificationCheckbox: React.FC<NotificationCheckboxProps> = ({
   name,
   checked,
   onChange,
   label,
}) => {
   const { t } = useTranslation();

   return (
      <Box
         sx={{
            width: "100%",
            minHeight: "100px",
            border: "1px solid",
            display: "flex",
            alignItems: "center", // Centers vertically
            justifyContent: "center", // Centers horizontally
            mt: "15px",
         }}
      >
         <FormControlLabel
            control={
               <Checkbox
                  name={name}
                  checked={checked}
                  onChange={onChange}
                  sx={{
                     width: "20%",
                  }}
               />
            }
            label={
               <Typography variant="h6" fontWeight="bold" width={"80%"}>
                  {t(label)}
               </Typography>
            }
            sx={{
               width: "100%",
               display: "flex",
               alignItems: "center",
            }}
         />
      </Box>
   );
};

export default NotificationCheckbox;
