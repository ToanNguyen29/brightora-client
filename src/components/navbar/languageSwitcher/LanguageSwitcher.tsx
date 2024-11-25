import React, { useState } from "react";
import { IconButton } from "@mui/material";
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
      <>
         <IconButton
            color="inherit"
            onClick={handleClickOpen}
            sx={{ ml: 2, color: mode === "dark" ? "white" : "black" }}
         >
            <LanguageIcon />
         </IconButton>
         <LanguageModal
            open={open}
            onClose={handleClose}
            onLanguageChange={handleLanguageChange}
         />
      </>
   );
};

export default LanguageSwitcher;
