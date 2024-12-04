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

  useEffect(() => {
    const fetchData = async () => {
      if (section.id) {
        await getSectionInfo(section.id).then((data) => {
          if (data.status <= 305) {
            if (data.data) {
              setSectionInfo(data.data);
              console.log("Section title", data.data.title);
              setTitle(data.data.title);
              setLessons(data.data.lessons);
            }
          }
        });
      }
    };
    fetchData();
  }, [section]);

  const handleDelete = (id: string) => {
    console.log("setLessonToDelete", id);
    setLessonToDelete(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!sectionInfo) return;
    console.log("sectionInfo", sectionInfo._id);
    if (lessonToDelete) {
      try {
        const updatedData = lessons?.filter(
          (lesson) => lesson.id !== lessonToDelete
        );
        setLessons(updatedData);

        console.log("lesson remove", lessons, updatedData);
        // await updateCurriculumSection(token, id, updatedData).then((data) => {
        //   console.log("updateCurriculumSection", data);
        // });

        await updateSectionLesson(
          token,
          sectionInfo?._id,
          updatedData || []
        ).then((data) => {
          console.log("updateSectionTitle, ", data);
          // if (data.status <= 305) {
          //   setIsEditing(false);
          // }
          setOpenDialog(false);
        });

        setOpenDialog(false);
      } catch (err) {
        alert("Error deleting section");
      }
    }
  };

  const handleCancelDelete = () => {
    setOpenDialog(false); // Close the dialog without deleting
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

  const handleUpdateTitle = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!sectionInfo?._id) return;
    if (e.key === "Enter") {
      await updateSection(token, sectionInfo?._id, title).then((data) => {
        console.log("updateSectionTitle, ", data);
        if (data.status <= 305) {
          setIsEditing(false);
        }
      });
    }
  };

  const handleAddNormal = async () => {
    await createNewLesson(token)
      .then(async (data) => {
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

              console.log(section.id);
              await updateSectionLesson(token, section.id, updatedItems);
            } else {
              console.log(section.id);
              setLessons([newItem]);
              await updateSectionLesson(token, section.id, [newItem]);
            }
          } else {
            console.log(data);
          }
        }
      })
      .catch((err) => {
        alert("Error: " + err.detail);
      });
  };

  const handleAddExcercise = async () => {
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
  };

  return (
    <Box flexDirection={"column"} width={"100%"} height={"100%"}>
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
                fontSize: "1.25rem",
                border: "none",
                padding: 0,
              },
            }}
          />
        ) : (
          <Typography
            fontWeight="bold"
            sx={{
              fontSize: "1.25rem",
              cursor: "pointer",
            }}
            onClick={() => setIsEditing(true)} // Kích hoạt chế độ chỉnh sửa khi click
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
            onClick={handleAddExcercise}
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
          {t("are_you_sure_you_want_to_delete_this_section")}
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
