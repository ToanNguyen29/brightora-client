import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const LoadingPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <CircularProgress />
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingPage;
