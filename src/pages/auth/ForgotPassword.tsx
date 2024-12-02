import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";
import LeftPanel from "../../components/auth/login/LeftPanel";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "../../components/auth/forgot-password/ForgotPasswordForm";
import LoginPrompt from "../../components/auth/forgot-password/LoginPrompt";
import Message, { Severity } from "../../components/Message";

const ForgotPassWordPage: React.FC = () => {
  const { mode } = useThemeContext();
  const { t } = useTranslation();
  const textColor = mode === "light" ? "black" : "white";

  const { isAuthenticated, isLoadingAuth } = useAuth();
  const navigate = useNavigate();

  const [isSendEmail, setIsSendEmail] = useState<boolean>(false);

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
      {isSendEmail && (
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
          }}
        >
          <Message
            severity={Severity.success}
            message={t("send_reset_password_link_via_email_successfully")}
            note={t("send_reset_password_link_via_email_successfully_note")}
          ></Message>
        </Box>
      )}
      {!isSendEmail && (
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
            {t("forgot_password")}
          </Typography>

          <Typography variant="body1" sx={{ color: textColor }}>
            {t("send_reset_password_link_via_email_note")}
          </Typography>

          <ForgotPasswordForm
            textColor={textColor}
            setIsSendEmail={setIsSendEmail}
          />

          <LoginPrompt
            textColor={textColor}
            borderColor={mode === "dark" ? "white" : "black"}
          />
        </Box>
      )}
    </Box>
  );
};

export default ForgotPassWordPage;
