import { Box, Typography, IconButton, Button } from "@mui/material";
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

const Curriculum: React.FC = () => {
  const token = localStorage.getItem("token");
  const { t } = useTranslation();
  const { mode } = useThemeContext();
  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";
  const sectionColor = mode === "light" ? "#F7F9FA" : "#F7F9FA";

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
        // console.log("alooooo", data);
        if (dataRes.status <= 305) {
          console.log("dataRes", dataRes.data);
          if (dataRes.data.section_id) {
            const newSection: CurriculumMap = {
              id: dataRes.data.section_id,
              ordinal_number: data.length + 1,
            };
            console.log("newsection", newSection);
            const updatedData = [...data, newSection];
            setData(updatedData);
            console.log("updateData", updatedData);
            console.log("id:", id);
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
        mt={5}
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
                      <IconButton
                        {...provided.dragHandleProps}
                        sx={{ marginLeft: 2 }}
                      >
                        <DragIndicatorIcon />
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
      <Button sx={styleButton} onClick={handleAddSection}>
        {t("Add_section")}
      </Button>
    </Box>
  );
};

export default Curriculum;
