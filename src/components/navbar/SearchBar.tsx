import React from "react";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // Import useNavigate từ React Router

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Khởi tạo hook navigate

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (!searchQuery) return;
      // Nếu nhấn Enter, chuyển hướng đến trang search với query string
      navigate(`/courses/search/${searchQuery}`);
    }
  };

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
      onKeyDown={handleKeyDown} // Thêm sự kiện onKeyDown
    />
  );
};

export default SearchBar;
