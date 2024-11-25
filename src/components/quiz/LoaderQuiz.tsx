import { CircularProgress, Typography, Box } from "@mui/material";

const LoaderQuiz: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        position: "absolute",
        top: "0",
        left: "0",
      }}
    >
      <CircularProgress sx={{ marginBottom: 2 }} />
      <Typography variant="h6">Loading questions...</Typography>
    </Box>
  );
};

export default LoaderQuiz;
