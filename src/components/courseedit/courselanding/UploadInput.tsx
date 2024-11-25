import React from "react";
import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../theme/ThemeContext";

interface UploadInputProps {
   name: string;
   onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadInput: React.FC<UploadInputProps> = ({ name, onFileChange }) => {
   const { t } = useTranslation();
   const { mode } = useThemeContext();
   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";
   return (
      <Box
         sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 3,
            border: "2px dashed",
            borderColor: textColor,
            borderRadius: 2,
            bgcolor: backgroundColor,
            "&:hover": {
               bgcolor: mode === "light" ? "#f5f5f5" : "#333333",
            },
         }}
      >
         <input
            accept="image/*"
            style={{ display: "none" }}
            id={`file-upload-${name}`}
            type="file"
            onChange={onFileChange}
         />
         <label htmlFor={`file-upload-${name}`}>
            <Button
               variant="contained"
               component="span"
               startIcon={<CloudUploadIcon />}
               sx={{ mb: 2, color: backgroundColor, bgcolor: textColor }}
            >
               {t("uploadLabel")}
            </Button>
         </label>
         <Typography variant="body2" color="text.secondary" align="center">
            {t("dragAndDropText")}
         </Typography>
         <Typography
            variant="caption"
            color="text.secondary"
            align="center"
            sx={{ mt: 1 }}
         >
            {t("acceptedImageFormats")}
         </Typography>
      </Box>
   );
};

export default UploadInput;
