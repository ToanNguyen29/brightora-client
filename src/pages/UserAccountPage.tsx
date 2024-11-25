import React, { useEffect, useState } from "react";
import { Avatar, Box, Tab, Tabs } from "@mui/material";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../theme/ThemeContext";
import {
   School as CourseIcon,
   Chat as CommunicationIcon,
   Assessment as PerformanceIcon,
   Build as ToolsIcon,
   Description as ResourceIcon,
} from "@mui/icons-material";
import CourseList from "../components/user/user-accout-page/CourseList";
import { User } from "../models/User";
import ButtonLink from "../components/user/user-accout-page/ButtonLink";
import UserInfo from "../components/user/user-accout-page/UserInfo";

function a11yProps(index: number) {
   return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
   };
}

export default function UserAccountPage() {
   const { t } = useTranslation();
   const { mode } = useThemeContext();

   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#ffffff" : "#000000";

   const [user, setUser] = useState<Partial<User>>({
      role: "instructor",
      firstName: "Dr. Angela Yu",
      lastName: "Developer and Lead Instructor",
      headline: "Developer and Lead Instructor",
      description:
         "John Doe is a seasoned programming instructor with over 10 years of experience in software development and teaching. Known for his clear, engaging teaching style, he specializes in web development, data structures, and algorithms, empowering students to build real-world applications. John’s passion lies in simplifying complex topics, and his courses blend theory with hands-on practice to prepare learners for industry challenges. With a background in both academia and the tech industry, he is committed to guiding students from fundamental concepts to advanced coding skills.",
   });
   const [courseOfUser, setCourseOfUser] = useState();
   const [error, setError] = useState<string>("");

   useEffect(() => {}, []);

   return (
      <Box
         sx={{
            display: "flex",
            p: 2,
            px: "20%",
            borderColor: mode === "dark" ? "white" : "black",
            backgroundColor: "transparent",
            maxWidth: "100%",
            height: "100%",
            // mx: "auto",
         }}
      >
         <Box
            sx={{
               p: 3,
               borderColor: mode === "dark" ? "white" : "black",
               backgroundColor: "transparent",
               width: "100%",
            }}
         >
            <UserInfo userInfo={user}></UserInfo>
            <CourseList courseOfUser={{}} />
         </Box>
         <Box
            sx={{
               p: 3,
               borderColor: mode === "dark" ? "white" : "black",
               backgroundColor: "transparent",
               width: "40%",
            }}
         >
            <Avatar
               alt={`${user?.photo}`}
               src={`${user?.photo}`}
               sx={{
                  width: 200,
                  height: 200,
                  fontSize: 30,
                  marginBottom: "5px",
               }}
            />
            <ButtonLink />
         </Box>
      </Box>
   );
}
