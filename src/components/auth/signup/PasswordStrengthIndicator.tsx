import React from "react";
import { Typography, InputAdornment } from "@mui/material";

interface PasswordStrengthIndicatorProps {
   passwordStrength: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
   passwordStrength,
}) => {
   return (
      <InputAdornment position="end">
         <Typography
            sx={{
               fontSize: "0.875rem",
               fontWeight: "bold",
               color:
                  passwordStrength === "Strong"
                     ? "green"
                     : passwordStrength === "Normal"
                       ? "orange"
                       : "red",
            }}
         >
            {passwordStrength}
         </Typography>
      </InputAdornment>
   );
};

export default PasswordStrengthIndicator;
