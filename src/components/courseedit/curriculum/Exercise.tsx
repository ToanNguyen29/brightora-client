import React, { useEffect, useState } from "react";
import { CurriculumMap, IExercise } from "../../../models/Course";
import { Box, Typography, Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../theme/ThemeContext";
import RichTextBox from "../../reused/RichTextBoxComponent";
import AutoCloseAlert from "../../reused/Alert";
import {
  getExerciseInfo,
  updateExcerciseDescription,
  updateExercise,
} from "../../../services/ExerciseService";
import QuestionsTab from "./questiontab/QuestionsTab";

interface ExerciseProps {
  exercise: CurriculumMap;
  reloadData: () => void;
}

const ExerciseForm: React.FC<ExerciseProps> = ({ exercise, reloadData }) => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState<IExercise>();
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
      if (exercise.id) {
        await getExerciseInfo(exercise.id).then((data) => {
          console.log("getExerciseInfo", data);
          if (data.status <= 305) {
            setData(data.data);
            setTitle(data.data.title);
            setEditDescription(data.data.description);
          }
        });
      }
    };
    fetchData();
  }, [exercise]);

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
    if (exercise.id) {
      await updateExcerciseDescription(
        token,
        exercise.id,
        editDescription
      ).then((data) => {
        if (data.status <= 305) {
          if (data.data.succeed) {
            setAlertOpen(true);
            reloadData();
          }
        }
      });
    }
  };

  const handleUpdateTitle = async () => {
    if (!exercise.id) return;
    try {
      await updateExercise(token, exercise.id, title).then((data) => {
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
            {t("Lesson")} {exercise.ordinal_number} :
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
            {t("edit_question")}
          </Button>
          <Button sx={styleButton} onClick={() => handleChange(2)}>
            {t("description")}
          </Button>
        </Box>
      </Box>

      <Box width={"100%"} height={"100%"}>
        {selectedTab === 1 && (
          <Box>
            {data && <QuestionsTab id={data._id} questions={data.questions} />}
          </Box>
        )}
        {data && selectedTab === 2 && (
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

export default ExerciseForm;
