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

const SignToInstructor: React.FC = () => {
  const { t } = useTranslation();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateInput = () => {
    if (!cardNumber || cardNumber.length !== 16) {
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
    setSuccess(null);
    setLoading(true);

    // try {
    //   await updateU;
    //   if (response.success) {
    //     setSuccess(t("Your role has been updated to Instructor successfully!"));
    //   } else {
    //     setError(t("Failed to update your role. Please try again."));
    //   }
    // } catch (err) {
    //   setError(t("An error occurred. Please try again."));
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        mt: 15,
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#ffffff",
      }}
    >
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
        {t("Sign to Instructor")}
      </Typography>
      <Typography
        variant="subtitle2"
        fontWeight="bold"
        textAlign="center"
        mb={3}
      >
        You must to provide Card information to become an instructor
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label={t("Card Number")}
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          inputProps={{ maxLength: 16 }}
          placeholder="1234 5678 9012 3456"
          margin="normal"
        />
        <TextField
          fullWidth
          label={t("Expiry Date")}
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          placeholder="MM/YY"
          margin="normal"
        />
      </Box>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3, fontWeight: "bold", textTransform: "none" }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : t("Sign to Instructor")}
      </Button>
    </Box>
  );
};

export default SignToInstructor;
