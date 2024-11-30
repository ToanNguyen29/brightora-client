import React from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";

const ChatHeader: React.FC = () => {
  const { mode } = useThemeContext();
  const { t } = useTranslation();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";
  return (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        padding: 3,
        px: "5%",
        backgroundColor: textColor,
        borderBottom: `1px solid ${textColor}`,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: backgroundColor,
        }}
      >
        Message
      </Typography>
      {/* <Typography
        variant="h6"
        sx={
          {
            // fontWeight: "bold",
          }
        }
      >
        You have 0 unread messages.
      </Typography> */}
      {/* Notification Icon and User Info */}
    </Box>
  );
};

export default ChatHeader;
