import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuiz } from "../../context/QuizContext";
import { getAnswer } from "../../services/Enrollment";

export interface Message {
  text: string;
  sender: "user" | "system";
}

function QAQuiz() {
  const { questions, index, answer } = useQuiz();
  const question = questions.at(index);

  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setConversation((prev) => [...prev, { text: input, sender: "user" }]);
      setInput("");
    }
    handleAsk();
  };
  useEffect(() => {
    if (question.correct_explanation) {
      setConversation([
        {
          text: question.correct_explanation,
          sender: "system",
        },
      ]);
    }
  }, [question]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleAsk = async () => {
    if (!answer) {
      return;
    }

    try {
      const data = await getAnswer(
        question.question_text,
        answer.option_text,
        conversation
      );
      const replyMessage = data?.answer; // Ensure safe access to `answer`

      setConversation((prev) => [
        ...prev,
        {
          text: replyMessage || "No response available", // Fallback in case `replyMessage` is undefined
          sender: "system",
        },
      ]);
    } catch (error) {
      console.error("Error fetching answer:", error);
      setConversation((prev) => [
        ...prev,
        {
          text: "An error occurred while fetching the answer.",
          sender: "system",
        },
      ]);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        padding: 2,
        border: "1px solid #ddd",
        borderRadius: "8px",
        maxWidth: "550px",
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          marginBottom: 2,
          maxHeight: 180, // Approximate height for 3 messages
          display: "flex",
          flexDirection: "column",
        }}
      >
        {conversation.map((message, index) => (
          <Box
            key={index}
            sx={{
              marginBottom: 1,
              textAlign: message.sender === "user" ? "right" : "left",
            }}
          >
            <Typography
              sx={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "8px",
                backgroundColor:
                  message.sender === "user" ? "#d1e7ff" : "#f1f1f1",
              }}
            >
              {message.text}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: "flex" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          size="small"
        />
        <Button variant="contained" onClick={handleSend} sx={{ marginLeft: 1 }}>
          Ask
        </Button>
      </Box>
    </Box>
  );
}

export default QAQuiz;
