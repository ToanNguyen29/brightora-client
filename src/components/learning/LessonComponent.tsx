// VideoPlayer.tsx
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { getLessonInfo } from "../../services/LessonService";
import { ILessonLearn } from "../../models/Course";

const LessonComponent: React.FC = () => {
  const { mode } = useThemeContext();
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  const { lessonId } = useParams();
  const [lesson, setLesson] = useState<ILessonLearn | undefined>();
  useEffect(() => {
    // fetch lesson
    console.log("fetch lesson", lessonId);
    if (!lessonId) return;
    const fetchLesson = async () => {
      await getLessonInfo(lessonId)
        .then((data) => {
          if (data.status <= 305) {
            if (data.data) {
              console.log("lesson:", data.data);
              setLesson(data.data);
            } else {
              console.log(data);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchLesson();
  }, [lessonId]);
  return (
    <>
      {lesson?.video_url ? (
        <ReactPlayer
          url={lesson.video_url}
          controls
          width="100%"
          height="100%"
          config={{
            file: {
              attributes: {
                crossOrigin: "anonymous",
              },
              tracks: [
                {
                  kind: "subtitles",
                  src: "https://brightora.s3.amazonaws.com/transcript/1732337165.vtt", // Ensure this URL is correct
                  srcLang: "en",
                  default: true,
                  label: "English",
                },
              ],
            },
          }}
          style={{
            position: "absolute",
            top: "0",
            left: "0",
          }}
        />
      ) : (
        <Typography
          variant="h6"
          // color="white"
          sx={{
            color: textColor,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          No video
        </Typography>
      )}
    </>
  );
};

export default LessonComponent;
