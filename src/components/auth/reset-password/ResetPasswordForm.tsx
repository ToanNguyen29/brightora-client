import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

import { resetPassword } from "../../../services/AuthService";
import { useParams } from "react-router-dom";

interface ResetPasswordFormProps {
  textColor: string;
  setIsChangePass: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  textColor,
  setIsChangePass,
}) => {
  const { t } = useTranslation();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(event.target.value);
  };

  const handleResetPassword = async () => {
    const res = await resetPassword({ password, passwordConfirm, token });
    try {
      if (res.status <= 304) {
        setIsChangePass(true);
      } else {
        alert(`Error: ${res.detail}}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
      <TextField
        margin="normal"
        required
        fullWidth
        type="password"
        id="password"
        label={t("password")}
        name="password"
        autoComplete="password"
        autoFocus
        value={password}
        onChange={handlePasswordChange}
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
        type="password"
        id="passwordConfirm"
        label={t("password_confirm")}
        name="passwordConfirm"
        autoComplete="passwordConfirm"
        autoFocus
        value={passwordConfirm}
        onChange={handlePasswordConfirmChange}
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
        onClick={handleResetPassword}
        sx={{
          mt: 3,
          mb: 2,
          fontSize: "16px",
          backgroundColor: textColor,
          color: textColor === "black" ? "white" : "black",
        }}
      >
        {t("change_password")}
      </Button>
    </Box>
  );
};

export default ResetPasswordForm;
