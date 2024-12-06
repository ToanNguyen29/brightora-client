import React, { useState } from "react";
import {
  Box,
  IconButton,
  Avatar,
  Typography,
  OutlinedInput,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import ListMessage from "./ListMessage";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";

interface Message {
  _id: string;
  content: string;
  conversation_id: string;
  recipient: string;
  sender: string;
  status: string;
  timestamp: string;
  message_type: string;
  time: string;
}

interface ChatBoxProps {
  messages: Message[] | undefined;
  sendMessage: (input: any) => void;
  senderInfo: any;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  messages,
  sendMessage,
  senderInfo,
}) => {
  const { userInfo } = useAuth();
  const { t } = useTranslation();
  const { mode } = useThemeContext();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  const [textMessage, setTextMessage] = useState<string>("");

  const handleSend = () => {
    if (!messages || !textMessage) return;
    const input = {
      content: textMessage,
      recipient:
        userInfo._id === messages[0].sender
          ? messages[0].recipient
          : messages[0].sender,
    };
    console.log("input", input);
    sendMessage(input);
    setTextMessage("");
  };

  return (
    <Box
      sx={{ flex: 1, display: "flex", flexDirection: "column" }}
      bgcolor="#FFFCFF"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 2,
          marginTop: 2,
          marginX: 2,
          paddingBottom: 1,
          borderBottom: "2px solid #ddd",
        }}
      >
        <Avatar
          alt={senderInfo?._id}
          src={senderInfo?.photo || ""}
          sx={{ marginRight: 2, marginLeft: 2 }}
        />
        <Typography variant="body1" sx={{ fontWeight: "bold", marginRight: 1 }}>
          {`${senderInfo?.first_name} ${senderInfo?.last_name}`}
        </Typography>
      </Box>

      <ListMessage messages={messages} senderInfo={senderInfo} />

      <Box
        component="form"
        sx={{
          display: "flex",
          padding: 1,
          alignItems: "center", // Center elements vertically
          borderTop: "1px solid #ddd",
          backgroundColor: "white",
        }}
      >
        <OutlinedInput
          fullWidth
          placeholder="Type a message..."
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Ngăn chặn hành động mặc định của Enter (nếu là form submit)
              handleSend();
            }
          }}
          sx={{
            borderRadius: "100px",
            marginRight: 1,
            marginX: 4,
            backgroundColor: "#FFFCFF",
            maxHeight: 44,
            border: "1px solid #ddd",
          }}
        />
        <IconButton
          color="inherit"
          onClick={handleSend}
          sx={{
            width: 45,
            height: 44,
            marginRight: 3,
            borderRadius: "50%",
            backgroundColor: "blue",
            color: "white", // Set text color to white for the icon
            "&:hover": {
              backgroundColor: "#1e90ff", // Light blue color on hover
            },
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatBox;
