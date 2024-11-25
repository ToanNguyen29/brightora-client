import { Button } from "@mui/material";
import { useQuiz } from "../../context/QuizContext";

function NextButtonQuiz() {
   const { dispatch, answer, index, numQuestions } = useQuiz();

   if (answer === null) return null;

   const handleNext = () => {
      dispatch({ type: index < numQuestions - 1 ? "nextQuestion" : "finish" });
   };

   return (
      <Button
         variant="contained"
         color="primary"
         onClick={handleNext}
         sx={{ mt: 2 }}
      >
         {index < numQuestions - 1 ? "Next" : "Finish"}
      </Button>
   );
}

export default NextButtonQuiz;
