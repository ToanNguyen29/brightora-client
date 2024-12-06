import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../theme/ThemeContext";
import PaypalPage from "../components/payment/paypal/PaypalPage";
import CourseListPayment from "../components/payment/CourseListPayment";
import { useLocation } from "react-router-dom";
import PaymentSuccess from "../components/payment/PaymentSuccess";

const CheckoutPage: React.FC = () => {
  const [isDone, setIsDone] = useState<boolean>(false);
  const location = useLocation();
  const { courses } = location.state || {}; // Lấy thông tin course từ state

  const { t } = useTranslation();
  const { mode } = useThemeContext();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  useEffect(() => {
    console.log("course payment:", courses);
  }, [courses]);

  if (isDone) return <PaymentSuccess />;

  return (
    <Box sx={{ width: "80%", mx: "auto", px: "10%", minHeight: "90vh" }}>
      <Typography
        variant="h3"
        fontWeight={"bold"}
        sx={{ mt: 6, mb: 2, color: textColor }}
      >
        {t("checkout_page")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          p: 1,
          width: "100%",
        }}
      >
        <Box sx={{ flex: 3, mr: 3 }}>
          <CourseListPayment courses={courses} />
        </Box>

        <Box sx={{ flex: 1 }}>
          <PaypalPage courses={courses} setIsDone={setIsDone} />
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
