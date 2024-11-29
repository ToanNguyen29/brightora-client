import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  Typography,
  Button,
  Menu,
  MenuItem,
  CircularProgress,
  ListItemIcon,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { IDocument, IExerciseLearn, ILessonLearn } from "../../models/Course";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { getLessonInfo } from "../../services/LessonService";

import ArticleIcon from "@mui/icons-material/Article";

// Props cho component
interface ListItemLessonProps {
  lesson: ILessonLearn | IExerciseLearn;
  selectedLesson: string | null;
  onSelectLesson: (
    e: React.SyntheticEvent,
    lessonId: string,
    lessonType: string
  ) => void;
}

const ListItemLesson: React.FC<ListItemLessonProps> = ({
  lesson,
  selectedLesson,
  onSelectLesson,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [documents, setDocuments] = useState<IDocument[]>([]);

  const { mode } = useThemeContext();
  const { t } = useTranslation();
  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffff";

  const handleOpenResources = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!lesson._id) return;
    setAnchorEl(event.currentTarget);
    setLoadingDocs(true);
    console.log("get documents");

    try {
      await getLessonInfo(lesson._id).then((data) => {
        console.log("getLessonInfoDoc", data);
        if (data.status <= 305) {
          setDocuments(data.data.documents);
        } else setDocuments([]);
      });
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    }
    setLoadingDocs(false);
  };

  const handleCloseResources = () => {
    setAnchorEl(null);
    setDocuments([]);
  };

  return (
    <>
      <ListItem
        sx={{
          backgroundColor:
            selectedLesson === lesson.id
              ? "rgba(0, 0, 0, 0.08)"
              : "transparent",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.08)",
            cursor: "pointer",
          },
          "&:active": {
            backgroundColor: "rgba(0, 0, 0, 0.16)",
          },
          mb: 0.5,
          ml: 1,
          mr: 1,
          p: 1.5,
        }}
        onClick={(e) => onSelectLesson(e, lesson.id, lesson.type)}
      >
        <ListItemText
          primary={
            <Typography>
              {lesson.type === "lesson"
                ? `${(lesson as ILessonLearn).ordinal_number}. ${lesson.title}`
                : `Exercise. ${lesson.title}`}
            </Typography>
          }
        />

        {lesson.type === "lesson" && (
          <Button
            sx={{
              color: textColor,
              border: `1px solid ${textColor}`,
              fontSize: "0.7rem",
              minWidth: "auto",
            }}
            variant="outlined"
            size="small"
            onClick={handleOpenResources}
            endIcon={<ExpandMore />}
          >
            {t("resources")}
          </Button>
        )}
      </ListItem>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseResources}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center", // Centered horizontally relative to the button
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ width: 250 }} // Adjust width as needed
      >
        {loadingDocs ? (
          <MenuItem
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size={20} />
          </MenuItem>
        ) : documents.length > 0 ? (
          documents.map((doc) => (
            <MenuItem
              key={doc.file_url}
              onClick={() => window.open(doc.file_url, "_blank")}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
              }}
            >
              <ListItemIcon>
                <ArticleIcon fontSize="small" />
              </ListItemIcon>
              <Typography
                variant="body2"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {doc.title}
              </Typography>
            </MenuItem>
          ))
        ) : (
          <MenuItem
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "8px 16px",
              color: "text.secondary",
            }}
          >
            {t("no_resources_available")}
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default ListItemLesson;
