import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import FormTextField from "./FormTextField";
import { signUp } from "../../../services/AuthService";
import AutoCloseAlert from "../../reused/Alert";
import SocialSignUpButtons from "./SocialSignUpButtons";

interface SignUpFormProps {
  mode: "light" | "dark";
}

const SignUpForm: React.FC<SignUpFormProps> = ({ mode }) => {
  const [errorAlertOpen, setErrorAlertOpen] = useState<string>("");
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("Empty");
  const textColor = mode === "light" ? "black" : "white";

  const handlePasswordChange = (password: string) => {
    setPassword(password);
    checkPasswordStrength(password);
  };

  const checkPasswordStrength = (password: string) => {
    const length = password.length;
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMixed = /[a-z]/.test(password) && /[A-Z]/.test(password);

    if (length >= 8 && hasNumbers && hasSpecial && hasMixed) {
      setPasswordStrength("Strong");
    } else if (length >= 6 && hasNumbers && hasMixed) {
      setPasswordStrength("Normal");
    } else {
      setPasswordStrength("Weak");
    }
  };

  const onSignUpClick = async () => {
    setErrorAlertOpen("");
    if (!firstName || !lastName || !email || !password || !passwordConfirm) {
      setErrorAlertOpen("Please fill all information");
      setPassword("");
      setPasswordConfirm("");
      return;
    }
    if (password.length < 8) {
      setErrorAlertOpen("Password has at least 8 character");
      setPassword("");
      setPasswordConfirm("");
      return;
    }

    if (password !== passwordConfirm) {
      setErrorAlertOpen("Password confirm is wrong");
      setPassword("");
      setPasswordConfirm("");
      return;
    }

    try {
      await signUp({
        email,
        password,
        firstName,
        lastName,
      })
        .then((data) => {
          if (data.status === 200) {
            localStorage.setItem("token", data.data.access_token);
            window.location.href = "/";
          } else {
            console.log("error");
            if (Array.isArray(data.data.detail)) {
              setErrorAlertOpen(data.data.detail[0].msg);
            } else {
              setErrorAlertOpen(data.data.detail);
            }
            setEmail("");
            setPassword("");
            setPasswordConfirm("");
          }
        })
        .catch((err) => {
          alert("Error: " + err.detail);
        });
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <Box
      sx={{
        width: "30%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        borderRadius: "0 8px 8px 0",
        px: "3%",
      }}
    >
      <AutoCloseAlert
        severity="error"
        message={`${errorAlertOpen}`}
        open={!errorAlertOpen ? false : true}
        onClose={() => setErrorAlertOpen("")}
      />
      <Typography
        variant="h4"
        fontWeight={"bold"}
        sx={{ textAlign: "center", mb: 3 }}
      >
        {t("sign_up_start_learning")}
      </Typography>

      <Box display={"flex"} flexDirection={"row"} width={"100%"} gap={3}>
        <Box width={"50%"}>
          <FormTextField
            id="firstName"
            label={t("first_name")}
            value={firstName}
            onChange={setFirstName}
            mode={mode}
            InputProps={undefined}
          />
        </Box>
        <Box width={"50%"}>
          <FormTextField
            id="lastName"
            label={t("last_name")}
            value={lastName}
            onChange={setLastName}
            mode={mode}
            InputProps={undefined}
          />
        </Box>
      </Box>

      <FormTextField
        id="email"
        label={t("email")}
        value={email}
        onChange={setEmail}
        mode={mode}
        InputProps={undefined}
      />

      <FormTextField
        id="password"
        label={t("password")}
        type="password"
        value={password}
        onChange={handlePasswordChange}
        mode={mode}
        InputProps={{
          endAdornment: (
            <PasswordStrengthIndicator passwordStrength={passwordStrength} />
          ),
        }}
      />

      <FormTextField
        id="passwordConfirm"
        label={t("password_confirm")}
        type="password"
        value={passwordConfirm}
        onChange={setPasswordConfirm}
        mode={mode}
        InputProps={undefined}
      />

      <Button
        type="button"
        fullWidth
        variant="contained"
        onClick={onSignUpClick}
        sx={{
          mt: 3,
          mb: 2,
          fontSize: "16px",
          backgroundColor: textColor,
          color: textColor === "black" ? "white" : "black",
        }}
      >
        {t("sign_up")}
      </Button>
      {/* <Typography>Other Signup Options</Typography>
      <SocialSignUpButtons textColor={textColor} /> */}
    </Box>
  );
};

export default SignUpForm;
