import React from "react";
import { Box, Typography } from "@mui/material";
import SearchCoursePage from "../components/searchcourse/SearchCoursePage";
import { useThemeContext } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const SearchPage: React.FC = () => {
  const { t } = useTranslation();
  const { mode } = useThemeContext();
  const { querySearch } = useParams();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  return (
    <>
      <Typography
        variant="h3"
        sx={{
          mt: 10,
          mx: "10%",
          display: "flex",
          fontWeight: "bold",
          color: textColor,
        }}
      >
        {`Search "${querySearch}" courses`}
      </Typography>
      <Box
        sx={{
          display: "flex",
          width: "80%",
          mt: 10,
          mx: "10%",
        }}
      >
        <SearchCoursePage />
      </Box>
    </>
  );
};

export default SearchPage;
