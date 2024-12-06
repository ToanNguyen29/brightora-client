import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Typography,
  Link,
} from "@mui/material";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

import QuizIcon from "@mui/icons-material/Quiz";
import { IExerciseLearn, ILessonLearn } from "../../../models/Course";

interface ContentItemProps {
  lesson: ILessonLearn | IExerciseLearn;
  textColor: string;
  canReview: boolean;
  durationVideo: number;
}

const ContentItem: React.FC<ContentItemProps> = ({
  lesson,
  textColor,
  canReview,
  durationVideo,
}) => {
  console.log("lessonlessonlessonlesson", lesson);
  return (
    <ListItem sx={{ justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <ListItemIcon>
          {lesson.type === "lesson" ? (
            <VideoLibraryIcon sx={{ color: textColor }} />
          ) : (
            <QuizIcon sx={{ color: textColor }} />
          )}
        </ListItemIcon>
        <ListItemText
          primary={
            canReview && lesson.type === "lesson" ? (
              <Link
                variant="body1"
                href={`${(lesson as ILessonLearn).video_url}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: textColor,
                  textDecoration: "underline",
                  "&:hover": { textDecoration: "none" },
                }}
              >
                {`${lesson.title}`}
              </Link>
            ) : (
              `${lesson.title}`
            )
          }
          primaryTypographyProps={{ color: textColor }}
        />
      </Box>
      <Typography
        variant="body2"
        sx={{ color: textColor, minWidth: "50px", textAlign: "right" }}
      >
        {/* {`${String(Math.floor(durationVideo)).padStart(2, "0")}:${String(
          Math.round((durationVideo % 1) * 60)
        ).padStart(2, "0")}`} */}
        {lesson.type === "lesson"
          ? `${(lesson as ILessonLearn).documents?.length || 0} resources`
          : `${(lesson as IExerciseLearn).questions?.length || 0} questions`}
      </Typography>
    </ListItem>
  );
};

export default ContentItem;
