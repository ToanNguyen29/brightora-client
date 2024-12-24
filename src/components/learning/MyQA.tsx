import React, { useEffect, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import QandAList from "./QandAList";
import RichTextBox from "../reused/RichTextBoxComponent";
import { createQuestion } from "../../services/QuesAndAnsService";
import { useAuth } from "../../context/AuthContext";
import { IQAndA } from "../../models/QaA";
import { IOwner } from "../../models/Course";

interface MyQAProps {
  qAndA: IQAndA[] | [];
  setData: React.Dispatch<React.SetStateAction<IQAndA[]>>;
  courseId: string | undefined;
  instructorInfo: IOwner | undefined;
}

const MyQA: React.FC<MyQAProps> = ({
  qAndA,
  courseId,
  instructorInfo,
  setData,
}) => {
  const { userInfo } = useAuth();

  const [newQuestion, setNewQuestion] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
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
        course: courseId,
        question: newQuestion.trim(),
        answer: [],
        student: {
          _id: userInfo._id || "",
          first_name: userInfo?.first_name ?? "",
          last_name: userInfo?.last_name ?? "",
          photo: userInfo?.photo ?? "",
        },
      };

      console.log("newObject", newObject);

      setlistMyQa((prev) => [...prev, newObject]);
      setNewQuestion("");
      setIsEditing(false);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  useEffect(() => {
    setlistMyQa(qAndA);
  }, [qAndA]);

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setNewQuestion("");
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
        backgroundColor: "white",
        width: "80%",
        color: "black",
        mx: "10%",
        borderRadius: 2,
        margin: "auto",
      }}
    >
      {isEditing ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "80%",
            mx: "auto",
            alignItems: "center",
          }}
        >
          <RichTextBox text={newQuestion} handleTextChange={setNewQuestion} />
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
            }}
          >
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
            <Button
              variant="outlined"
              onClick={handleCancelEditing}
              sx={{
                borderColor: "grey",
                color: "black",
                "&:hover": {
                  backgroundColor: "lightgrey",
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
        <TextField
          placeholder="Add your question"
          value={newQuestion}
          onClick={handleStartEditing}
          fullWidth
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: 2,
            },
            width: "80%",
            mx: "auto",
          }}
        />
      )}

      {listMyQa.length > 0 && (
        <QandAList
          data={listMyQa}
          instructorInfo={instructorInfo?._id}
          setData={setData}
        />
      )}
    </Box>
  );
};

export default MyQA;
