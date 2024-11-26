import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../theme/ThemeContext";
import PaypalPage from "../components/payment/paypal/PaypalPage";
import CourseListPayment from "../components/payment/CourseListPayment";
import { useLocation } from "react-router-dom";

// import axios from "axios";
// interface CheckoutPageProps {
//    courses: any[];
// }

const CheckoutPage: React.FC = () => {
  // const courses: any = [];

  const location = useLocation();
  const { courses } = location.state || {}; // Lấy thông tin course từ state

  const { t } = useTranslation();
  const { mode } = useThemeContext();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  return (
    <Box sx={{ width: "80%", mx: "auto", px: "10%" }}>
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
          <PaypalPage courses={courses} />
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
