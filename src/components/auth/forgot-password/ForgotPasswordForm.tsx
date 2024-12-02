import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

import { forgotPassword } from "../../../services/AuthService";
import AutoCloseAlert from "../../reused/Alert";

interface ForgotPasswordFormProps {
  textColor: string;
  setIsSendEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  textColor,
  setIsSendEmail,
}) => {
  const { t } = useTranslation();
  const [errorAlertOpen, setErrorAlertOpen] = useState<string>("");
  const [email, setEmail] = useState("");
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleResetPassword = async () => {
    if (!email) {
      setErrorAlertOpen("Please fill email information");
      return;
    }

    try {
      await forgotPassword(email).then((data) => {
        console.log("for,", data);
        if (data.status <= 304) {
          setIsSendEmail(true);
        } else {
          if (Array.isArray(data.data.detail)) {
            setErrorAlertOpen(data.data.detail[0].msg);
          } else {
            setErrorAlertOpen(data.data.detail);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
      <AutoCloseAlert
        severity="error"
        message={`${errorAlertOpen}`}
        open={!errorAlertOpen ? false : true}
        onClose={() => setErrorAlertOpen("")}
      />
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
        onChange={handleEmailChange}
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
        {t("reset_password")}
      </Button>
    </Box>
  );
};

export default ForgotPasswordForm;
