import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../theme/ThemeContext";
interface SaveComponentProps {
   handleSave: () => void;
}
const SaveComponent: React.FC<SaveComponentProps> = ({ handleSave }) => {
   const { t } = useTranslation();
   const { mode } = useThemeContext();

   return (
      <Button
         sx={{
            fontSize: "16px",
            my: "15px",
            backgroundColor: mode === "dark" ? "white" : "black",
            color: mode === "dark" ? "black" : "white",
            padding: "10px 20px",
            fontWeight: "bold",
            ":hover": {
               backgroundColor: mode === "dark" ? "white" : "black",
            },
            width: "100px",
         }}
         onClick={handleSave}
      >
         {t("save")}
      </Button>
   );
};

export default SaveComponent;
