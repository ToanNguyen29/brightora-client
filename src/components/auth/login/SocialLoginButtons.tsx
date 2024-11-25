import React from "react";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import GoogleAuthWrapper from "./googleAuth/GoogleAuthWrapper";
import GoogleLogin from "./googleAuth/GoogleLogin";
import FacebookLogin from "./facebookAuth/FacebookLogin";
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
         <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={4}>
               <GoogleAuthWrapper>
                  <GoogleLogin textColor={textColor}></GoogleLogin>
               </GoogleAuthWrapper>
            </Grid>
            <Grid item xs={4}>
               <FacebookLogin textColor={textColor} />
            </Grid>
            <Grid item xs={4}>
               <GithubLogin textColor={textColor} />
            </Grid>
         </Grid>
      </>
   );
};

export default SocialLoginButtons;
