import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../theme/ThemeContext";

const NotFound: React.FC = () => {
  const { mode } = useThemeContext();
  const { t } = useTranslation();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        mt: 15,
        // minHeight: "90vh",
        textAlign: "center",
      }}
    >
      <img
        src="/page-not-found.png"
        alt="Not Found"
        style={{
          maxWidth: "600px",
          marginBottom: "20px",
        }}
      />
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        We can’t find the page you’re looking for
      </Typography>
      <Button
        variant="outlined"
        sx={{
          color: backgroundColor,
          backgroundColor: textColor,
          borderColor: textColor,
          ":hover": {
            color: textColor,
            backgroundColor: backgroundColor,
          },
        }}
        onClick={() => (window.location.href = "/")}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default NotFound;
