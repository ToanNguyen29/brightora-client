import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  OutlinedInput,
  InputAdornment,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { useThemeContext } from "../../theme/ThemeContext";

interface SidebarProps {
  chats: any[] | undefined;
  handleGetConversation: (id: string, senderInfo: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ chats, handleGetConversation }) => {
  const { t } = useTranslation();
  const { mode } = useThemeContext();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  function formatDate(dateStr: string): string {
    const now = new Date();
    const date = new Date(dateStr);

    const isSameDay = now.toDateString() === date.toDateString();
    const isYesterday =
      new Date(now.setDate(now.getDate() - 1)).toDateString() ===
      date.toDateString();

    const day = date.getDate();
    const month = date.getMonth() + 1; // tháng bắt đầu từ 0
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;

    if (isSameDay) {
      return `${formattedTime}`;
    }

    if (isYesterday) {
      return `${formattedTime} hôm qua`;
    }

    return `${formattedTime} ngày ${day}/${month}/${year}`;
  }

  const { userInfo } = useAuth();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredChats = chats?.filter((chat) => {
    const name =
      chat.recipient_info._id === userInfo._id
        ? `${chat.sender_info.first_name} ${chat.sender_info.last_name}`
        : `${chat.recipient_info.first_name} ${chat.recipient_info.last_name}`;
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    console.log("Filtered chats:", filteredChats);
  }, [filteredChats]);

  return (
    <Box
      sx={{
        width: "25%",
        bgcolor: "#FFFCFF",
        borderRight: "3px solid #ddd",
        overflowY: "scroll",
        height: "100%",
      }}
    >
      <Box sx={{ padding: 2, borderBottom: "1px solid #ddd" }}>
        <OutlinedInput
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "grey.600" }} />
            </InputAdornment>
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: "100%",
            display: "flex",
            borderRadius: "50px",
            backgroundColor: "#eef3f8",
          }}
        />
      </Box>

      <List>
        {filteredChats?.length == 0 ? (
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 5,
              color: textColor,
            }}
          >
            You have no messages.
          </Typography>
        ) : (
          filteredChats?.map((chat, index) => (
            <ListItem
              onClick={() => {
                handleGetConversation(
                  chat.conversation_id,
                  chat.recipient_info._id === userInfo._id
                    ? chat.sender_info
                    : chat.recipient_info
                );
              }}
              key={index}
              sx={{
                cursor: "pointer",
              }}
            >
              <ListItemAvatar>
                <Badge
                  variant="dot"
                  color="success"
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                  <Avatar
                    alt={
                      chat.recipient_info._id === userInfo._id
                        ? chat.sender_info._id
                        : chat.recipient_info._id
                    }
                    src={
                      chat.recipient_info._id === userInfo._id
                        ? chat.sender_info.photo
                        : chat.recipient_info.photo
                    }
                  />
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    component="span"
                    variant="body1"
                    color="textSecondary"
                    fontWeight={"bold"}
                  >
                    {chat.recipient_info._id === userInfo._id
                      ? `${chat.sender_info.first_name} ${chat.sender_info.last_name}`
                      : `${chat.recipient_info.first_name} ${chat.recipient_info.last_name}`}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textSecondary"
                    >
                      {chat.last_message.content}
                    </Typography>
                    <Typography
                      component="span"
                      variant="caption"
                      color="textSecondary"
                      sx={{ float: "right" }}
                    >
                      {formatDate(chat.last_message.timestamp)}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default Sidebar;
