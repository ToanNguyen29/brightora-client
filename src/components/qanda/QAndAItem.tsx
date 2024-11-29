import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  TextField,
  Stack,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import ReplyIcon from "@mui/icons-material/Reply";
import ReactMarkdown from "react-markdown";

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

interface QAItemProps {
  qAndA: IQAndA;

  onReplySubmit: (questionId: string, reply: string) => void;
}

const QAItem: React.FC<QAItemProps> = ({ qAndA, onReplySubmit }) => {
  const [showFull, setShowFull] = useState(false); // Trạng thái "Show more/Show less"
  const [reply, setReply] = useState<string>(""); // Nội dung trả lời
  const [isReplying, setIsReplying] = useState(false); // Trạng thái đang trả lời

  const MAX_LENGTH = 150;

  const handleReplySubmit = () => {
    onReplySubmit(qAndA._id, reply);
    setReply("");
    setIsReplying(false);
  };

  return (
    <Card sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        {/* Thông tin sinh viên */}
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src={qAndA.student.photo} alt={qAndA.student.first_name} />
          <Box ml={2}>
            <Typography variant="subtitle1" fontWeight="bold">
              {qAndA.student.first_name} {qAndA.student.last_name}
            </Typography>
          </Box>
        </Box>

        <ReactMarkdown>
          {qAndA.question.length > MAX_LENGTH && !showFull
            ? `${qAndA.question.slice(0, MAX_LENGTH)}...`
            : qAndA.question}
        </ReactMarkdown>

        {qAndA.question.length > MAX_LENGTH && (
          <Button
            size="small"
            sx={{ textTransform: "none", mt: 1 }}
            onClick={() => setShowFull((prev) => !prev)}
          >
            {showFull ? "Show less" : "Show more"}
          </Button>
        )}

        <Divider sx={{ my: 2 }} />

        {qAndA.answer ? (
          <Box display="flex" mt={1}>
            <Avatar
              src={"qAndA.instructor.photo"}
              alt={"qAndA.instructor.name"}
              sx={{
                mr: 2,
                border: "2px solid",
                borderColor: "primary.main",
              }}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {"Toan NGuyen"}
              </Typography>
              <ReactMarkdown>{qAndA.answer}</ReactMarkdown>
              <Button
                variant="text"
                size="small"
                sx={{ mt: 1 }}
                onClick={() => {
                  setReply(qAndA.answer || "");
                  setIsReplying(true);
                }}
              >
                Edit
              </Button>
            </Box>
          </Box>
        ) : isReplying ? (
          <Box mt={2}>
            <TextField
              fullWidth
              label="Your Reply"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              multiline
              rows={2}
              sx={{
                mb: 2,
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SendIcon />}
                onClick={handleReplySubmit}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={() => setIsReplying(false)}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        ) : (
          <Button
            variant="contained"
            size="small"
            startIcon={<ReplyIcon />}
            onClick={() => setIsReplying(true)}
            sx={{ mt: 2 }}
          >
            Reply
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default QAItem;
