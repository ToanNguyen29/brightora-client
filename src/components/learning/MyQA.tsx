import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import QAItem from "./QAItem";
import { createQuestion } from "../../services/QuesAndAnsService";
import { useAuth } from "../../context/AuthContext";

interface IQAndA {
  _id: string;
  question: string;
  answer: string | null;
  student: {
    first_name: string;
    last_name: string;
    photo: string;
  };
}

interface MyQAProps {
  qAndA: IQAndA[] | [];
  courseId: string | undefined;
}

const MyQA: React.FC<MyQAProps> = ({ qAndA, courseId }) => {
  const { userInfo } = useAuth();

  const [newQuestion, setNewQuestion] = useState<string>("");
  const [listMyQa, setlistMyQa] = useState<IQAndA[]>(qAndA);

  const token = localStorage.getItem("token");
  const handleAddQuestion = async () => {
    if (!newQuestion.trim()) {
      console.error("Question cannot be empty");
      return;
    }
    if (!token) {
      console.error("User not authenticated");
      return;
    }
    if (!courseId) {
      console.error("Course ID is missing");
      return;
    }

    try {
      const data = await createQuestion(token, newQuestion, courseId);
      console.log(data);
      const newObject: IQAndA = {
        _id: data.data.qa_id,
        question: newQuestion.trim(),
        answer: null,
        student: {
          first_name: userInfo?.first_name ?? "",
          last_name: userInfo?.last_name ?? "",
          photo: userInfo?.photo ?? "",
        },
      };

      setlistMyQa((prev) => [...prev, newObject]); // Functional form for safe updates
      setNewQuestion(""); // Clear the input field
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };
  useEffect(() => {
    setlistMyQa(qAndA); // Update the list of my questions whenever the qAndA prop changes
  }, [qAndA]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
        backgroundColor: "white",
        color: "black",
        border: "1px solid black",
        borderRadius: 2,
        margin: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Enter new question..."
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddQuestion();
            }
          }}
          sx={{
            backgroundColor: "white",
          }}
        />
        <Button
          variant="contained"
          onClick={handleAddQuestion}
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "grey",
            },
          }}
        >
          Send
        </Button>
      </Box>
      {listMyQa.length > 0 && <Typography>Your questions</Typography>}
      {listMyQa.length > 0 &&
        listMyQa.map((item) => <QAItem key={item._id} qAndA={item} />)}
    </Box>
  );
};

export default MyQA;
