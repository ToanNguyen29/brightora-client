import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import TextFieldComponent from "../intercommunity/TextFieldComponent";
import ChangeButtonComponent from "./ChangeButtonComponent";
import { updatePassword } from "../../../services/AuthService";
import { UpdatePasswordRequest } from "../../../models/Auth";
import AutoCloseAlert from "../../reused/Alert";
import { useThemeContext } from "../../../theme/ThemeContext";

const EditAccountBody: React.FC = () => {
  const token = localStorage.getItem("token");
  const { t } = useTranslation();
  const [alertOpen, setAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState<string>("");
  const [formValues, setFormValues] = React.useState<UpdatePasswordRequest>({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });
  const { mode } = useThemeContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSave = async () => {
    setErrorAlertOpen("");
    if (!formValues.password || !formValues.passwordConfirm) {
      setErrorAlertOpen("Please fill all information");
      return;
    }
    if (formValues.password.length < 8) {
      setErrorAlertOpen("Password has at least 8 character");
      return;
    }

    if (formValues.password !== formValues.passwordConfirm) {
      setErrorAlertOpen("Password confirm is wrong");
      return;
    }

    try {
      await updatePassword(
        token,
        formValues.passwordCurrent,
        formValues.password
      ).then((data) => {
        if (data.status <= 305) {
          console.log(data);
          setAlertOpen(true);
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
    <>
      <Box
        sx={{
          backgroundColor: "transparent",
          height: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          width: "100%",
          mt: "50px",
          px: "50px",
        }}
      >
        <AutoCloseAlert
          severity="success"
          message="Password updated successfully"
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
        />
        <AutoCloseAlert
          severity="error"
          message={`${errorAlertOpen}`}
          open={!errorAlertOpen ? false : true}
          onClose={() => setErrorAlertOpen("")}
        />

        <Typography variant="h6" fontWeight="bold" mt="20px">
          {t("password")}
        </Typography>

        <TextField
          label={t("enter_current_password")}
          value={formValues.passwordCurrent}
          type="password"
          onChange={handleInputChange}
          name="passwordCurrent"
          // customBorderRadius={10}
          sx={{
            width: "100%",
            mt: "10px",
            color: mode === "dark" ? "white" : "black",
            borderRadius: 10,
            fontSize: "20px",
          }}
        />

        <TextField
          label={t("enter_new_password")}
          value={formValues.password}
          type="password"
          onChange={handleInputChange}
          name="password"
          sx={{
            width: "100%",
            mt: "10px",
            color: mode === "dark" ? "white" : "black",
            borderRadius: 10,
            fontSize: "20px",
          }}
        />

        <TextField
          label={t("retype_password")}
          value={formValues.passwordConfirm}
          type="password"
          onChange={handleInputChange}
          name="passwordConfirm"
          sx={{
            width: "100%",
            mt: "10px",
            color: mode === "dark" ? "white" : "black",
            borderRadius: 10,
            fontSize: "20px",
          }}
        />
        <ChangeButtonComponent handleSave={handleSave} />
      </Box>
    </>
  );
};

export default EditAccountBody;
