import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CurriculumMap, ISection } from "../../../models/Course";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import LessonForm from "./Lession";
import { useThemeContext } from "../../../theme/ThemeContext";
import {
   getSectionInfo,
   updateSectionLesson,
} from "../../../services/SectionService";
import AddIcon from "@mui/icons-material/Add";
import {
   createNewLesson,
   updateLessonDescription,
} from "../../../services/LessonService";
import ExcerciseForm from "./Exercise";
import { createNewExercise } from "../../../services/ExerciseService";

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

   useEffect(() => {
      const fetchData = async () => {
         if (section.id) {
            await getSectionInfo(section.id).then((data) => {
               if (data.status <= 305) {
                  if (data.data) {
                     setSectionInfo(data.data);
                     setLessons(data.data.lessons);
                  }
               }
            });
         }
      };
      fetchData();
   }, [section]);

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
                  console.log("neeeeeee", newItem, section, section.id);
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
            // console.log("exxxxx", response);
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
         <Typography ml={2} fontWeight={"bold"} variant="h6" color={textColor}>
            {t("Section")} {section.ordinal_number} : {sectionInfo?.title}
         </Typography>
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
                                          <LessonForm
                                             lesson={item}
                                             reloadData={reloadData}
                                          />
                                       ) : (
                                          <ExcerciseForm exercise={item} />
                                       )}
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
      </Box>
   );
};

export default Section;
