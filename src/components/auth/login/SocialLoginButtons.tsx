import React from "react";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import GoogleAuthWrapper from "./googleAuth/GoogleAuthWrapper";
import GoogleLogin from "./googleAuth/GoogleLogin";

import GithubLogin from "./githubAuth/GithubLogin";

interface SocialLoginButtonsProps {
  textColor: string;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  textColor,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography
        variant="body2"
        align="center"
        sx={{ mt: 2, fontSize: "18px", color: textColor }}
      >
        {t("or_login_with")}
      </Typography>

      {/* Căn giữa các nút Google và Github */}
      <Grid container spacing={2} sx={{ mt: 1, justifyContent: "center" }}>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
          <GoogleAuthWrapper>
            <GoogleLogin textColor={textColor} />
          </GoogleAuthWrapper>
        </Grid>

        <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
          <GithubLogin textColor={textColor} />
        </Grid>
      </Grid>
    </>
  );
};

export default SocialLoginButtons;
