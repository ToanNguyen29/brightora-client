import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import TextFieldComponent from "../intercommunity/TextFieldComponent";
import TypographyComponent from "./TypographyComponent";
import RichTextBox from "./RichTextBoxComponent";
import LanguageSelectComponent from "./LanguageSelectComponent";
import SaveComponent from "../intercommunity/SaveComponent";
import { useAuth } from "../../../context/AuthContext";
import { UpdateUserResponse, UserProfile } from "../../../models/User";
import { updateMe } from "../../../services/UserServices";

const EditProfileBody: React.FC = () => {
  const { userInfo, setUserInfo } = useAuth();

  const { t } = useTranslation();
  const [lang, setLang] = React.useState("");

  const [formValues, setFormValues] = React.useState<Partial<UserProfile>>({});

  useEffect(() => {
    setFormValues(userInfo);
  }, [userInfo]);

  const handleLangChange = (event: any) => {
    setLang(event.target.value);
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

  const handleSave = async () => {
    try {
      const res = await updateMe(formValues);
      if (res.status <= 304) {
        setUserInfo((res as UpdateUserResponse).data);
      } else {
        alert(`Error: ${res.detail}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        // height: "120px",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        width: "100%",
        mt: "50px",
        px: "50px",
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        {t("basics")}
      </Typography>
      <TextFieldComponent
        label={t("first_name")}
        value={formValues.firstName || ""}
        onChange={handleInputChange}
        name="firstName"
      />
      <TextFieldComponent
        label={t("last_name")}
        value={formValues.lastName || ""}
        onChange={handleInputChange}
        name="lastName"
        customBorderRadius={10}
      />
      <TextFieldComponent
        label={t("headline")}
        value={formValues.headline || ""}
        onChange={handleInputChange}
        name="headline"
        customBorderRadius={10}
      />
      <TypographyComponent text={t("headline_info")} />

      <RichTextBox />
      <TypographyComponent text={t("links_and_coupon_prevent")} />

      <LanguageSelectComponent lang={lang} handleChange={handleLangChange} />

      <Typography variant="h6" fontWeight="bold" mt="20px">
        {t("links")}
      </Typography>

      <TextFieldComponent
        label={t("website_example")}
        value={formValues.websiteLink || ""}
        onChange={handleInputChange}
        name="website"
      />
      <TextFieldComponent
        label={t("twitter_example")}
        value={formValues.twitterLink || ""}
        onChange={handleInputChange}
        name="twitter"
      />
      <TextFieldComponent
        label={t("facebook_example")}
        value={formValues.facebookLink || ""}
        onChange={handleInputChange}
        name="facebook"
      />
      <TextFieldComponent
        label={t("linked_example")}
        value={formValues.linkedInLink || ""}
        onChange={handleInputChange}
        name="linked"
      />
      <TextFieldComponent
        label={t("youtube_example")}
        value={formValues.youtubeLink || ""}
        onChange={handleInputChange}
        name="youtube"
      />
      <SaveComponent handleSave={handleSave} />
    </Box>
  );
};

export default EditProfileBody;
