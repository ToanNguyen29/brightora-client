import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import TextFieldComponent from "../intercommunity/TextFieldComponent";
import SaveComponent from "../intercommunity/SaveComponent";
import { useAuth } from "../../../context/AuthContext";
import { UserProfile } from "../../../models/User";
import { updateMe } from "../../../services/UserServices";
import RichTextBox from "../../reused/RichTextBoxComponent";
import AutoCloseAlert from "../../reused/Alert";

const EditProfileBody: React.FC = () => {
  const token = localStorage.getItem("token");
  const { userInfo, setUserInfo } = useAuth();
  const [alertOpen, setAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState<string>("");
  const { t } = useTranslation();

  const [formValues, setFormValues] = React.useState<Partial<UserProfile>>({});

  useEffect(() => {
    setFormValues(userInfo);
  }, [userInfo]);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (formValues) {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleDescriptionChange = (value: string) => {
    setFormValues({
      ...formValues,
      description: value,
    });
  };

  const handleSave = async () => {
    try {
      await updateMe(token, formValues).then((data) => {
        if (data.status <= 304) {
          setUserInfo(data.data.data);
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
    <Box
      sx={{
        backgroundColor: "transparent",
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
        message="Profile updated successfully"
        open={alertOpen}
        onClose={handleCloseAlert}
      />
      <AutoCloseAlert
        severity="error"
        message={`${errorAlertOpen}`}
        open={!errorAlertOpen ? false : true}
        onClose={() => setErrorAlertOpen("")}
      />
      <Typography variant="h6" fontWeight="bold">
        {t("basics")}
      </Typography>

      <TextFieldComponent
        label={t("first_name")}
        value={formValues.first_name || ""}
        onChange={handleInputChange}
        name="first_name"
      />
      <TextFieldComponent
        label={t("last_name")}
        value={formValues.last_name || ""}
        onChange={handleInputChange}
        name="last_name"
        customBorderRadius={10}
      />
      <TextFieldComponent
        label={t("headline")}
        value={formValues.headline || ""}
        onChange={handleInputChange}
        name="headline"
        customBorderRadius={10}
      />
      <RichTextBox
        text={formValues.description}
        handleTextChange={handleDescriptionChange}
      />
      <Typography variant="h6" fontWeight="bold" mt="20px">
        {t("links")}
      </Typography>
      <TextFieldComponent
        label={t("website_example")}
        value={formValues.website_link || ""}
        onChange={handleInputChange}
        name="website_link"
      />
      <TextFieldComponent
        label={t("twitter_example")}
        value={formValues.twitter_link || ""}
        onChange={handleInputChange}
        name="twitter_link"
      />
      <TextFieldComponent
        label={t("facebook_example")}
        value={formValues.facebook_link || ""}
        onChange={handleInputChange}
        name="facebook_link"
      />
      <TextFieldComponent
        label={t("linked_example")}
        value={formValues.linkedin_link || ""}
        onChange={handleInputChange}
        name="linkedin_link"
      />
      <TextFieldComponent
        label={t("youtube_example")}
        value={formValues.youtube_link || ""}
        onChange={handleInputChange}
        name="youtube_link"
      />
      <SaveComponent handleSave={handleSave} />
    </Box>
  );
};

export default EditProfileBody;
