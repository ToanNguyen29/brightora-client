import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../theme/ThemeContext";
interface CloseAccountButtonComponentProps {
   handleClose: () => void;
}
const CloseAccountButtonComponent: React.FC<
   CloseAccountButtonComponentProps
> = ({ handleClose }) => {
   const { t } = useTranslation();
   const { mode } = useThemeContext();

   return (
      <Button
         sx={{
            fontSize: "16px",
            my: "30px",
            backgroundColor: mode === "dark" ? "white" : "black",
            color: mode === "dark" ? "black" : "white",
            padding: "10px 20px",
            fontWeight: "bold",
            ":hover": {
               backgroundColor: mode === "dark" ? "white" : "black",
            },
         }}
         onClick={handleClose}
      >
         {t("close_account")}
      </Button>
   );
};
export default CloseAccountButtonComponent;
