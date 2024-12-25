import React, { useEffect, useState } from "react";
import { CurriculumMap, ILesson } from "../../../models/Course";
import { Box, Typography, Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import DocumentTab from "./DocumentTab";
import { useThemeContext } from "../../../theme/ThemeContext";
import {
  getLessonInfo,
  updateLesson,
  updateLessonDescription,
} from "../../../services/LessonService";
import UploadVideo from "./videotab/UploadVideo";
import RichTextBox from "../../reused/RichTextBoxComponent";
import AutoCloseAlert from "../../reused/Alert";

interface LessonProps {
  lesson: CurriculumMap;
  reloadData: () => void;
}

const LessonForm: React.FC<LessonProps> = ({ lesson, reloadData }) => {
  const token = localStorage.getItem("token");
  const [dataInfo, setDataInfo] = useState<ILesson>();
  const { t } = useTranslation();
  const { mode } = useThemeContext();
  const [editDescription, setEditDescription] = useState<string>("");
  const textColor = mode === "light" ? "#000000" : "#ffffff";
  const [selectedTab, setSelectedTab] = useState(0);
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [originalTitle, setOriginalTitle] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState<string>("");

  const startEditing = () => {
    setOriginalTitle(title);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setTitle(originalTitle);
    setIsEditing(false);
  };

  const handleChange = (newValue: number) => {
    if (selectedTab === newValue) {
      setSelectedTab(0);
      return;
    }
    setSelectedTab(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (lesson.id) {
        await getLessonInfo(lesson.id)
          .then((data) => {
            if (data.status <= 305) {
              if (data.data) {
                setDataInfo(data.data);
                setTitle(data.data.title);
                setEditDescription(data.data.description);
              } else {
                console.log(data);
              }
            }
          })
          .catch((err) => {});
      }
    };
    fetchData();
  }, [lesson]);

  const styleButton = {
    fontSize: "12px",
    mx: "5px",
    backgroundColor: mode === "dark" ? "white" : "black",
    color: mode === "dark" ? "black" : "white",
    padding: "10px 20px",
    fontWeight: "bold",
    ":hover": {
      backgroundColor: mode === "dark" ? "white" : "black",
    },
  };

  const updateDescription = async () => {
    if (lesson.id) {
      await updateLessonDescription(token, lesson.id, editDescription).then(
        (data) => {
          if (data.status <= 305) {
            if (data.data.succeed) {
              setAlertOpen(true);
              setSelectedTab(0);
              reloadData();
            }
          }
        }
      );
    }
  };

  const handleUpdateTitle = async () => {
    if (!lesson?.id) return;
    try {
      await updateLesson(token, lesson.id, title).then((data) => {
        if (data.status <= 305) {
          setIsEditing(false);
          setAlertOpen(true);
        } else {
          console.log(data);
          if (Array.isArray(data.data.detail)) {
            setErrorAlertOpen(data.data.detail[0].msg);
          } else {
            setErrorAlertOpen(data.data.detail);
          }
        }
      });
    } catch (error) {
      console.log("Error updating section title:", error);
    }
  };

  return (
    <Box flexDirection={"column"} display={"flex"} width={"100%"}>
      <Box
        flexDirection={"row"}
        display={"flex"}
        justifyContent={"space-between"}
        width={"100%"}
        alignItems={"center"}
      >
        <Box
          sx={{ display: "flex", textAlign: "center", alignItems: "center" }}
        >
          <Typography
            ml={0}
            mr={1}
            fontWeight={"bold"}
            color={textColor}
            sx={{
              fontSize: "1rem",
            }}
          >
            {t("Lesson")} {lesson.ordinal_number} :
          </Typography>
          {isEditing ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "1rem",
                  },
                }}
              />
              <Button
                onClick={handleUpdateTitle}
                color="primary"
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  padding: "8px 20px",
                  fontWeight: "bold",
                  backgroundColor: textColor,
                  "&:hover": {
                    backgroundColor: textColor,
                    opacity: 0.8,
                  },
                }}
              >
                {t("save")}
              </Button>

              <Button
                onClick={cancelEditing}
                color="primary"
                variant="outlined"
                sx={{
                  borderRadius: "20px",
                  padding: "8px 20px",
                  marginRight: "10px",
                  fontWeight: "bold",
                  color: textColor,
                  borderColor: textColor,
                }}
              >
                {t("cancel")}
              </Button>
            </Box>
          ) : (
            <Typography
              fontWeight="bold"
              sx={{
                fontSize: "1rem",
                cursor: "pointer",
                ":hover": {
                  textDecoration: "underline",
                },
              }}
              onClick={startEditing}
            >
              {title}
            </Typography>
          )}
        </Box>
        <Box display={"flex"} ml={"auto"}>
          <Button sx={styleButton} onClick={() => handleChange(1)}>
            {t("document")}
          </Button>
          <Button sx={styleButton} onClick={() => handleChange(2)}>
            {t("video")}
          </Button>
          <Button sx={styleButton} onClick={() => handleChange(3)}>
            {t("description")}
          </Button>
        </Box>
      </Box>
      <Box width={"100%"} height={"100%"}>
        {dataInfo && selectedTab === 1 && (
          <Box>
            {dataInfo && (
              <DocumentTab
                id={dataInfo._id}
                documents={dataInfo.documents}
                reloadData={reloadData}
              />
            )}
          </Box>
        )}
        {dataInfo && selectedTab === 2 && (
          <UploadVideo
            video_url={dataInfo.video_url}
            id={lesson.id}
            setSelectedTab={setSelectedTab}
            reloadData={reloadData}
          />
        )}
        {dataInfo && selectedTab === 3 && (
          <Box minHeight={"200px"} width={"100%"}>
            <RichTextBox
              text={editDescription}
              handleTextChange={(newText) => setEditDescription(newText)}
            />
            <Button
              variant="outlined"
              onClick={updateDescription}
              sx={styleButton}
            >
              {t("update_description")}
            </Button>
          </Box>
        )}
        <AutoCloseAlert
          severity="success"
          message="Save change completed."
          open={alertOpen}
          onClose={() => {
            setAlertOpen(false);
          }}
        />
        <AutoCloseAlert
          severity="error"
          message={`${errorAlertOpen}`}
          open={!errorAlertOpen ? false : true}
          onClose={() => setErrorAlertOpen("")}
        />
      </Box>
    </Box>
  );
};

export default LessonForm;
