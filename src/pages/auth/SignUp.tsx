import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContext";
import LeftPanel from "../../components/auth/login/LeftPanel";
import SignUpForm from "../../components/auth/signup/SignUpForm";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignUpPage: React.FC = () => {
   const { isAuthenticated, isLoadingAuth } = useAuth();
   const { mode } = useThemeContext();
   const navigate = useNavigate();

   useEffect(() => {
      if (!isLoadingAuth && isAuthenticated) {
         navigate("/");
      }
   }, [isAuthenticated, navigate, isLoadingAuth]);

   return (
      <Box
         sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            height: "90vh",
            width: "100%",
         }}
      >
         <LeftPanel />
         <SignUpForm mode={mode} />
      </Box>
   );
};

export default SignUpPage;
