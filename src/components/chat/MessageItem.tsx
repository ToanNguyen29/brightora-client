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
}

const MessageItem: React.FC<MessageItemProps> = ({ message, type }) => {
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
          alt={"User"}
          src={
            "https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.6435-9/117849236_934407933738647_5796720846220170933_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGBbJnVHqC0fqDSvJvxPd6VVnI9OGD2Na1Wcj04YPY1rU_MAC8D_gA827hxjuBOLh7botpAyI2RF9axBqjxV1du&_nc_ohc=WqohnR83uhMQ7kNvgFVU6b6&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=ABGQrOO65-M69BEIiA2MEWK&oh=00_AYBUBvKc1X6ZItqt9Cn5c7B7a_W3EH1C--2pF_FRWSOA5A&oe=676CD742"
          } // Replace with actual image paths
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
