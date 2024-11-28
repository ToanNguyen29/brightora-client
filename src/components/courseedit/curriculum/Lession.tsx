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
  // const [reload, setReload] = useState<boolean>(false);
  const { t } = useTranslation();
  const { mode } = useThemeContext();
  const [editDescription, setEditDescription] = useState<string>("");
  const textColor = mode === "light" ? "#000000" : "#ffffff";
  const [selectedTab, setSelectedTab] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);
  const [title, setTitle] = useState("Toan Nguyen");
  const [isEditing, setIsEditing] = useState(false);

  const handleCloseAlert = () => {
    setAlertOpen(false);
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
              // console.log("Le  Tan Loc", data.data);
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
    console.log("description", lesson.id);
    if (lesson.id) {
      // const newData = {...dataInfo, }
      await updateLessonDescription(token, lesson.id, editDescription).then(
        (data) => {
          if (data.status <= 305) {
            console.log("description", data.data);
            if (data.data.succeed) {
              setAlertOpen(true);
            }
            reloadData();
          }
        }
      );
    }
  };

  const handleUpdateTitle = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    console.log("Lessssssssssss", lesson.id);
    if (!lesson?.id) return;
    if (e.key === "Enter") {
      console.log(lesson.id);
      await updateLesson(token, lesson.id, title).then((data) => {
        console.log("updateSectionTitle, ", data);
        if (data.status <= 305) {
          setIsEditing(false);
        }
      });
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
            variant="body1"
            color={textColor}
          >
            {t("Lesson")} {lesson.ordinal_number} :
          </Typography>
          {isEditing ? (
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleUpdateTitle}
              autoFocus
              variant="standard"
              InputProps={{
                disableUnderline: true,
                sx: {
                  fontWeight: "bold",
                },
              }}
              sx={{
                "& .MuiInputBase-root": {
                  fontSize: "1rem",
                  border: "none",
                  padding: 0,
                },
              }}
            />
          ) : (
            <Typography
              fontWeight="bold"
              sx={{
                fontSize: "1rem",
                cursor: "pointer",
              }}
              onClick={() => setIsEditing(true)} // Kích hoạt chế độ chỉnh sửa khi click
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
          message="Update description completed."
          open={alertOpen}
          onClose={handleCloseAlert}
        />{" "}
      </Box>
    </Box>
  );
};

export default LessonForm;
