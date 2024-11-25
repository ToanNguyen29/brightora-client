import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { IGetUserInfo } from "../../../models/User";
import { useThemeContext } from "../../../theme/ThemeContext";
import ReactMarkdown from "react-markdown";

interface UserInfoProps {
  userInfo: Partial<IGetUserInfo> | undefined;
}

const UserInfo: React.FC<UserInfoProps> = ({ userInfo }) => {
  const { t } = useTranslation();
  const { mode } = useThemeContext();

  const textColor = mode === "light" ? "#000000" : "#ffffff";
  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        width: "100%",
        mb: 3,
        borderBottom: "1px solid",
      }}
    >
      <Typography
        variant="overline"
        fontWeight={"bold"}
        fontSize={15}
        sx={{ mb: 1, color: textColor }}
      >
        {userInfo?.role || ""}
      </Typography>
      <Typography
        variant="h3"
        fontWeight={"bold"}
        sx={{ mb: 1, color: textColor }}
      >
        {userInfo?.first_name || ""} {userInfo?.last_name || ""}
      </Typography>
      <Typography
        variant="body1"
        fontWeight={"bold"}
        sx={{ mb: 3, color: textColor }}
      >
        {userInfo?.headline || ""}
      </Typography>
      <Box>
        <Typography
          variant="h6"
          fontWeight={"bold"}
          sx={{ mb: 1, color: textColor }}
        >
          {t("about_me")}
        </Typography>
        {/* <Typography
          variant="subtitle1"
          sx={{ mb: 1, color: textColor }}
        ></Typography> */}
        <ReactMarkdown>{userInfo?.description || ""}</ReactMarkdown>
      </Box>
    </Box>
  );
};

export default UserInfo;
