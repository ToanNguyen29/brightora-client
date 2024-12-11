import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate, useLocation, Outlet, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../theme/ThemeContext";
import { StepSection } from "../components/courseedit/StepSection";
import SendIcon from "@mui/icons-material/Send"; // Example icon
import { IUpdateCourse } from "../models/Course";
import { getCourse, updateCourse } from "../services/CourseService";
import AutoCloseAlert from "../components/reused/Alert";

export default function CourseEditLayout() {
  const token = localStorage.getItem("token");
  const [alertOpen, setAlertOpen] = useState(false);
  const [statusCourse, setStatusCourse] = useState<string>("Draft");
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

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await getCourse(id).then((data) => {
          if (data.status <= 305) {
            setStatusCourse(data.data.status);
          }
        });
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(tabPaths[newValue]);
  };

  const labelBoxStyles = {
    whiteSpace: "nowrap",
    color: textColor,
  };

  const handleSubmitCourse = async () => {
    if (statusCourse !== "Draft") return;
    const formData: IUpdateCourse = {
      status: "Pending",
    };
    if (id) {
      await updateCourse(token, id, formData).then((data) => {
        if (data.data.succeed) {
          setAlertOpen(true);
        }
      });
    }
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
        <AutoCloseAlert
          severity="success"
          message="Submit course for publishing successfully."
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
        />

        <StepSection
          tabs={allTabs}
          value={value}
          handleChange={handleChange}
          labelBoxStyles={labelBoxStyles}
          isStepDone={isStepDone}
        />

        <Button
          onClick={handleSubmitCourse}
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
          startIcon={statusCourse === "Draft" && <SendIcon />}
        >
          {statusCourse === "Draft" ? t("send_for_review") : statusCourse}
        </Button>
      </Box>
      <Box sx={{ p: 3, margin: "10px", borderRadius: "8px", flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
