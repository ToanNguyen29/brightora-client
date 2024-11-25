import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface LoginFormProps {
   email: string;
   password: string;
   onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   onLoginClick: () => void;
   textColor: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
   email,
   password,
   onEmailChange,
   onPasswordChange,
   onLoginClick,
   textColor,
}) => {
   const { t } = useTranslation();

   return (
      <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
         <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t("email")}
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={onEmailChange}
            sx={{
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
            }}
         />
         <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t("password")}
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={onPasswordChange}
            sx={{
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
            }}
         />
         <Button
            type="button"
            fullWidth
            variant="contained"
            onClick={onLoginClick}
            sx={{
               mt: 3,
               mb: 2,
               fontSize: "16px",
               backgroundColor: textColor,
               color: textColor === "black" ? "white" : "black",
            }}
         >
            {t("login")}
         </Button>
      </Box>
   );
};

export default LoginForm;
