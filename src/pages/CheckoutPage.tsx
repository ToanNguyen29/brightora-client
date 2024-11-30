import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../theme/ThemeContext";
import PaypalPage from "../components/payment/paypal/PaypalPage";
import CourseListPayment from "../components/payment/CourseListPayment";
import { useLocation } from "react-router-dom";
import PaymentSuccess from "../components/payment/PaymentSuccess";

// import axios from "axios";
// interface CheckoutPageProps {
//    courses: any[];
// }

// POST {{url2}}/api/v1/enrollment/payment/
// Content-Type: application/json
// Authorization: Bearer {{token}}
// Accept: application/json

// {
//   "courses"🙁
//     {
//       "course_id":"6741769c79dd2e1e2c6b11a0",
//       "price":20,
//       "discount":10,
//       "payment_price":18
//     },
//     {
//       "course_id":"6741769c79dd2e1e2c6b11a0",
//       "price":20,
//       "discount":10,
//       "payment_price":18
//     }
//   ],
//   "paypal_id":"21211212"
// }

const CheckoutPage: React.FC = () => {
  // const courses: any = [];
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
