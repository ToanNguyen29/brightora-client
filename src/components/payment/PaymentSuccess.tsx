import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";
import { useNavigate } from "react-router-dom";

const PaymentSuccess: React.FC = () => {
  const { t } = useTranslation();
  const { mode } = useThemeContext();

  const navigate = useNavigate();

  const backgroundColor = mode === "light" ? "#f5f5f5" : "#121212";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  return (
    <Box
      sx={{
        backgroundColor: backgroundColor,
        color: textColor,
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <CheckCircleIcon
        sx={{
          fontSize: 80,
          color: mode === "light" ? "#4caf50" : "#76ff03",
          marginBottom: 2,
        }}
      />
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: "bold", marginBottom: 2 }}
      >
        {t("payment_success.title", "Thanh toán thành công!")}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          marginBottom: 4,
          maxWidth: 500,
          lineHeight: 1.5,
        }}
      >
        {t(
          "Cảm ơn bạn đã mua hàng! Chúng tôi đã nhận được thanh toán của bạn. Bạn có thể kiểm tra chi tiết đơn hàng trong phần lịch sử mua hàng."
        )}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{
          borderRadius: 50,
          paddingX: 4,
          paddingY: 1,
          textTransform: "none",
          fontSize: 16,
        }}
        onClick={() => {
          navigate("/my-course");
        }}
      >
        {t("go_to_learn")}
      </Button>
    </Box>
  );
};

export default PaymentSuccess;
