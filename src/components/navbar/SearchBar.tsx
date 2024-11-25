import React from "react";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
   searchQuery: string;
   onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
   searchQuery,
   onSearchChange,
}) => {
   const { t } = useTranslation();

   return (
      <TextField
         value={searchQuery}
         onChange={onSearchChange}
         placeholder={t("search")}
         variant="outlined"
         size="small"
         sx={{
            mx: 2,
            flexGrow: 1,
            backgroundColor: "white",
            borderRadius: 1,
         }}
      />
   );
};

export default SearchBar;
