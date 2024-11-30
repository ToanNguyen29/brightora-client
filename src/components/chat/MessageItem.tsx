import React from "react";
import { Box, Typography, Paper, Avatar } from "@mui/material";

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

interface MessageItemProps {
  message: Message;
  type: "sent" | "received";
  senderInfo: any;
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  type,
  senderInfo,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: type === "sent" ? "row-reverse" : "row",
        alignItems: "flex-start",
        marginBottom: 2,
      }}
    >
      {type === "received" && (
        <Avatar
          sx={{
            width: 32,
            height: 32,
            marginLeft: 0,
            marginRight: 2,
          }}
          alt={senderInfo._id}
          src={senderInfo?.photo} // Replace with actual image paths
        />
      )}
      {/* Message Content */}
      <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
        <Paper
          elevation={1}
          sx={{
            padding: 1,
            maxWidth: "100%",
            borderBottom: "1px solid #ddd",
            alignSelf: type === "sent" ? "flex-end" : "flex-start",
          }}
        >
          <Typography>{message.content}</Typography>
        </Paper>
        <Typography
          variant="caption"
          sx={{ alignSelf: type === "sent" ? "flex-end" : "flex-start" }}
        >
          {message.time}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageItem;
