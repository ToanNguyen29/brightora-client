import { Box, Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

interface ImageUploadButtonProps {
   imageName: string | null;
   handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
   mode: string;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
   imageName,
   handleImageUpload,
   mode,
}) => {
   const { t } = useTranslation();

   return (
      <Box width="100%">
         <Button
            component="label"
            sx={{
               fontSize: "16px",
               my: "15px",
               backgroundColor: mode !== "dark" ? "white" : "black",
               color: mode !== "dark" ? "black" : "white",
               padding: "10px 20px",
               fontWeight: "bold",
               border: "1px solid",
               ":hover": {
                  backgroundColor: mode !== "dark" ? "white" : "black",
               },
               width: "70%",
               maxWidth: "70%",
               whiteSpace: "nowrap",
               overflow: "hidden",
               textOverflow: "ellipsis",
            }}
         >
            {imageName || t("nofile_selected")}
         </Button>
         <Button
            component="label"
            sx={{
               fontSize: "16px",
               my: "15px",
               backgroundColor: mode === "dark" ? "white" : "black",
               color: mode === "dark" ? "black" : "white",
               padding: "10px 20px",
               fontWeight: "bold",
               ":hover": {
                  backgroundColor: mode === "dark" ? "white" : "black",
               },
               width: "30%",
            }}
         >
            {t("upload_img")}
            <input
               type="file"
               accept="image/*"
               hidden
               onChange={handleImageUpload}
            />
         </Button>
      </Box>
   );
};

export default ImageUploadButton;
