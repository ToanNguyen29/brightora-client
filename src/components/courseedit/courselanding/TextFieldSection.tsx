import { TextField, Typography, Box } from "@mui/material";
import React from "react";

interface TextFieldSectionProps {
   label: string;
   name: string;
   value: string | undefined;
   handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   commonTextFieldStyles: object;
}

const TextFieldSection: React.FC<TextFieldSectionProps> = ({
   label,
   name,
   value,
   handleInputChange,
   commonTextFieldStyles,
}) => {
   return (
      <Box>
         <Typography variant="h6" fontWeight={"bold"}>
            {label}
         </Typography>
         <TextField
            fullWidth
            name={name}
            value={value}
            onChange={handleInputChange}
            sx={commonTextFieldStyles}
         />
      </Box>
   );
};

export default TextFieldSection;
