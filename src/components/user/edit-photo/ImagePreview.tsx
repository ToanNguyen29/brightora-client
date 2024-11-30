import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

interface ImagePreviewProps {
  selectedImage: string | null;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ selectedImage }) => {
  const { t } = useTranslation();
  return (
    //  <Box width="100%" sx={{ display: "flex", mx: "auto" }}>
    <Box
      component="img"
      sx={{
        height: "50%",
        width: "50%",
        objectFit: "cover",
        display: "flex",
        mx: "auto",
      }}
      src={
        selectedImage ||
        "https://st.depositphotos.com/2934765/53192/v/450/depositphotos_531920820-stock-illustration-photo-available-vector-icon-default.jpg"
      }
      border={"1px solid"}
    />
    //  </Box>
  );
};

export default ImagePreview;
