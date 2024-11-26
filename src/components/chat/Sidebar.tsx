import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  // Badge,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  chats: any[] | undefined;
  handleGetConversation: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ chats, handleGetConversation }) => {
  // const token = localStorage.getItem("token");
  // const [chats, setChats] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    console.log("alllChat", chats);
  }, [chats]);

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
      return `${formattedTime}`; // Chỉ hiển thị giờ nếu là hôm nay
    }

    if (isYesterday) {
      return `${formattedTime} hôm qua`; // Hiển thị giờ và "hôm qua" nếu là ngày hôm qua
    }

    // Định dạng ngày tháng năm nếu là ngày khác
    return `${formattedTime} ngày ${day}/${month}/${year}`;
  }

  // useEffect(() => {
  //   const fetchChats = async () => {
  //     try {
  //       await getAllConversations(token).then((data) => {
  //         if (data.status <= 305) {
  //           setChats(data.data.conversations);
  //           // handleGetConversation(data.data.conversations[0].conversation_id);
  //         } else {
  //           console.log(data.data.detail);
  //         }
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchChats();
  // }, [token]);

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
      {/* Online Now Section */}
      <Box sx={{ padding: 2, borderBottom: "1px solid #ddd" }}>
        <OutlinedInput
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "grey.600" }} />
            </InputAdornment>
          }
          sx={{
            width: "100%",
            display: "flex",
            borderRadius: "50px",
            backgroundColor: "#eef3f8",
          }}
        />
      </Box>

      {/* Contacts List */}
      <List>
        {chats?.map((chat, index) => (
          <ListItem
            onClick={() => {
              handleGetConversation(chat.conversation_id);
            }}
            button
            key={index}
            sx={{
              cursor: "pointer",
            }}
          >
            <ListItemAvatar>
              {/* <Badge
                variant="dot"
                color="success"
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                invisible={!user.active}
              > */}
              {/* <Avatar sx={{}} alt={user.name} src={user.avatar}>
                {user.avatar}
              </Avatar> */}
              {/* </Badge> */}
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  component="span"
                  variant="body1"
                  color="textSecondary"
                  fontWeight={"bold"}
                >
                  {/* {chat.name} */}
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
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
