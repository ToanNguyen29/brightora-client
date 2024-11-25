import React from "react";
import { Typography, Stack } from "@mui/material";
import { useThemeContext } from "../../../theme/ThemeContext";

interface CourseCreatorProps {
   created: string;
}

const CourseCreator: React.FC<CourseCreatorProps> = ({ created }) => {
   const { mode } = useThemeContext();
   const textColor = mode === "light" ? "black" : "white";

   return (
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
         <Typography variant="h6" sx={{ color: textColor }}>
            Created by {created}
         </Typography>
      </Stack>
   );
};

export default CourseCreator;
