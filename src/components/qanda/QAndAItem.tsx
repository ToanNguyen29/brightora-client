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
  Paper,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import ReplyIcon from "@mui/icons-material/Reply";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ReactMarkdown from "react-markdown";
import { useThemeContext } from "../../theme/ThemeContext";
import EditIcon from "@mui/icons-material/Edit";
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

interface QAItemProps {
  qAndA: IQAndA;
  onReplySubmit: (questionId: string, reply: string) => void;
}

const QAItem: React.FC<QAItemProps> = ({ qAndA, onReplySubmit }) => {
  const { mode } = useThemeContext();
  const { userInfo } = useAuth();
  const [showFull, setShowFull] = useState(false); // Show more/less state
  const [reply, setReply] = useState<string>(""); // Reply content
  const [isReplying, setIsReplying] = useState(false); // Reply state
  const backgroundColor = mode === "dark" ? "#ffffff" : "#000000";
  const textColor = mode === "dark" ? "#000000" : "#ffffff";

  const MAX_LENGTH = 150;

  const handleReplySubmit = () => {
    onReplySubmit(qAndA._id, reply);
    setReply("");
    setIsReplying(false);
  };
  const buttonstyle = {
    fontSize: "14px",
    height: "40px",
    backgroundColor: backgroundColor,
    color: textColor,
    padding: "10px 20px",
    fontWeight: "bold",
    ":hover": {
      backgroundColor: backgroundColor,
    },
    width: "100px",
  };
  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 3,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
        border: "2px solid", // Solid border
        borderColor: "grey.300", // Border color from the theme
        overflow: "hidden", // Ensures border-radius applies properly
        "&:hover": {
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Elevated shadow on hover
        },
        backgroundColor: "background.paper",
      }}
    >
      <CardContent>
        {/* Student Information */}
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar
            src={qAndA.student.photo}
            alt={qAndA.student.first_name}
            sx={{
              width: 48,
              height: 48,
              border: "4px solid",
              borderColor: "primary.main",
            }}
          />
          <Box ml={2}>
            <Typography variant="h6" fontWeight="bold" color="text.primary">
              {qAndA.student.first_name} {qAndA.student.last_name}
            </Typography>
          </Box>
        </Box>
        {/* Question */}
        <ReactMarkdown>
          {qAndA.question.length > MAX_LENGTH && !showFull
            ? `${qAndA.question.slice(0, MAX_LENGTH)}...`
            : qAndA.question}
        </ReactMarkdown>
        {qAndA.question.length > MAX_LENGTH && (
          <Button
            size="small"
            startIcon={showFull ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            sx={{ textTransform: "none", mt: 1 }}
            onClick={() => setShowFull((prev) => !prev)}
          >
            {showFull ? "Show less" : "Show more"}
          </Button>
        )}
        <Divider sx={{ my: 2 }} />
        {/* Answer Section */}
        {qAndA.answer && !isReplying && (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "grey.300",
              backgroundColor: "grey.100",
            }}
          >
            <Box display="flex" alignItems="center" mb={1}>
              <Avatar
                src={userInfo?.photo}
                alt="Instructor"
                sx={{
                  width: 36,
                  height: 36,
                  mr: 2,
                  border: "2px solid",
                  borderColor: "primary.main",
                }}
              />
              <Typography variant="subtitle1" fontWeight="bold">
                {`${userInfo.first_name} ${userInfo.last_name}`}
              </Typography>
            </Box>
            <ReactMarkdown>{qAndA.answer}</ReactMarkdown>
          </Paper>
        )}
        {/* Reply Section */}
        {isReplying && (
          <>
            {" "}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 2,
                border: "1px solid",
                borderColor: "grey.300",
                backgroundColor: "grey.100",
              }}
            >
              {" "}
              <Box
                display="flex"
                alignItems="center"
                paddingLeft={2}
                paddingTop={2}
              >
                <Avatar
                  src={userInfo?.photo}
                  alt="Instructor"
                  sx={{
                    width: 36,
                    height: 36,
                    mr: 2,
                    border: "2px solid",
                    borderColor: "primary.main",
                  }}
                />
                <Typography variant="subtitle1" fontWeight="bold">
                  {`${userInfo.first_name} ${userInfo.last_name}`}
                </Typography>
              </Box>
              <TextField
                fullWidth
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                multiline
                sx={{
                  "& .MuiOutlinedInput-root": {
                    border: "none", // Remove the border
                    "& fieldset": {
                      border: "none", // Remove the border for the fieldset
                    },
                  },
                  paddingBottom: 2,
                }}
              />
            </Paper>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SendIcon />}
                onClick={handleReplySubmit}
                sx={buttonstyle}
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
          </>
        )}

        {!isReplying && !qAndA.answer && (
          <Button
            variant="contained"
            size="small"
            startIcon={<ReplyIcon />}
            onClick={() => setIsReplying(true)}
            sx={buttonstyle}
          >
            Reply
          </Button>
        )}

        {qAndA.answer && !isReplying && (
          <>
            <Divider sx={{ my: 2 }} />
            <Button
              variant="text"
              size="small"
              sx={buttonstyle}
              startIcon={<EditIcon />}
              onClick={() => {
                setReply(qAndA.answer || "");
                setIsReplying(true);
              }}
            >
              Edit
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default QAItem;
