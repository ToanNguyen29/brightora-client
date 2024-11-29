import { useQuiz } from "../../context/QuizContext";
import OptionsQuiz from "./OptionsQuiz";
import { Typography, Box, Button } from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContext";
import { useState } from "react";
import NextButtonQuiz from "./NextButtonQuiz";
import QAQuiz from "./QAQuiz";

function QuestionQuiz() {
  const { questions, index } = useQuiz();
  const [show, setShow] = useState(false);
  const question = questions.at(index);
  const { mode } = useThemeContext();
  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";

  const handleChoise = () => {
    console.log("handleChoise");
    setShow(true);
  };
  console.log(question);
  return (
    <Box
      sx={{
        backgroundColor: backgroundColor,
        marginBottom: 2,
      }}
    >
      <Typography variant="h5" component="h4" sx={{ marginBottom: 2 }}>
        {question.question_text}
      </Typography>
      <OptionsQuiz question={question} handleChoise={handleChoise} />
      {show && <QAQuiz />}
      <NextButtonQuiz />
    </Box>
  );
}

export default QuestionQuiz;
