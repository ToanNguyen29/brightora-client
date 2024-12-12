import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../context/AuthContext";

const PaymentMethods: React.FC = () => {
  const { t } = useTranslation();
  const { userInfo } = useAuth();

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  useEffect(() => {
    if (!userInfo.payment?.card_number || !userInfo.payment?.expiry_date)
      return;
    setCardNumber(userInfo.payment?.card_number);
    setExpiryDate(userInfo.payment?.expiry_date);
  }, [userInfo.payment?.card_number, userInfo.payment?.expiry_date]);

  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        height: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        width: "100%",
        mt: "50px",
        px: "50px",
      }}
    >
      {/* Saved payment methods */}
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        Your saved payment account
      </Typography>
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CreditCardIcon fontSize="large" color="primary" sx={{ mr: 4 }} />

          <Typography variant="body1" sx={{ mr: 3 }}>
            {cardNumber
              .split(" ")
              .map((group, index) => (index < 3 ? "****" : group))
              .join(" ")}
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mr: 4 }}>
            Expires on {expiryDate}
          </Typography>
        </Box>

        {/* Edit button */}
        <Button variant="text" color="primary">
          Edit
        </Button>
      </Paper>
    </Box>
  );
};

export default PaymentMethods;
