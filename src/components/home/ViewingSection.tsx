import React from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CourseGrid from "./tabview/CourseGrid";
import fakeData from "./tabview/fakeData.json";
import { useThemeContext } from "../../theme/ThemeContext";
const ViewingSection: React.FC = () => {
  const { mode } = useThemeContext();

  const { t } = useTranslation();
  const textColor = mode === "light" ? "black" : "white";

  return (
    <>
      <Box sx={{ mx: "10%", my: "30px" }}>
        <Typography
          variant="h4"
          sx={{
            color: textColor,
            fontFamily: "math",
            fontWeight: "bold",
            mb: "10px",
          }}
        >
          {t("learners_viewing")}
        </Typography>
        {/* <CourseGrid courses={fakeData.courses} /> */}
      </Box>
    </>
  );
};

export default ViewingSection;
