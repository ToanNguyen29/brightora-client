import React, { useEffect, useState } from "react";
import { CurriculumMap, ILesson } from "../../../models/Course";
import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import DocumentTab from "./DocumentTab";
import { useThemeContext } from "../../../theme/ThemeContext";
import {
   getLessonInfo,
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
            },
         );
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
            <Typography color={textColor} fontWeight={"bold"}>
               {t("lesson")} {lesson.ordinal_number} : {dataInfo?.title}
            </Typography>
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
                     {t("updateDescription")}
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
