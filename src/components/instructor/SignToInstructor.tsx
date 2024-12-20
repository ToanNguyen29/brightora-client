import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";
import { updateMe } from "../../services/UserServices";
import { IPaymentUser } from "../../models/User";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignToInstructor: React.FC = () => {
  const token = localStorage.getItem("token");
  const { setUserInfo } = useAuth();
  const { t } = useTranslation();
  const { mode } = useThemeContext();

  const backgroundColor = mode === "dark" ? "#000000" : "#ffffff";
  const textColor = mode === "dark" ? "#ffffff" : "#000000";

  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formatCardNumber = (value: string) => {
    return value
      .replace(/[^0-9]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === "cardNumber") {
      value = formatCardNumber(value);
    }
    setFormData({ ...formData, [field]: value });
  };

  const validateInput = (): string | null => {
    const { cardNumber, expiryDate } = formData;

    if (!cardNumber || cardNumber.length !== 19) {
      return t("Invalid card number");
    }

    if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
      return t("Invalid expiry date. Format should be MM/YY");
    }

    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateInput();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const payment: IPaymentUser = {
        card_number: formData.cardNumber,
        expiry_date: formData.expiryDate,
      };
      await updateMe(token, { role: "Instructor", payment }).then((data) => {
        console.log("payment", data);
        if (data.status <= 305) {
          setUserInfo((prev) => ({ ...prev, role: "Instructor", payment }));
          navigate("/instructor/course");
        } else {
          if (Array.isArray(data.data.detail)) {
            setError(data.data.detail[0].msg);
          } else {
            setError(data.data.detail);
          }
        }
      });
    } catch (err) {
      setError(t("An error occurred. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "90vh",
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
          margin: "auto",
          mt: 10,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: backgroundColor,
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={2}>
          {t("Sign to Instructor")}
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          mb={3}
        >
          {t("You must provide card information to become an instructor")}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" noValidate>
          <TextField
            fullWidth
            label={t("Card Number")}
            name="cardNumber"
            value={formData.cardNumber}
            onChange={(e) => handleInputChange("cardNumber", e.target.value)}
            inputProps={{ maxLength: 19 }}
            placeholder="1234 5678 9012 3456"
            margin="normal"
          />

          <TextField
            fullWidth
            label={t("Expiry Date")}
            name="expiryDate"
            value={formData.expiryDate}
            onChange={(e) => handleInputChange("expiryDate", e.target.value)}
            placeholder="MM/YY"
            margin="normal"
          />
        </Box>

        <Button
          // fullWidth
          variant="outlined"
          sx={{
            mt: 3,
            p: 1,
            fontWeight: "bold",
            boxShadow: 3,
            borderRadius: 2,
            width: "30%",
            display: "flex",
            mx: "auto",
            textTransform: "none",
            color: backgroundColor,
            backgroundColor: textColor,
            borderColor: textColor,
            "&:hover": {
              color: textColor,
              backgroundColor: backgroundColor,
            },
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            t("submit")
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default SignToInstructor;
