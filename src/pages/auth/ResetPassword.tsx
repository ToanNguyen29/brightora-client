import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";
import LeftPanel from "../../components/auth/login/LeftPanel";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ResetPasswordForm from "../../components/auth/reset-password/ResetPasswordForm";
import HomePrompt from "../../components/auth/reset-password/HomePrompt";
import Message, { Severity } from "../../components/Message";

const ResetPassWordPage: React.FC = () => {
   const { mode } = useThemeContext();
   const { t } = useTranslation();
   const textColor = mode === "light" ? "black" : "white";

   const { isAuthenticated, isLoadingAuth } = useAuth();
   const navigate = useNavigate();

   const [isChangePass, setIsChangePass] = useState<boolean>(false);

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
         {isChangePass && (
            <Box
               sx={{
                  width: "30%",
                  maxWidth: "600px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "8px",
                  padding: "16px",
                  boxShadow: 1,
               }}
            >
               <Message
                  severity={Severity.success}
                  message={t("reset_password_successfully")}
                  note={""}
               ></Message>

               <HomePrompt
                  textColor={textColor}
                  borderColor={mode === "dark" ? "white" : "black"}
               />
            </Box>
         )}
         {!isChangePass && (
            <Box
               sx={{
                  width: "30%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  borderRadius: "0 8px 8px 0",
                  px: "3%",
               }}
            >
               <Typography
                  component="h1"
                  variant="h4"
                  sx={{ color: textColor, mb: 3, fontWeight: "bold" }}
               >
                  {t("reset_password")}
               </Typography>

               <ResetPasswordForm
                  textColor={textColor}
                  setIsChangePass={setIsChangePass}
               />
            </Box>
         )}
      </Box>
   );
};

export default ResetPassWordPage;
