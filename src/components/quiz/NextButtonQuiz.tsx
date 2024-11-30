import { Box, Button } from "@mui/material";
import { useQuiz } from "../../context/QuizContext";
interface QAQuizProps {
  handleHide: () => void;
}

function NextButtonQuiz({ handleHide }: QAQuizProps) {
  const { dispatch, answer, index, numQuestions } = useQuiz();

  if (answer === null) return null;

  const handleNext = () => {
    handleHide();
    dispatch({ type: index < numQuestions - 1 ? "nextQuestion" : "finish" });
  };

  return (
    <Button
      variant="contained"
      onClick={handleNext}
      sx={{ bgcolor: "black", color: "white", fontWeight: "bold" }}
    >
      {index < numQuestions - 1 ? "Next" : "Finish"}
    </Button>
  );
}

export default NextButtonQuiz;
