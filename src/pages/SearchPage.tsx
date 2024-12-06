import React from "react";
import { Box } from "@mui/material";
import SearchCoursePage from "../components/searchcourse/SearchCoursePage";

const SearchPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "80%",
        minHeight: "90vh",
        mt: 5,
        mx: "10%",
      }}
    >
      <SearchCoursePage />
    </Box>
  );
};

export default SearchPage;
