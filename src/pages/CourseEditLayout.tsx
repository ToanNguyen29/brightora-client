import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate, useLocation, Outlet, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../theme/ThemeContext";
import { StepSection } from "../components/courseedit/StepSection";
import SendIcon from "@mui/icons-material/Send"; // Example icon

export default function CourseEditLayout() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { mode } = useThemeContext();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  const commonPart = `/instructor/course/${id}/manage/`;

  const tabPaths = [
    `${commonPart}goals/`,
    `${commonPart}curriculum/`,
    `${commonPart}basics/`,
    `${commonPart}pricing/`,
    `${commonPart}communications/messages/`,
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const currentPathIndex = tabPaths.indexOf(location.pathname);
  const isStepDone = (path: string) => tabPaths.indexOf(path) < 6;
  const [value, setValue] = React.useState(
    currentPathIndex !== -1 ? currentPathIndex : 0
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(tabPaths[newValue]);
  };

  const labelBoxStyles = {
    whiteSpace: "nowrap",
    color: textColor,
  };

  // Combine all steps into a single array of tabs
  const allTabs = [
    { path: tabPaths[0], label: t("intended_learners") },
    { path: tabPaths[1], label: t("curriculum") },
    { path: tabPaths[2], label: t("course_landing_page") },
    { path: tabPaths[3], label: t("pricing") },
    { path: tabPaths[4], label: t("course_messages") },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        borderColor: mode === "dark" ? "white" : "black",
        bgcolor: { backgroundColor },
        minHeight: "100vh",
        px: "5%",
      }}
    >
      <Box
        sx={{
          paddingTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor,
          mt: 3,
        }}
      >
        <StepSection
          tabs={allTabs}
          value={value}
          handleChange={handleChange}
          labelBoxStyles={labelBoxStyles}
          isStepDone={isStepDone}
        />
        <Button
          sx={{
            fontSize: "16px",
            my: "45px",
            backgroundColor: mode === "dark" ? "white" : "grey",
            color: mode === "dark" ? "grey" : "white",
            padding: "10px 20px",
            fontWeight: "bold",
            ":hover": {
              backgroundColor: mode === "dark" ? "white" : "grey",
            },
          }}
          startIcon={<SendIcon />}
        >
          Send for Review
        </Button>
      </Box>
      <Box sx={{ p: 3, margin: "10px", borderRadius: "8px", flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
