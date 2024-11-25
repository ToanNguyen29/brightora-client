import { useTranslation } from "react-i18next";
import { useQuiz } from "../../context/QuizContext";
import OptionsQuiz from "./OptionsQuiz";
import { Typography, Box } from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContext";

function QuestionQuiz() {
   const { questions, index } = useQuiz();
   const question = questions.at(index);
   const { mode } = useThemeContext();
   const { t } = useTranslation();
   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";

   if (!question) return null;
   // borderRadius: 2,
   // boxShadow: 2,

   return (
      <Box
         sx={{
            backgroundColor: backgroundColor,
            // borderRadius: 2,
            // boxShadow: 2,
            marginBottom: 2,
         }}
      >
         <Typography variant="h5" component="h4" sx={{ marginBottom: 2 }}>
            {question.question_text}
         </Typography>
         <OptionsQuiz question={question} />
      </Box>
   );
}

export default QuestionQuiz;
