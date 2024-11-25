import React from "react";
import { Typography, Stack, Link } from "@mui/material";
import { useThemeContext } from "../../../theme/ThemeContext";
import { IOwner } from "../../../models/Course";

interface CourseCreatorProps {
  owner: IOwner | undefined;
}

const CourseCreator: React.FC<CourseCreatorProps> = ({ owner }) => {
  const { mode } = useThemeContext();
  const textColor = mode === "light" ? "black" : "white";

  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
      <Typography variant="body2" sx={{ color: textColor }}>
        Created by
      </Typography>
      <Link variant="body2" href={`/user/${owner?._id}`}>
        {`${owner?.first_name} ${owner?.last_name}`}
      </Link>
    </Stack>
  );
};

export default CourseCreator;
