import React, { useState } from "react";
import ReactMarkdown from "react-markdown"; // Import ReactMarkdown
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  Divider,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { IAns, IQAndA } from "../../models/QaA";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";
import RichTextBox from "../reused/RichTextBoxComponent";
import { createAnswer } from "../../services/QuesAndAnsService";
import { useAuth } from "../../context/AuthContext";

interface QandAListProps {
  data: IQAndA[];
  instructorInfo: string | undefined;
  setData: React.Dispatch<React.SetStateAction<IQAndA[]>>;
}

const QandAList: React.FC<QandAListProps> = ({
  data,
  instructorInfo,
  setData,
}) => {
  const { t } = useTranslation();
  const token = localStorage.getItem("token");
  const { mode } = useThemeContext();
  const [newAnswer, setNewAnswer] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const { userInfo } = useAuth();
  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";
  const [selectedQnA, setSelectedQnA] = useState<IQAndA | null>(null);

  const handleSelectQuestion = (qna: IQAndA) => {
    setSelectedQnA(qna);
  };

  const handleBackToList = () => {
    setSelectedQnA(null);
  };

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setNewAnswer("");
    setIsEditing(false);
  };

  const handleAddAnswer = async () => {
    if (!newAnswer.trim()) {
      console.error("Question cannot be empty");
      return;
    }
    console.log("selectedQnA", selectedQnA);
    if (!token) {
      console.error("User not authenticated");
      return;
    }
    if (!selectedQnA?._id) {
      console.error("User not authenticated");
      return;
    }

    try {
      const data = await createAnswer(token, selectedQnA?._id, newAnswer);
      console.log(data);

      const newObject: IAns = {
        content: newAnswer,
        user: {
          first_name: userInfo.first_name || "",
          last_name: userInfo.last_name || "",
          photo: userInfo.photo || "",
          _id: userInfo._id || "",
        },
      };

      setData((prev) => {
        return prev.map((item) => {
          if (item._id === selectedQnA._id) {
            return {
              ...item,
              answer: [...item.answer, newObject],
            };
          }
          return item;
        });
      });

      setSelectedQnA((prev) => {
        if (prev) {
          return {
            ...prev,
            answer: [...prev.answer, newObject],
          };
        }
        return prev;
      });

      setNewAnswer("");
      setIsEditing(false);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  return (
    <Box sx={{ width: "100%", margin: "auto", padding: 1 }}>
      {selectedQnA ? (
        <Paper sx={{ padding: 2, borderRadius: 1 }}>
          <Button
            onClick={handleBackToList}
            variant="outlined"
            sx={{ mb: 2, color: backgroundColor, backgroundColor: textColor }}
          >
            ← Back to All Questions
          </Button>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Avatar
              src={selectedQnA.student.photo}
              alt={selectedQnA.student.first_name}
              sx={{
                width: 64,
                height: 64,
                marginRight: 1,
              }}
            />
            <Box>
              <Typography variant="body1">
                <ReactMarkdown>{selectedQnA.question}</ReactMarkdown>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Asked by {selectedQnA.student.first_name}{" "}
                {selectedQnA.student.last_name} on{" "}
                {selectedQnA.created_at
                  ? new Date(selectedQnA.created_at).toLocaleString()
                  : new Date().toLocaleString()}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h6" mb={1}>
            Answers:
          </Typography>
          <List>
            {selectedQnA.answer.map((answer, i) => (
              <React.Fragment key={i}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    paddingY: 2,
                    backgroundColor:
                      instructorInfo && answer.user._id === instructorInfo
                        ? "#e8f5e9"
                        : "transparent",
                  }}
                >
                  <Box sx={{ flex: 1, display: "flex" }}>
                    <ListItemAvatar>
                      <Avatar
                        src={answer.user.photo}
                        alt={answer.user.first_name}
                        sx={{
                          width: 48,
                          height: 48,
                          marginRight: 2,
                        }}
                      />
                    </ListItemAvatar>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        sx={{ mb: 0.5 }}
                      >
                        {answer.user.first_name} {answer.user.last_name}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {answer.created_at
                          ? new Date(answer.created_at).toLocaleString()
                          : new Date().toLocaleString()}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          width: "100%",
                        }}
                      >
                        <ReactMarkdown>{answer.content}</ReactMarkdown>
                      </Typography>
                    </Box>
                  </Box>
                </ListItem>

                {i < selectedQnA.answer.length - 1 && (
                  <Divider
                    variant="inset"
                    component="li"
                    sx={{ marginLeft: 7 }}
                  />
                )}
              </React.Fragment>
            ))}
            <Typography
              variant="body1"
              sx={{
                mt: 2,
                width: "100%",
                fontWeight: "bold",
                mb: 1.5,
              }}
            >
              Write your answer
            </Typography>
            {isEditing ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  alignItems: "center",
                }}
              >
                <RichTextBox text={newAnswer} handleTextChange={setNewAnswer} />
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleAddAnswer}
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
                placeholder="Add your answer"
                value={newAnswer}
                onClick={handleStartEditing}
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: 2,
                  },
                }}
              />
            )}
          </List>
        </Paper>
      ) : (
        <>
          {data.map((qna, index) => (
            <Paper
              key={index}
              sx={{
                padding: 2,
                marginBottom: 2,
                borderRadius: 3,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                boxShadow: 2,
                "&:hover": { backgroundColor: "action.hover", boxShadow: 4 },
              }}
              onClick={() => handleSelectQuestion(qna)}
            >
              <Avatar
                src={qna.student.photo}
                alt={qna.student.first_name}
                sx={{
                  width: 64,
                  height: 64,
                  marginRight: 3,
                }}
              />

              <Box sx={{ flex: 1, overflow: "hidden" }}>
                <Typography
                  variant="body1"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontWeight: "bold",
                    lineHeight: 1.0,
                  }}
                >
                  <ReactMarkdown>{qna.question}</ReactMarkdown>
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", marginTop: 0.5 }}
                >
                  {qna.student.first_name} {qna.student.last_name} ·{" "}
                  {qna.created_at
                    ? new Date(qna.created_at).toLocaleString()
                    : new Date().toLocaleString()}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  minWidth: 100,
                  justifyContent: "flex-end",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <QuestionAnswerIcon sx={{ fontSize: 24, color: textColor }} />
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{ fontSize: 16, color: textColor }}
                  >
                    {qna.answer.length}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))}
        </>
      )}
    </Box>
  );
};

export default QandAList;
