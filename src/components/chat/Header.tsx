import React from "react";
import { Box, Typography } from "@mui/material";

const ChatHeader: React.FC = () => {
  return (
    <Box
      sx={{
        // display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 3,
        px: "5%",
        backgroundColor: "#f4f5f7",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
        }}
      >
        Message
      </Typography>
      <Typography
        variant="h6"
        sx={
          {
            // fontWeight: "bold",
          }
        }
      >
        You have 0 unread messages.
      </Typography>
      {/* Notification Icon and User Info */}
    </Box>
  );
};

export default ChatHeader;
