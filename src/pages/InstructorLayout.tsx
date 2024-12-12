import React, { useEffect } from "react";
import { Box, Tab, Tabs } from "@mui/material";
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
import ReviewsIcon from "@mui/icons-material/Reviews";
import { useAuth } from "../context/AuthContext";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const tabPaths = [
  "/instructor/course",
  "/instructor/question-and-answer",
  "/instructor/course-stats",
  "/instructor/reviews",
];

const InstructorLayout: React.FC = () => {
  const { t } = useTranslation();
  const { mode } = useThemeContext();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  const { userInfo } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const currentPathIndex = tabPaths.indexOf(location.pathname);
  const [value, setValue] = React.useState(
    currentPathIndex !== -1 ? currentPathIndex : 0
  );
  const [isHovered, setIsHovered] = React.useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(tabPaths[newValue]);
  };

  const tabStyles = {
    height: "64px",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    fontSize: 20,
    color: textColor,
  };

  const labelBoxStyles = {
    visibility: isHovered ? "visible" : "hidden",
    whiteSpace: "nowrap",
    color: textColor,
  };

  useEffect(() => {
    if (userInfo.role && userInfo.role !== "Instructor") navigate("/");
  }, [userInfo.role, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        borderColor: mode === "dark" ? "white" : "black",
        backgroundColor: backgroundColor, // Apply background color
      }}
    >
      <Box
        sx={{
          width: isHovered ? "250px" : "80px",
          paddingTop: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "width 0.4s",
          backgroundColor: backgroundColor, // Apply background color
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          sx={{ width: "100%", borderColor: "divider" }}
        >
          <Tab
            icon={<CourseIcon sx={{ fontSize: 40, mr: 2 }} />}
            label={<Box sx={labelBoxStyles}>{t("courses")}</Box>}
            {...a11yProps(0)}
            sx={tabStyles}
          />
          <Tab
            icon={<CommunicationIcon sx={{ fontSize: 40, mr: 2 }} />}
            label={<Box sx={labelBoxStyles}>{t("question_and_answer")}</Box>}
            {...a11yProps(2)}
            sx={tabStyles}
          />
          <Tab
            icon={<PerformanceIcon sx={{ fontSize: 40, mr: 2 }} />}
            label={<Box sx={labelBoxStyles}>{t("course_stats")}</Box>}
            {...a11yProps(3)}
            sx={tabStyles}
          />
          <Tab
            icon={<ReviewsIcon sx={{ fontSize: 40, mr: 2 }} />}
            label={<Box sx={labelBoxStyles}>{t("reviews")}</Box>}
            {...a11yProps(4)}
            sx={tabStyles}
          />
        </Tabs>
      </Box>
      <Box
        sx={{
          p: 3,
          margin: "10px",
          borderRadius: "8px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
export default InstructorLayout;
