import { List, Paper } from "@mui/material";
import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import { useAuth } from "../../context/AuthContext";

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

interface ListMessageProps {
  messages: Message[] | undefined;
  senderInfo: any;
}

const ListMessage: React.FC<ListMessageProps> = ({ messages, senderInfo }) => {
  const { userInfo } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Tham chiếu đến phần tử cuối cùng
  const messageContainerRef = useRef<HTMLDivElement | null>(null); // Tham chiếu đến container của tin nhắn

  useEffect(() => {
    // Đảm bảo container luôn ở vị trí cuối mà không có hiệu ứng cuộn
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]); // Khi messages thay đổi, giữ container ở cuối

  return (
    <Paper sx={{ height: 550, overflow: "auto", p: 2 }}>
      <div
        ref={messageContainerRef}
        style={{ height: "100%", overflowY: "auto" }}
      >
        <List>
          {messages?.map((msg, index) => (
            <MessageItem
              senderInfo={senderInfo}
              key={index}
              message={msg}
              type={msg.sender === userInfo._id ? "sent" : "received"}
            />
          ))}
        </List>

        <div ref={messagesEndRef} />
      </div>
    </Paper>
  );
};

export default ListMessage;
