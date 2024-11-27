import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import LanguageModal from "./LanguageModal";

interface LanguageSwitcherProps {
  mode: string; // "light" or "dark"
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ mode }) => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    handleClose();
  };

  return (
    <Box
      sx={{
        border: `1px solid White`, // Viền xung quanh
        p: 2, // Padding
        display: "inline-block", // Giữ kích thước vừa đủ
        cursor: "pointer",
      }}
      onClick={handleClickOpen}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          color: "White", // Màu chữ và icon
        }}
      >
        <IconButton color="inherit" sx={{ p: 0 }}>
          <LanguageIcon />
        </IconButton>
        <Typography variant="body1" sx={{ ml: 1, color: "inherit" }}>
          Language
        </Typography>
      </Box>
      <LanguageModal
        open={open}
        onClose={handleClose}
        onLanguageChange={handleLanguageChange}
      />
    </Box>
  );
};

export default LanguageSwitcher;
