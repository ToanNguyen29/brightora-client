import React from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import TextFieldComponent from "../intercommunity/TextFieldComponent";
import ChangeButtonComponent from "./ChangeButtonComponent";
import { updatePassword } from "../../../services/AuthService";
import { UpdatePasswordRequest } from "../../../models/Auth";

const EditAccountBody: React.FC = () => {
  const { t } = useTranslation();
  const [formValues, setFormValues] = React.useState<UpdatePasswordRequest>({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSave = async () => {
    console.log("Form values saved:", formValues);

    try {
      const res = await updatePassword(formValues);
      if ((res.status = 200)) {
        alert(t("password_updated_successfully"));
        // setFormValues({
        //   passwordCurrent: "",
        //   password: "",
        //   passwordConfirm: "",
        // });
      } else {
        alert(`Error: ${res.detail}`);
      }
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
        {/* <Typography variant="h6" fontWeight="bold" mt="20px">
          {t("email")}
        </Typography> */}

        {/* <TextFieldComponent
          label={t("your_email_address_is")}
          value={formValues.email}
          onChange={handleInputChange}
          name="email"
          customBorderRadius={10}
        /> */}

        <Typography variant="h6" fontWeight="bold" mt="20px">
          {t("password")}
        </Typography>

        <TextFieldComponent
          label={t("enter_current_password")}
          value={formValues.passwordCurrent}
          onChange={handleInputChange}
          name="passwordCurrent"
          customBorderRadius={10}
        />

        <TextFieldComponent
          label={t("enter_new_password")}
          value={formValues.password}
          onChange={handleInputChange}
          name="password"
          customBorderRadius={10}
        />
        <TextFieldComponent
          label={t("retype_password")}
          value={formValues.passwordConfirm}
          onChange={handleInputChange}
          name="passwordConfirm"
          customBorderRadius={10}
        />
        <ChangeButtonComponent handleSave={handleSave} />
      </Box>
    </>
  );
};

export default EditAccountBody;
