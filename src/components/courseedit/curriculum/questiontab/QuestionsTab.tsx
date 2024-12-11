import React, { useEffect, useState } from "react";
import { MultipleChoiceQuestion } from "../../../../models/Course";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../../theme/ThemeContext";
import { updateQuestions } from "../../../../services/ExerciseService";
import QuestionsList from "./AllQuestionsList";
import QuestionsModal from "./GenQuestionsModal";
import QuestionEditForm from "./QuestionEditForm";

interface QuestionsTabProps {
  id: string;
  questions: MultipleChoiceQuestion[] | undefined;
}

const QuestionsTab: React.FC<QuestionsTabProps> = ({ id, questions }) => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState<MultipleChoiceQuestion[] | undefined>(
    questions
  );
  const [editDocument, setEditDocument] =
    useState<MultipleChoiceQuestion | null>(null);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  const { mode } = useThemeContext();
  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  useEffect(() => {
    setData(questions);
  }, [questions]);

  const handleDelete = async (index: number) => {
    console.log("index", index);
    if (index !== undefined) {
      console.log("index", index);
      const updatedData = data?.filter((_, idx) => idx !== index);
      setData(updatedData);
      console.log(updatedData);
      await updateQuestions(token, id, updatedData || []).then((data) => {
        console.log("edit ques:", data);
      });
      setData(updatedData);
    }
  };

  const handleAddMore = async () => {
    if (data) {
      const updatedData = [
        ...data,
        {
          question_text: "New Question",
          choices: [],
          correct_explanation: "",
          related_lecture: "",
        },
      ];
      await updateQuestions(token, id, updatedData).then((data) => {
        console.log("edit ques:", data);
      });
      setData(updatedData);
    }
  };

  const handleSave = async (updateQuestion: MultipleChoiceQuestion) => {
    if (editDocument !== null && editIndex !== null) {
      if (data) {
        const updatedData = data.map((item, index) =>
          index === editIndex ? updateQuestion : item
        );

        await updateQuestions(token, id, updatedData);

        setData(updatedData);
        setEditDocument(null);
        setEditIndex(null);
      }
    }
  };

  const handleAddAiQuestions = async (questions: MultipleChoiceQuestion[]) => {
    const updatedData = [...(data || []), ...questions];
    await updateQuestions(token, id, updatedData);
    setData(updatedData);
  };

  return (
    <Box>
      {editDocument ? (
        <QuestionEditForm editDocument={editDocument} handleSave={handleSave} />
      ) : (
        <>
          {data && (
            <QuestionsList
              data={data}
              onEdit={(item, index) => {
                setEditDocument(item);
                setEditIndex(index);
              }}
              onDelete={handleDelete}
            />
          )}
          <Button
            sx={{
              width: "fit-content",
              mt: 2,
              backgroundColor,
              color: textColor,
              "&:hover": { backgroundColor },
            }}
            onClick={handleAddMore}
            startIcon={<AddIcon />}
          >
            {t("add_more")}
          </Button>
          <Button
            sx={{
              width: "fit-content",
              mt: 2,
              backgroundColor,
              color: textColor,
              "&:hover": { backgroundColor },
            }}
            onClick={() => setShowModal(true)}
            startIcon={<AddIcon />}
          >
            {t("ai_gen_question")}
          </Button>
        </>
      )}
      <QuestionsModal
        open={showModal}
        onClose={() => setShowModal(false)}
        handleAddAiQuestions={handleAddAiQuestions}
      />
    </Box>
  );
};

export default QuestionsTab;
