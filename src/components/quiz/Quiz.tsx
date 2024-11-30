import { Box } from "@mui/material";
import { useQuiz } from "../../context/QuizContext";
import LoaderQuiz from "./LoaderQuiz";
import StartScreenQuiz from "./StartScreenQuiz";
import ProgressQuiz from "./ProgressQuiz";
import QuestionQuiz from "./QuestionQuiz";
import FinishScreenQuiz from "./FinishScreenQuiz";

const Quiz: React.FC = () => {
  const { status } = useQuiz();

  console.log(status);

  return (
    // width: "80%", height: "100%"
    <>
      {status === "loading" && <LoaderQuiz />}
      {/* {status === "error" && <Error />} */}
      {status === "ready" && <StartScreenQuiz />}
      {status === "active" && (
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
          <ProgressQuiz />
          <QuestionQuiz />
        </Box>
      )}
      {status === "finished" && <FinishScreenQuiz />}
    </>
  );
};

export default Quiz;
