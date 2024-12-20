import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Sidebar from "../components/chat/Sidebar";
import ChatBox from "../components/chat/ChatBox";
import ChatHeader from "../components/chat/Header";
import { useAuth } from "../context/AuthContext";
import {
  getAllConversations,
  getConversation,
} from "../services/MessageService";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../theme/ThemeContext";

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

const ChatPage: React.FC = () => {
  const { userInfo } = useAuth();
  const token = localStorage.getItem("token");
  const [chats, setChats] = useState();
  const [messages, setMessages] = useState<Message[] | undefined>();
  const [currentConversation, setCurrentConversation] = useState<string>();
  const [senderInfo, setSenderInfo] = useState();

  const { t } = useTranslation();
  const { mode } = useThemeContext();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  const fetchChats = useCallback(async () => {
    try {
      const data = await getAllConversations(token);
      if (data.status <= 305) {
        console.log("All conversations", data.data.conversations);
        setChats(data.data.conversations);
        if (data.data.conversations.length > 0 && !currentConversation) {
          setCurrentConversation(data.data.conversations[0].conversation_id);
          setSenderInfo(
            userInfo._id === data.data.conversations[0].recipient_info._id
              ? data.data.conversations[0].sender_info
              : data.data.conversations[0].recipient_info
          );
        }
      } else {
        console.log(data.data.detail);
      }
    } catch (error) {
      console.log(error);
    }
  }, [token, currentConversation, userInfo._id]);

  const fetchConversation = useCallback(async () => {
    if (!currentConversation) return;
    try {
      const data = await getConversation(token, currentConversation);
      if (data.status <= 305) {
        setMessages(data.data.messages);
      }
    } catch (error) {
      console.error(error);
    }
  }, [token, currentConversation]);

  useEffect(() => {
    if (userInfo._id) {
      const ws = new WebSocket(
        `ws://dev.brightora.online:8080/ws/conversations?user_id=${userInfo._id}`
      );

      ws.onopen = () => {
        console.log("WebSocket connection established.");
      };

      ws.onmessage = (event) => {
        console.log("Message received:", event.data);
        fetchChats();
        fetchConversation();
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed.");
      };
      return () => {
        ws.close();
      };
    }

    // Cleanup on component unmount
  }, [userInfo._id, fetchChats, fetchConversation]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  useEffect(() => {
    fetchConversation();
  }, [fetchConversation]);

  const handleGetConversation = (id: string, senderInfo: any) => {
    setSenderInfo(senderInfo);
    setCurrentConversation(id);
    console.log("idCurrent", id);
    console.log("senderIno", senderInfo);
  };

  const sendMessage = (input: any) => {
    if (input) {
      const ws = new WebSocket(
        `ws://dev.brightora.online:8080/ws/conversations?user_id=${userInfo._id}`
      );
      ws.onopen = () => {
        ws.send(JSON.stringify(input));
        console.log("Message sent:", input);
        fetchConversation();
        fetchChats();
      };
      ws.onclose = () => {
        ws.close();
      };
    }
  };

  return (
    <Box sx={{ height: "100%", display: "flex" }}>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ChatHeader />
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <Sidebar
            chats={chats}
            handleGetConversation={handleGetConversation}
          />
          {currentConversation ? (
            <ChatBox
              messages={messages}
              sendMessage={sendMessage}
              senderInfo={senderInfo}
            />
          ) : (
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                mt: 10,
                textAlign: "center",
                mx: "auto",
                color: textColor,
              }}
            >
              Select a message thread to read it here.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
