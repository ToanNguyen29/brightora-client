import React, { useState } from "react";
import {
   Box,
   Button,
   Modal,
   TextField,
   MenuItem,
   Grid,
   Checkbox,
   FormControlLabel,
   IconButton,
   Dialog,
   DialogTitle,
   DialogContent,
   List,
   ListItem,
   Typography,
   Paper,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import InfoIcon from "@mui/icons-material/Info";
import { genQuestion } from "../../../../services/ExerciseService";
import { MultipleChoiceQuestion } from "../../../../models/Course";
import { useThemeContext } from "../../../../theme/ThemeContext";

interface QuestionsModalProps {
   open: boolean;
   onClose: () => void;
   handleAddAiQuestions: (questions: MultipleChoiceQuestion[]) => void;
}

const QuestionsModal: React.FC<QuestionsModalProps> = ({
   open,
   onClose,
   handleAddAiQuestions,
}) => {
   const token = localStorage.getItem("token");
   const { t } = useTranslation();
   const { mode } = useThemeContext();

   const backgroundColor = mode === "light" ? "#ffffff" : "#121212";
   const textColor = mode === "light" ? "#000000" : "#ffffff";

   const [count, setCount] = useState(1);
   const [lang, setLang] = useState("english");
   const [difficulty, setDifficulty] = useState(1);
   const [description, setDescription] = useState("");
   const [questions, setQuestions] = useState<MultipleChoiceQuestion[]>([]);
   const [selectedQuestions, setSelectedQuestions] = useState<
      MultipleChoiceQuestion[]
   >([]);
   const [selectedQuestion, setSelectedQuestion] =
      useState<MultipleChoiceQuestion | null>(null);

   const handleGenerate = async () => {
      const response = await genQuestion(
         token,
         count,
         lang,
         difficulty,
         description,
      );
      if (response.succeed && response.questions) {
         setQuestions(response.questions);
      }
   };

   const handleCheckboxChange = (question: MultipleChoiceQuestion) => {
      setSelectedQuestions((prev) =>
         prev.includes(question)
            ? prev.filter((q) => q !== question)
            : [...prev, question],
      );
   };

   const handleConfirmSelection = () => {
      console.log("Selected Questions:", selectedQuestions);
      handleAddAiQuestions(selectedQuestions); // Assuming this is where you'd pass the selected questions
      onClose();
   };

   const handleShowDetails = (question: MultipleChoiceQuestion) => {
      setSelectedQuestion(question);
   };

   const handleCloseDetails = () => {
      setSelectedQuestion(null);
   };

   const handleOptionTextChange = (index: number, newText: string) => {
      if (selectedQuestion) {
         const updatedQuestion = {
            ...selectedQuestion,
            choices: selectedQuestion.choices.map((choice, i) =>
               i === index ? { ...choice, option_text: newText } : choice,
            ),
         };
         setSelectedQuestion(updatedQuestion);
         setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
               q.question_text === updatedQuestion.question_text
                  ? updatedQuestion
                  : q,
            ),
         );
      }
   };

   return (
      <Modal open={open} onClose={onClose}>
         <Paper
            sx={{
               p: 4,
               bgcolor: backgroundColor,
               color: textColor,
               boxShadow: 24,
               borderRadius: 2,
               minWidth: 700,
               maxWidth: 400,
               margin: "auto",
               mt: 4,
            }}
         >
            <Typography variant="h5" sx={{ mb: 2 }}>
               {t("ai_gen_question")}
            </Typography>
            <Grid container spacing={2}>
               <Grid item xs={4}>
                  <TextField
                     label={t("count")}
                     type="number"
                     value={count}
                     onChange={(e) => setCount(Number(e.target.value))}
                     inputProps={{ min: 1, max: 5 }}
                     fullWidth
                     sx={{ bgcolor: "#f0f0f0", borderRadius: 1 }}
                  />
               </Grid>
               <Grid item xs={4}>
                  <TextField
                     label={t("language")}
                     select
                     value={lang}
                     onChange={(e) => setLang(e.target.value)}
                     fullWidth
                     sx={{ bgcolor: "#f0f0f0", borderRadius: 1 }}
                  >
                     <MenuItem value="english">English</MenuItem>
                     <MenuItem value="vietnamese">Vietnamese</MenuItem>
                  </TextField>
               </Grid>
               <Grid item xs={4}>
                  <TextField
                     label={t("difficulty")}
                     select
                     value={difficulty}
                     onChange={(e) => setDifficulty(Number(e.target.value))}
                     fullWidth
                     sx={{ bgcolor: "#f0f0f0", borderRadius: 1 }}
                  >
                     <MenuItem value={1}>Easy</MenuItem>
                     <MenuItem value={5}>Medium</MenuItem>
                     <MenuItem value={10}>Hard</MenuItem>
                  </TextField>
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     label={t("description")}
                     multiline
                     rows={3}
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     fullWidth
                     sx={{ bgcolor: "#f0f0f0", borderRadius: 1 }}
                  />
               </Grid>
            </Grid>
            <Button
               variant="contained"
               sx={{ mt: 3, bgcolor: textColor, color: backgroundColor }}
               onClick={handleGenerate}
            >
               {t("generate_question")}
            </Button>

            <Box sx={{ mt: 3 }}>
               {questions.map((question) => (
                  <Box
                     key={question.question_text}
                     sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        bgcolor: mode === "light" ? "#f9f9f9" : "#2c2c2c",
                        p: 1,
                        borderRadius: 1,
                        mb: 1,
                     }}
                  >
                     <FormControlLabel
                        control={
                           <Checkbox
                              checked={selectedQuestions.includes(question)}
                              onChange={() => handleCheckboxChange(question)}
                           />
                        }
                        label={question.question_text}
                        sx={{ flex: 1 }}
                     />
                     <IconButton
                        onClick={() => handleShowDetails(question)}
                        sx={{ color: textColor }}
                     >
                        <InfoIcon />
                     </IconButton>
                  </Box>
               ))}
            </Box>

            {questions.length > 0 && (
               <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, bgcolor: textColor, color: backgroundColor }}
                  onClick={handleConfirmSelection}
               >
                  {t("confirm_selection")}
               </Button>
            )}

            <Dialog
               open={Boolean(selectedQuestion)}
               onClose={handleCloseDetails}
            >
               <DialogTitle sx={{ bgcolor: backgroundColor, color: textColor }}>
                  {selectedQuestion?.question_text}
               </DialogTitle>
               <DialogContent
                  sx={{ bgcolor: backgroundColor, color: textColor }}
               >
                  <List>
                     {selectedQuestion?.choices.map((choice, index) => (
                        <ListItem key={index}>
                           <TextField
                              fullWidth
                              value={choice.option_text}
                              onChange={(e) =>
                                 handleOptionTextChange(index, e.target.value)
                              }
                              label={
                                 choice.is_correct
                                    ? `${t("correct_answer")}`
                                    : `${t("option")}`
                              }
                              sx={{
                                 bgcolor:
                                    mode === "light" ? "#f0f0f0" : "#2c2c2c",
                                 borderRadius: 1,
                              }}
                           />
                        </ListItem>
                     ))}
                  </List>
                  <Box mt={2}>
                     <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {t("correct_explanation")}:
                     </Typography>
                     <Typography variant="body2">
                        {selectedQuestion?.correct_explanation}
                     </Typography>
                  </Box>
               </DialogContent>
            </Dialog>
         </Paper>
      </Modal>
   );
};

export default QuestionsModal;
