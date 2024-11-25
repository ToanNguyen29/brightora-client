import React from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
} from "@mui/material";

import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import CheckIcon from "@mui/icons-material/Check";

interface CourseLearnProps {
  learningObjectives: string[];
}

const CourseLearn: React.FC<CourseLearnProps> = ({ learningObjectives }) => {
  const { t } = useTranslation();

  const { mode } = useThemeContext();
  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";
  const headerBackgroundColor = mode === "light" ? "#f0f0f0" : "#333333";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: backgroundColor === "#ffffff" ? "#f5f5f5" : "#121212",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          padding: 2,
          borderRadius: "12px",
          backgroundColor: backgroundColor,
          color: textColor,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 1,
            textAlign: "center",
            backgroundColor: headerBackgroundColor,
            padding: "8px",
            borderRadius: "4px",
          }}
        >
          {t("what_you_will_learn")}
        </Typography>

        <List
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1,
          }}
        >
          {learningObjectives.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: "40px",
                }}
              >
                <CheckIcon sx={{ color: "green" }} />
              </ListItemIcon>
              <Typography variant="subtitle2">{item}</Typography>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default CourseLearn;
