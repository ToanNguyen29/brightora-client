import { Button } from "@mui/material";
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

interface SocialLoginButtonsProps {
   textColor: string;
}

const GithubLogin: React.FC<SocialLoginButtonsProps> = ({ textColor }) => {
   const handleGithubLogin = async () => {
      window.location.href =
         "https://github.com/login/oauth/authorize?client_id=Ov23liLPVNHgjQHuJ7AI&scope=user";
   };
   return (
      <Button
         onClick={handleGithubLogin}
         fullWidth
         variant="outlined"
         startIcon={<GitHubIcon />}
         sx={{
            fontSize: "16px",
            borderColor: textColor,
            color: textColor,
            backgroundColor: "transparent",
         }}
      >
         GitHub
      </Button>
   );
};

export default GithubLogin;
