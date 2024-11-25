import React from "react";
import { TextField } from "@mui/material";
import { useThemeContext } from "../../../theme/ThemeContext";

interface TextFieldComponentProps {
   label: string;
   value: string;
   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   name: string; // Ensure the name prop is being passed and used
   customBorderRadius?: number;
}

const TextFieldComponent: React.FC<TextFieldComponentProps> = ({
   label,
   value,
   onChange,
   name,
   customBorderRadius,
}) => {
   const { mode } = useThemeContext();

   const commonTextFieldStyles = {
      width: "100%",
      mt: "10px",
      color: mode === "dark" ? "white" : "black",
      borderRadius: customBorderRadius || 5,
      fontSize: "20px",
   };

   return (
      <TextField
         label={label}
         variant="outlined"
         sx={commonTextFieldStyles}
         value={value} // Ensure this value prop is set correctly
         onChange={onChange} // Ensure this onChange prop is passed correctly
         name={name} // Make sure the name prop is used here
      />
   );
};

export default TextFieldComponent;
