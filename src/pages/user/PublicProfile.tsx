import React from "react";
import { Box } from "@mui/material";
import UserInfo from "../../components/user/user-accout-page/UserInfo";
import CourseList from "../../components/user/user-accout-page/CourseList";
import { useThemeContext } from "../../theme/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const PublicProfilePage: React.FC = () => {
  const { userInfo } = useAuth();
  const { mode } = useThemeContext();
  return (
    <Box
      sx={{
        p: 3,
        borderColor: mode === "dark" ? "white" : "black",
        backgroundColor: "transparent",
        width: "100%",
      }}
    >
      <UserInfo userInfo={userInfo}></UserInfo>
      <CourseList id={userInfo._id} />
    </Box>
  );
};

export default PublicProfilePage;
