import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useGoogleLogin } from "@react-oauth/google";
import React from "react";
import { googleAuth } from "../../../../services/AuthService";
import { useAuth } from "../../../../context/AuthContext";
import { LoginResponse } from "../../../../models/Auth";

import { useNavigate } from "react-router-dom";
// import { error } from "console";

interface SocialLoginButtonsProps {
  textColor: string;
}

const GoogleLogin: React.FC<SocialLoginButtonsProps> = ({ textColor }) => {
  const token = localStorage.getItem("token");
  const { setUserInfo, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const responseGoogle = async (authResult: any) => {
    try {
      if (authResult["code"]) {
        await googleAuth(authResult["code"])
          .then((data) => {
            if (data.status <= 304) {
              localStorage.setItem("token", data.data.access_token);

              window.location.href = "/";
            } else {
              console.log("error");
            }
          })
          .catch((error) => {});

        // if (res.status <= 304) {
        //    // setUserInfo((res as LoginResponse).data);
        //    // setIsAuthenticated(true);
        //    // navigate("/", { replace: true });
        // } else {
        //    console.log(res);
        //    alert("Error: " + (res as Error));
        // }
      }
    } catch (error) {
      console.log("Google Login Error", error);
    }
  };

  const handleClickGoogleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <Button
      onClick={() => handleClickGoogleLogin()}
      fullWidth
      variant="outlined"
      startIcon={<GoogleIcon />}
      sx={{
        fontSize: "16px",
        borderColor: textColor,
        color: textColor,
        backgroundColor: "transparent",
      }}
    >
      Google
    </Button>
  );
};

export default GoogleLogin;
