import { Button, Stack, Typography } from "@mui/material";
import { useQuiz } from "../../context/QuizContext";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";

interface Choice {
  option_text: string;
  is_correct: boolean;
}

interface Question {
  question_text: string;
  choices: Choice[];
  correct_explanation: string;
  related_lecture: string;
  points: number;
}

interface OptionsProps {
  question: Question;
  handleChoise: () => void;
}

function OptionsQuiz({ question, handleChoise }: OptionsProps) {
  const { dispatch, answer } = useQuiz();
  const { mode } = useThemeContext();
  const { t } = useTranslation();
  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  const hasAnswered = answer ? true : false;

  return (
    <Stack spacing={2} direction="column" alignItems="stretch">
      {question.choices.map((option, index) => {
        const isCorrect = option.is_correct;

        // Nếu đã trả lời
        let backgroundColorButton = backgroundColor; // Màu nền mặc định
        if (hasAnswered) {
          if (answer?.option_text === option.option_text) {
            // Nếu chọn đúng, xanh lá
            backgroundColorButton = isCorrect
              ? "rgb(76, 175, 80)" // Xanh lá nếu đúng
              : "rgb(244, 67, 54)"; // Đỏ nếu sai
          }
        }
        return (
          <Button
            key={index}
            variant="contained"
            sx={{
              backgroundColor: backgroundColorButton,
              color: textColor,
              "&:hover": { backgroundColor: backgroundColorButton },
              // Giữ nguyên màu nếu đã trả lời
            }}
            onClick={() => {
              handleChoise();
              if (!hasAnswered) {
                return dispatch({ type: "newAnswer", payload: option });
              }
            }}
          >
            {option.option_text}
          </Button>
        );
      })}
    </Stack>
  );
}

export default OptionsQuiz;
