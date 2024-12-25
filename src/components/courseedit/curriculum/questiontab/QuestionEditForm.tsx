import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslation } from "react-i18next";

import { useThemeContext } from "../../../../theme/ThemeContext";
import { MultipleChoiceQuestion } from "../../../../models/Course";
import CancelIcon from "@mui/icons-material/Cancel";

interface QuestionEditFormProps {
  editDocument: MultipleChoiceQuestion;
  handleSave: (updateQuestion: MultipleChoiceQuestion) => void;
  handleCancel: () => void;
}

const QuestionEditForm: React.FC<QuestionEditFormProps> = ({
  editDocument,
  handleSave,
  handleCancel,
}) => {
  const { t } = useTranslation();
  const { mode } = useThemeContext();
  // State để lưu câu hỏi, các lựa chọn và giải thích
  const [editQuestion, setEditQuestion] = useState<string>(
    editDocument.question_text || ""
  );
  const [choices, setChoices] = useState<
    { option_text: string; is_correct: boolean }[]
  >(
    editDocument.choices.length === 4
      ? editDocument.choices
      : Array.from({ length: 4 }, () => ({
          option_text: "",
          is_correct: false,
        }))
  );
  const [editExplanation, setEditExplanation] = useState<string>(
    editDocument.correct_explanation || ""
  );

  const handleChoiceChange = (index: number, newText: string) => {
    const updatedChoices = [...choices];
    updatedChoices[index].option_text = newText;
    setChoices(updatedChoices);
  };

  const handleCorrectChange = (index: number) => {
    const updatedChoices = choices.map((choice, i) => ({
      ...choice,
      is_correct: i === index, // Đảm bảo chỉ có 1 đáp án đúng
    }));
    setChoices(updatedChoices);
  };

  const onSave = () => {
    const updatedDocument: MultipleChoiceQuestion = {
      ...editDocument,
      question_text: editQuestion,
      choices: choices,
      correct_explanation: editExplanation,
    };

    console.log("Edit question:", updatedDocument);
    handleSave(updatedDocument);
  };

  const buttonStyle = {
    fontSize: "14px",
    my: "5px",
    mr: 2,
    backgroundColor: mode === "dark" ? "white" : "black",
    color: mode === "dark" ? "black" : "white",
    padding: "10px 20px",
    fontWeight: "bold",
    ":hover": {
      backgroundColor: mode === "dark" ? "white" : "black",
    },
    minWidth: "200px",
  };

  return (
    <Box>
      <TextField
        label={t("Question Text")}
        value={editQuestion}
        onChange={(e) => setEditQuestion(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label={t("Correct Explanation")}
        value={editExplanation}
        onChange={(e) => setEditExplanation(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        {t("Choices")}
      </Typography>

      {choices.map((choice, index) => (
        <Grid container key={index} mb={2} sx={{ width: "100%" }}>
          <Grid item xs={1}>
            <Checkbox
              checked={choice.is_correct}
              onChange={() => handleCorrectChange(index)}
              color="primary"
            />
          </Grid>
          <Grid item xs={11}>
            <TextField
              label={`${t("Choice")} ${index + 1}`}
              value={choice.option_text}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
      ))}

      <Box display="flex" mt={4} mb={2}>
        <Button sx={buttonStyle} startIcon={<SaveIcon />} onClick={onSave}>
          {t("Save")}
        </Button>
        <Button
          sx={buttonStyle}
          startIcon={<CancelIcon />}
          onClick={handleCancel}
        >
          {t("Cancel")}
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionEditForm;
