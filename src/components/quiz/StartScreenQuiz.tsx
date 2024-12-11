import { Button, Typography, Box } from "@mui/material";
import { useQuiz } from "../../context/QuizContext";

function StartScreenQuiz() {
  const { numQuestions, dispatch } = useQuiz();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "absolute",
        top: "0",
        left: "0",
        flexDirection: "column", // Nội dung xếp dọc
        alignItems: "center", // Căn giữa theo chiều ngang
        justifyContent: "center", // Căn trên theo chiều dọc
        padding: 1,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to Quiz!
      </Typography>
      <Typography variant="h5">{numQuestions} questions to test</Typography>
      <Button
        variant="contained"
        onClick={() => dispatch({ type: "start" })}
        sx={{
          mt: 1,
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "primary.main",
          "&:hover": { backgroundColor: "primary.dark" },
        }}
      >
        Let's start
      </Button>
    </Box>
  );
}

export default StartScreenQuiz;
