import React from "react";
import { TextField, SxProps, Theme } from "@mui/material";

interface FormTextFieldProps {
   id: string;
   label: string;
   value: string;
   onChange: (value: string) => void;
   type?: string;
   mode: "light" | "dark";
   error?: boolean;
   helperText?: string;
   disabled?: boolean;
   autoFocus?: boolean;
   customSx?: SxProps<Theme>;
   InputProps: any;
}

const FormTextField: React.FC<FormTextFieldProps> = ({
   id,
   label,
   value,
   onChange,
   type = "text",
   mode,
   error = false,
   helperText = "",
   disabled = false,
   autoFocus = false,
   customSx = {},
   InputProps = undefined,
}) => {
   const textColor = mode === "light" ? "black" : "white";

   // Define the default styles for the TextField component
   const defaultStyles: SxProps<Theme> = {
      fontSize: "16px",
      "& .MuiInputBase-root": {
         color: textColor,
      },
      "& .MuiInputLabel-root": {
         color: textColor,
      },
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
         borderColor: textColor,
      },
      ...customSx,
   };

   return (
      <TextField
         margin="normal"
         required
         fullWidth
         id={id}
         label={label}
         name={id}
         type={type}
         autoComplete={id}
         autoFocus={autoFocus}
         value={value}
         onChange={(event) => onChange(event.target.value)}
         error={error}
         helperText={helperText}
         disabled={disabled}
         sx={defaultStyles}
         InputProps={InputProps}
      />
   );
};

export default FormTextField;
