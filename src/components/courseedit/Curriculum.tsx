import {
  Box,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"; // Drag handle icon
import { useEffect, useState } from "react";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import Head from "./Head";
import { CurriculumMap } from "../../models/Course";
import {
  getCourseCurriculum,
  updateCurriculumSection,
} from "../../services/CourseService";
import { useParams } from "react-router-dom";
import Section from "./curriculum/Section";
import { createNewSection } from "../../services/SectionService";
import DeleteIcon from "@mui/icons-material/Delete";

const Curriculum: React.FC = () => {
  const token = localStorage.getItem("token");
  const { t } = useTranslation();
  const { mode } = useThemeContext();
  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";
  const sectionColor = mode === "light" ? "#F7F9FA" : "#F7F9FA";
  const [openDialog, setOpenDialog] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<CurriculumMap[]>([]);

  const fetchData = async (id: string | undefined) => {
    if (id) {
      await getCourseCurriculum(id)
        .then((data) => {
          if (data.status <= 305) {
            console.log("cur", data);
            setData(data.data);
          }
        })
        .catch((err) => {
          alert("Error: " + err.detail);
        });
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const updatedItems = items.map((item, index) => ({
      ...item,
      ordinal_number: index + 1,
    }));

    setData(updatedItems);
    console.log(id);
    if (id) await updateCurriculumSection(token, id, updatedItems);
  };

  const styleButton = {
    fontSize: "12px",
    my: 4,
    backgroundColor: mode === "dark" ? "white" : "black",
    color: mode === "dark" ? "black" : "white",
    padding: "10px 20px",
    fontWeight: "bold",
    ":hover": {
      backgroundColor: mode === "dark" ? "white" : "black",
    },
  };

  const handleAddSection = async () => {
    await createNewSection(token)
      .then(async (dataRes) => {
        if (dataRes.status <= 305) {
          console.log("dataRes", dataRes.data);
          if (dataRes.data.section_id) {
            const newSection: CurriculumMap = {
              id: dataRes.data.section_id,
              ordinal_number: data.length + 1,
            };

            const updatedData = [...data, newSection];
            setData(updatedData);

            if (id) await updateCurriculumSection(token, id, updatedData);
          }
        } else {
          console.log("fail");
        }
      })
      .catch((err) => {
        alert("Error: " + err);
        console.log("error", err);
      });
  };

  const handleDelete = (sectionId: string) => {
    console.log("sectionToDelete", sectionId);
    setSectionToDelete(sectionId);
    console.log("sectionToDelete", sectionToDelete);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!id) return;
    if (sectionToDelete) {
      try {
        const updatedData = data.filter(
          (section) => section.id !== sectionToDelete
        );
        setData(updatedData);
        console.log("secton after remove", data, updatedData);
        await updateCurriculumSection(token, id, updatedData).then((data) => {
          console.log("updateCurriculumSection", data);
          setOpenDialog(false);
        });
      } catch (err) {
        alert("Error deleting section");
      }
    }
  };

  const handleCancelDelete = () => {
    setOpenDialog(false); // Close the dialog without deleting
  };

  return (
    <Box
      width={"100%"}
      height={"100%"}
      sx={{
        border: "0.5px groove",
        backgroundColor: backgroundColor,
        color: textColor,
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <Head title={"curriculum"} />
      <Box
        mx={"20px"}
        display={"flex"}
        flexDirection={"column"}
        mt={0}
        maxWidth={"90%"}
        justifyContent="space-between"
      >
        <Typography variant="h6" mt={5} width={"80%"}>
          {t("course.putting_together")}
        </Typography>
      </Box>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="curriculum">
          {(provided: any) => (
            <Box
              {...provided.droppableProps}
              ref={provided.innerRef}
              mt={3}
              display="flex"
              flexDirection="column"
              gap={2}
              bgcolor={sectionColor}
            >
              {data.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided: any) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      sx={{
                        padding: "10px",
                        border: "1px solid",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Section
                        section={item}
                        reloadData={() => fetchData(id)}
                      />
                      <Box>
                        <IconButton
                          {...provided.dragHandleProps}
                          sx={{ marginLeft: 2 }}
                        >
                          <DragIndicatorIcon />
                        </IconButton>
                        <IconButton
                          sx={{ marginLeft: 2 }}
                          onClick={() => handleDelete(item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      <Button sx={styleButton} onClick={handleAddSection}>
        {t("add_section")}
      </Button>

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

export default Curriculum;
