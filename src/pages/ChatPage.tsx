import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/chat/Sidebar";
import ChatBox from "../components/chat/ChatBox";
// import Header from "../components/chat/Header";
// import VerticalSidebar from "../components/chat/VerticalSidebar";
import ChatHeader from "../components/chat/Header";
import { useAuth } from "../context/AuthContext";
import {
  getAllConversations,
  getConversation,
} from "../services/MessageService";
// import { getConversation } from "../services/MessageService";

// please note that the types are reversed

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

  const fetchChats = useCallback(async () => {
    try {
      const data = await getAllConversations(token);
      if (data.status <= 305) {
        console.log("All conversations", data.data.conversations);
        setChats(data.data.conversations);
        if (data.data.conversations.length > 0 && !currentConversation) {
          setCurrentConversation(data.data.conversations[0].conversation_id);
        }
      } else {
        console.log(data.data.detail);
      }
    } catch (error) {
      console.log(error);
    }
  }, [token, currentConversation]);

  const fetchConversation = useCallback(async () => {
    if (!currentConversation) return;
    try {
      const data = await getConversation(token, currentConversation);
      if (data.status <= 305) {
        console.log("oooooooooooo:", data.data.messages);
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

  const handleGetConversation = (id: string) => {
    setCurrentConversation(id);
    console.log("idCurrent", id);
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
          <ChatBox messages={messages} sendMessage={sendMessage} />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
