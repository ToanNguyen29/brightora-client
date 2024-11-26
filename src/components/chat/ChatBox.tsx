import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Avatar,
  Typography,
  OutlinedInput,
  Paper,
  List,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MessageItem from "./MessageItem";
import { getConversation } from "../../services/MessageService";
import ListMessage from "./ListMessage";

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
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, sendMessage }) => {
  const token = localStorage.getItem("token");
  // const [messages, setMessages] = useState<Message[] | undefined>();

  const [textMessage, setTextMessage] = useState<string>("");

  // const fetchConversation = useCallback(async () => {
  //   if (!currentConversation) return;
  //   try {
  //     const data = await getConversation(token, currentConversation);
  //     if (data.status <= 305) {
  //       console.log("oooooooooooo:", data.data.messages);
  //       setMessages(data.data.messages);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [token, currentConversation]);

  // useEffect(() => {
  //   fetchConversation();
  // }, [fetchConversation]);

  const handleSend = () => {
    console.log(textMessage);
    if (!messages || !textMessage) return;
    const input = {
      content: textMessage,
      recipient: messages[0].sender,
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
          alt="User Avatar"
          src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/393267985_1049519332854327_845050284432035188_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEhlx38jkVKbJgfeUeKn2e0v2o89jzcEBW_ajz2PNwQFYDQkGZgCDrEXGEPAyYHjXnFrqmvBnqrG9JvpOYu6pZU&_nc_ohc=TW-Oy2INWKYQ7kNvgF3N06W&_nc_zt=23&_nc_ht=scontent.fsgn5-12.fna&_nc_gid=ABR63vL8GnPOvMWSfUZj-lr&oh=00_AYBq0wPJTCyHQwXVmIlbI0--YLsxyamAZ_SXfher8GAcRA&oe=673D775A"
          sx={{ marginRight: 2, marginLeft: 2 }}
        />
        <Typography variant="body1" sx={{ fontWeight: "bold", marginRight: 1 }}>
          Minh Phương
        </Typography>
      </Box>

      <ListMessage messages={messages} />

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
          sx={{
            borderRadius: "100px", // Rounded corners for the TextField
            marginRight: 1, // Space between TextField and IconButton
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
