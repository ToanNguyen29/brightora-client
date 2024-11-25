import { Button } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import React from "react";
import { useAuth } from "../../../../context/AuthContext";
import { LoginResponse } from "../../../../models/Auth";

import { useNavigate } from "react-router-dom";
import { facebookAuth } from "../../../../services/AuthService";

interface SocialLoginButtonsProps {
  textColor: string;
}

declare global {
  interface Window {
    FB: any;
  }
}

const FacebookLogin: React.FC<SocialLoginButtonsProps> = ({ textColor }) => {
  const { setUserInfo, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleClickFacebookLogin = () => {
    window.FB.login(function (response: any) {
      if (response.authResponse) {
        window.FB.api(
          "/me",
          { fields: "name, email" },
          async function (response: any) {
            console.log("userRes", response);

            const res = await facebookAuth(
              response.id,
              response.name,
              response.email
            );
            if (res.status <= 304) {
              // setUserInfo((res as LoginResponse).data);
              // setIsAuthenticated(true);
              // navigate("/", { replace: true });
            } else {
              alert("Error: " + res.detail);
            }
          }
        );
      } else {
        console.log("User cancelled login or did not fully authorize.");
      }
    });
  };

  return (
    <Button
      onClick={handleClickFacebookLogin}
      fullWidth
      variant="outlined"
      startIcon={<FacebookIcon />}
      sx={{
        fontSize: "16px",
        borderColor: textColor,
        color: textColor,
        backgroundColor: "transparent",
      }}
    >
      Facebook
    </Button>
  );
};

export default FacebookLogin;
