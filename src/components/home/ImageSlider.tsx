import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface ImageSliderProps {
   images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
   const [currentImageIndex, setCurrentImageIndex] = useState(0);

   const handleNextImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
   };

   const handlePreviousImage = () => {
      setCurrentImageIndex(
         (prevIndex) => (prevIndex - 1 + images.length) % images.length,
      );
   };

   return (
      <Box
         sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            mt: 1,
            mx: "10%",
         }}
      >
         <IconButton
            sx={{
               position: "absolute",
               left: 0,
               top: "50%",
               transform: "translateY(-50%)",
               zIndex: 1,
               backgroundColor: "rgba(255, 255, 255, 0.7)",
               borderRadius: "50%",
               "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
               },
            }}
            onClick={handlePreviousImage}
         >
            <ArrowBackIosIcon />
         </IconButton>
         <Box
            sx={{
               width: "100%",
               height: 550,
               backgroundImage: `url(${images[currentImageIndex]})`,
               backgroundSize: "cover",
               backgroundPosition: "center",
            }}
         />
         <IconButton
            sx={{
               position: "absolute",
               right: 0,
               top: "50%",
               transform: "translateY(-50%)",
               zIndex: 1,
               backgroundColor: "rgba(255, 255, 255, 0.7)",
               borderRadius: "50%",
               "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
               },
            }}
            onClick={handleNextImage}
         >
            <ArrowForwardIosIcon />
         </IconButton>
      </Box>
   );
};

export default ImageSlider;
