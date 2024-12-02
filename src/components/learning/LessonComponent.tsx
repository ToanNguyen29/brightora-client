// VideoPlayer.tsx
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
// import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { getLessonInfo } from "../../services/LessonService";
import { ILessonLearn } from "../../models/Course";
import ReactMarkdown from "react-markdown";
import { Box } from "@mui/material";
import { getTranscript } from "../../services/TranscriptService";

const LessonComponent: React.FC = () => {
  const token = localStorage.getItem("token");
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState<ILessonLearn | undefined>();
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [transcript, setTranscript] = useState<string>("");

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
              setVideoUrl(data.data.video_url || "");
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

  useEffect(() => {
    if (!videoUrl) return;
    const fetchTranscript = async () => {
      await getTranscript(token, videoUrl)
        .then((data) => {
          if (data.status <= 305) {
            if (data.data) {
              console.log("getTranscript:", data.data);
              setTranscript(data.data.data.transcript);
            } else {
              console.log(data);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchTranscript();
  }, [videoUrl, token]);

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
                  src: transcript,
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
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            p: "5%",
            top: "0",
            left: "0",
          }}
        >
          <ReactMarkdown>{lesson?.description}</ReactMarkdown>
        </Box>
      )}
    </>
  );
};

export default LessonComponent;
