import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { CurriculumMap, ISection } from "../../../models/Course";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import LessonForm from "./Lession";
import { useThemeContext } from "../../../theme/ThemeContext";
import {
  getSectionInfo,
  updateSection,
  updateSectionLesson,
} from "../../../services/SectionService";
import AddIcon from "@mui/icons-material/Add";
import {
  createNewLesson,
  updateLessonDescription,
} from "../../../services/LessonService";
import ExcerciseForm from "./Exercise";
import { createNewExercise } from "../../../services/ExerciseService";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoCloseAlert from "../../reused/Alert";

type SectionProps = {
  section: CurriculumMap;
  reloadData: () => void;
};

const Section: React.FC<SectionProps> = ({ section, reloadData }) => {
  const token = localStorage.getItem("token");
  const { t } = useTranslation();
  const { mode } = useThemeContext();
  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";
  const [sectionInfo, setSectionInfo] = useState<ISection>();
  const [lessons, setLessons] = useState<CurriculumMap[]>();
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState<string | null>(null);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (section.id) {
          await getSectionInfo(section.id).then((data) => {
            if (data.status <= 305) {
              if (data.data) {
                setSectionInfo(data.data);
                setTitle(data.data.title);
                setLessons(data.data.lessons);
              }
            }
          });
        }
      } catch (error) {
        console.log("Error fetching section info:", error);
      }
    };
    fetchData();
  }, [section]);

  const handleDelete = (id: string) => {
    setLessonToDelete(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!sectionInfo) return;
    if (lessonToDelete) {
      try {
        const updatedData = lessons?.filter(
          (lesson) => lesson.id !== lessonToDelete
        );
        setLessons(updatedData);

        await updateSectionLesson(
          token,
          sectionInfo?._id,
          updatedData || []
        ).then((data) => {
          if (data.status <= 305) {
            setOpenDialog(false);
          } else {
            console.log(data);
            if (Array.isArray(data.data.detail)) {
              setErrorAlertOpen(data.data.detail[0].msg);
            } else {
              setErrorAlertOpen(data.data.detail);
            }
          }
        });
      } catch (err) {
        console.log("Error deleting section", err);
      }
    }
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;
    if (!lessons) return;

    const items = Array.from(lessons);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const updatedItems = items.map((item, index) => ({
      ...item,
      ordinal_number: index + 1,
    }));

    setLessons(updatedItems);
    await updateSectionLesson(token, section.id, updatedItems);
  };

  const styleButton = {
    width: "fit-content",
    m: 2,
    backgroundColor,
    color: textColor,
    "&:hover": {
      backgroundColor,
    },
  };

  const handleUpdateTitle = async () => {
    if (!sectionInfo?._id) return;
    try {
      await updateSection(token, sectionInfo?._id, title).then((data) => {
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

  const handleAddNormal = async () => {
    try {
      await createNewLesson(token).then(async (data) => {
        if (data.status <= 305) {
          if (data.data.lesson_id) {
            const newItem: CurriculumMap = {
              id: data.data.lesson_id,
              ordinal_number: lessons ? lessons.length + 1 : 1,
              type: "lesson",
            };

            if (lessons) {
              const updatedItems = [...lessons, newItem];
              setLessons(updatedItems);
              await updateSectionLesson(token, section.id, updatedItems);
            } else {
              setLessons([newItem]);
              await updateSectionLesson(token, section.id, [newItem]);
            }
          } else {
            console.log(data);
            if (Array.isArray(data.data.detail)) {
              setErrorAlertOpen(data.data.detail[0].msg);
            } else {
              setErrorAlertOpen(data.data.detail);
            }
          }
        }
      });
    } catch (error) {
      console.log("Error add normal lesson: " + error);
    }
  };

  const handleAddExercise = async () => {
    try {
      await createNewExercise(token).then(async (data) => {
        if (data.status <= 305) {
          if (data.data._id) {
            const newItem: CurriculumMap = {
              id: data.data._id,
              ordinal_number: lessons ? lessons.length + 1 : 1,
              type: "excercise",
            };
            if (lessons) {
              const updatedItems = [...lessons, newItem];
              setLessons(updatedItems);
              await updateSectionLesson(token, section.id, updatedItems);
            } else {
              setLessons([newItem]);
              await updateSectionLesson(token, section.id, [newItem]);
            }
          }
        }
      });
    } catch (error) {
      console.log("Error add exercise: " + error);
    }
  };

  return (
    <Box flexDirection={"column"} width={"100%"} height={"100%"}>
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
      <Box sx={{ display: "flex", textAlign: "center", alignItems: "center" }}>
        <Typography
          ml={2}
          mr={2}
          fontWeight={"bold"}
          variant="h6"
          color={textColor}
        >
          {t("Section")} {section.ordinal_number} :
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
                  fontSize: "1.25rem",
                },
              }}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={handleUpdateTitle}
              sx={{
                fontWeight: "bold",
                fontSize: "0.875rem",
              }}
            >
              {t("save")}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={cancelEditing}
              sx={{
                fontWeight: "bold",
                fontSize: "0.875rem",
              }}
            >
              {t("cancel")}
            </Button>
          </Box>
        ) : (
          <Typography
            fontWeight="bold"
            sx={{
              fontSize: "1.25rem",
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

      <Box p={2}>
        {lessons && (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="curriculum">
              {(provided: any) => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    backgroundColor: { backgroundColor },
                  }}
                >
                  {lessons.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided: any) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            padding: "10px",
                            border: "1px solid",
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          {item.type === "lesson" ? (
                            <LessonForm lesson={item} reloadData={reloadData} />
                          ) : (
                            <ExcerciseForm exercise={item} />
                          )}
                          <IconButton
                            sx={{ marginLeft: 2 }}
                            onClick={() => handleDelete(item.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        )}
        <Box>
          <Button
            sx={styleButton}
            startIcon={<AddIcon />}
            onClick={handleAddNormal}
          >
            {t("add_normal_lesson")}
          </Button>
          <Button
            sx={styleButton}
            startIcon={<AddIcon />}
            onClick={handleAddExercise}
          >
            {t("add_exercise")}
          </Button>
        </Box>
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleCancelDelete}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: backgroundColor,
          },
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: textColor,
            fontSize: "1.25rem",
            paddingBottom: "16px",
          }}
        >
          {t("are_you_sure_you_want_to_delete_this_lesson")}
        </DialogTitle>

        <DialogContent
          sx={{
            textAlign: "center",
            padding: "20px",
            color: textColor,
          }}
        >
          <Typography variant="body2" color="textSecondary">
            {t("this_action_cannot_be_undone")}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", paddingBottom: "20px" }}>
          <Button
            onClick={handleCancelDelete}
            color="primary"
            variant="outlined"
            sx={{
              borderRadius: "20px",
              padding: "8px 20px",
              marginRight: "10px",
              fontWeight: "bold",
              borderColor: textColor,
            }}
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={handleConfirmDelete}
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
            {t("confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Section;
