import { Button, Typography, Box } from "@mui/material";
import { useQuiz } from "../../context/QuizContext";

function FinishScreenQuiz() {
  const { points, maxPossiblePoints, dispatch } = useQuiz();

  const percentage = (points / maxPossiblePoints) * 100;

  let emoji: string;
  if (percentage === 100) emoji = "🥇";
  else if (percentage >= 80 && percentage < 100) emoji = "🎉";
  else if (percentage >= 50 && percentage < 80) emoji = "🙃";
  else if (percentage >= 0 && percentage < 50) emoji = "🤨";
  else emoji = "🤦‍♂️";

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "absolute",
        top: "0",
        left: "0",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h5"
        component="p"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </Typography>

      <Box sx={{ margin: "10px 0" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch({ type: "restart" })}
        >
          Restart quiz
        </Button>
      </Box>
    </Box>
  );
}

export default FinishScreenQuiz;
