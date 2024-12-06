import React from "react";
import { Typography, Divider, Stack, Chip, Box } from "@mui/material";
import { useThemeContext } from "../../../theme/ThemeContext";

interface CourseDetailsProps {
  students: number;
  lastUpdated: string;
  lang: string[];
  level: string[];
  // sub: string;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({
  students,
  lastUpdated,
  lang,
  level,
  // sub,
}) => {
  const { mode } = useThemeContext();
  const textColor = mode === "light" ? "black" : "white";
  const chipVariant = mode === "light" ? "outlined" : "filled";

  return (
    <Box>
      <Divider sx={{ my: 2, borderColor: textColor }} />
      <Typography fontSize="small" sx={{ mt: 1, color: textColor }}>
        {students.toLocaleString()} students enrolled
      </Typography>
      <Typography fontSize="small" sx={{ mt: 1, color: textColor }}>
        Last Updated: {lastUpdated.slice(0, 10)}
      </Typography>
      <Typography fontSize="small" sx={{ mt: 1, color: textColor }}>
        Language: {lang}
      </Typography>
      <Typography fontSize="small" sx={{ mt: 1, color: textColor }}>
        Level of the course:
      </Typography>
      <Stack direction="row" sx={{ mt: 1, flexWrap: "wrap", gap: 1 }}>
        {level?.map((sub, index) => (
          <Chip
            key={index}
            label={sub}
            variant={chipVariant}
            sx={{
              color: textColor,
              borderColor: textColor,
              backgroundColor:
                mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "inherit",
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default CourseDetails;
