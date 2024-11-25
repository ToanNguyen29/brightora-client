import { LinearProgress, Box, Typography } from "@mui/material";
import { useQuiz } from "../../context/QuizContext";

function ProgressQuiz() {
  const { index, numQuestions, points, maxPossiblePoints, answer } = useQuiz();

  const progressValue =
    ((index + Number(answer !== null)) / numQuestions) * 100;

  return (
    <Box component="header">
      <LinearProgress
        variant="determinate"
        value={progressValue}
        sx={{
          height: 10,
          borderRadius: 5,
          marginBottom: 2,
        }}
      />
      <Typography variant="subtitle1" component="p">
        Question <strong>{index + 1}</strong> / {numQuestions}
      </Typography>
      <Typography variant="subtitle1" component="p">
        Point <strong>{points}</strong> / {maxPossiblePoints}
      </Typography>
    </Box>
  );
}

export default ProgressQuiz;
