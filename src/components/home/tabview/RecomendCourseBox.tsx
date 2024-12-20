import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useThemeContext } from "../../../theme/ThemeContext";
import { t } from "i18next";
interface RecomendCourseBoxProps {
  tabName: string;
}

const RecomendCourseBox: React.FC<RecomendCourseBoxProps> = ({ tabName }) => {
  const { mode } = useThemeContext();

  return (
    <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
      <Button
        sx={{
          fontSize: "16px",
          backgroundColor: mode === "dark" ? "white" : "black",
          color: mode === "dark" ? "black" : "white",
          padding: "10px 20px",
          fontWeight: "bold",
          ":hover": {
            backgroundColor: mode === "dark" ? "white" : "black",
          },
          margin: 2,
        }}
      >
        {t("explore") + " " + tabName}
      </Button>{" "}
      {/* <CourseGrid courses={fakeData.courses} /> */}
    </Box>
  );
};

export default RecomendCourseBox;
