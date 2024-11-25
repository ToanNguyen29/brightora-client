import { Box, TextField, Typography } from "@mui/material";
import React from "react";

interface TitleSubtitleSectionProps {
   title: string | undefined;
   subtitle: string | undefined;
   handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   commonTextFieldStyles: object;
}

const TitleSubtitleSection: React.FC<TitleSubtitleSectionProps> = ({
   title,
   subtitle,
   handleInputChange,
   commonTextFieldStyles,
}) => {
   return (
      <Box
         display={"flex"}
         flexDirection={"row"}
         justifyContent={"space-between"}
      >
         <Box minWidth={"48%"} display={"flex"} flexDirection={"column"}>
            <Typography variant="h6" fontWeight={"bold"} mt={2}>
               Course title
            </Typography>
            <TextField
               fullWidth
               name="title"
               value={title}
               onChange={handleInputChange}
               sx={commonTextFieldStyles}
            />
         </Box>
         <Box minWidth={"48%"} display={"flex"} flexDirection={"column"}>
            <Typography variant="h6" fontWeight={"bold"} mt={2}>
               Course subtitle
            </Typography>
            <TextField
               fullWidth
               name="subtitle"
               value={subtitle}
               onChange={handleInputChange}
               sx={commonTextFieldStyles}
            />
         </Box>
      </Box>
   );
};

export default TitleSubtitleSection;
