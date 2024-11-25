import React, { useState } from "react";
import {
   Box,
   Button,
   Modal,
   TextField,
   MenuItem,
   FormControl,
   InputLabel,
   Select,
   Typography,
} from "@mui/material";
import { useThemeContext } from "../../../theme/ThemeContext";

enum ImageStyle {
   MINIMALIST = "Minimalist",
   MODERN = "Modern",
   VINTAGE = "Vintage",
   ARTISTIC = "Artistic",
   FUTURISTIC = "Futuristic",
}

interface GenerateImageModalProps {
   open: boolean;
   onClose: () => void;
   onConfirm: (
      courseTitle: string,
      description: string,
      imageStyle: string,
   ) => void;
}

const GenerateImageModal: React.FC<GenerateImageModalProps> = ({
   open,
   onClose,
   onConfirm,
}) => {
   const { mode } = useThemeContext();
   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";

   const [courseTitle, setCourseTitle] = useState("");
   const [description, setDescription] = useState("");
   const [imageStyle, setImageStyle] = useState("");

   const handleSubmit = () => {
      onConfirm(courseTitle, description, imageStyle);
      setCourseTitle("");
      setDescription("");
      setImageStyle("");
   };

   return (
      <Modal open={open} onClose={onClose}>
         <Box
            sx={{
               position: "absolute",
               top: "50%",
               left: "50%",
               transform: "translate(-50%, -50%)",
               width: 400,
               bgcolor: backgroundColor,
               color: textColor,
               border: `2px solid ${textColor}`,
               boxShadow: 24,
               p: 4,
               borderRadius: 2,
            }}
         >
            <Typography variant="h6" mb={2}>
               Generate Image
            </Typography>
            <TextField
               fullWidth
               label="Course Title"
               value={courseTitle}
               onChange={(e) => setCourseTitle(e.target.value)}
               sx={{ mb: 2 }}
            />
            <TextField
               fullWidth
               label="Description"
               multiline
               rows={3}
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
               <InputLabel>Image Style</InputLabel>
               <Select
                  value={imageStyle}
                  onChange={(e) => setImageStyle(e.target.value)}
                  label="Image Style"
               >
                  {Object.values(ImageStyle).map((style) => (
                     <MenuItem key={style} value={style}>
                        {style}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
               Confirm
            </Button>
         </Box>
      </Modal>
   );
};

export default GenerateImageModal;
