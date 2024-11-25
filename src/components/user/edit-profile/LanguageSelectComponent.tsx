import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

interface LanguageSelectComponentProps {
   lang: string;
   handleChange: (event: any) => void;
}

const LanguageSelectComponent: React.FC<LanguageSelectComponentProps> = ({
   lang,
   handleChange,
}) => {
   const { t } = useTranslation();

   return (
      <FormControl sx={{ width: "100%", mt: "10px" }}>
         <InputLabel id="demo-select-small-label">{t("language")}</InputLabel>
         <Select
            value={lang}
            label="Lang"
            onChange={handleChange}
            sx={{
               fontSize: "16px",
            }}
         >
            <MenuItem
               value={"English"}
               sx={{
                  fontSize: "16px",
               }}
            >
               {t("eng")}
            </MenuItem>
            <MenuItem
               value={"Vietnamese"}
               sx={{
                  fontSize: "16px",
               }}
            >
               {t("vn")}
            </MenuItem>
         </Select>
      </FormControl>
   );
};

export default LanguageSelectComponent;
