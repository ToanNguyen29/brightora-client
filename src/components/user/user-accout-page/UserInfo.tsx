import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { User } from "../../../models/User";
import { useThemeContext } from "../../../theme/ThemeContext";

interface UserInfoProps {
   userInfo: Partial<User>;
}

const UserInfo: React.FC<UserInfoProps> = ({ userInfo }) => {
   const { t } = useTranslation();
   const { mode } = useThemeContext();

   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
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
            {userInfo.role}
         </Typography>
         <Typography
            variant="h3"
            fontWeight={"bold"}
            sx={{ mb: 1, color: textColor }}
         >
            {userInfo.firstName} {userInfo.lastName}
         </Typography>
         <Typography
            variant="body1"
            fontWeight={"bold"}
            sx={{ mb: 3, color: textColor }}
         >
            {userInfo.headline}
         </Typography>
         <Box>
            <Typography
               variant="h6"
               fontWeight={"bold"}
               sx={{ mb: 1, color: textColor }}
            >
               {t("about_me")}
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 1, color: textColor }}>
               {userInfo.description}
            </Typography>
         </Box>
      </Box>
   );
};

export default UserInfo;
