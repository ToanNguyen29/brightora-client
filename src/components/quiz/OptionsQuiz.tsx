import { Button, Grid, Stack, Typography } from "@mui/material";
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
  const borderColor = mode === "light" ? "#ddd" : "#333";

  const hasAnswered = !!answer;

  return (
    <Stack spacing={3} alignItems="center">
      <Grid container spacing={2} justifyContent="center">
        {question.choices.map((option, index) => {
          const isCorrect = option.is_correct;

          let backgroundColorButton = backgroundColor;
          let borderStyle = `2px solid ${borderColor}`;

          if (hasAnswered) {
            if (answer?.option_text === option.option_text) {
              backgroundColorButton = isCorrect
                ? "rgb(76, 175, 80)" // Green if correct
                : "rgb(244, 67, 54)"; // Red if wrong
              borderStyle = `2px solid ${
                isCorrect ? "rgb(56, 142, 60)" : "rgb(211, 47, 47)"
              }`;
            }
          }

          return (
            <Grid
              item
              xs={12}
              sm={6}
              key={index}
              sx={{
                display: "flex",
                justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: backgroundColorButton,
                  color: textColor,
                  textAlign: "center",
                  width: "90%", // Adjust width for fitting size
                  borderRadius: "8px",
                  border: borderStyle, // Add border
                  "&:hover": {
                    backgroundColor: backgroundColorButton,
                    borderColor: borderColor,
                  },
                  padding: "10px 20px", // Adjust padding for a tighter fit
                  fontSize: "14px", // Fit button text
                }}
                onClick={() => {
                  handleChoise();
                  if (!hasAnswered) {
                    dispatch({ type: "newAnswer", payload: option });
                  }
                }}
              >
                {option.option_text}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}

export default OptionsQuiz;
