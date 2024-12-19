import React from "react";
import { Box } from "@mui/material";
import { useThemeContext } from "../theme/ThemeContext";
import ImageSlider from "../components/home/ImageSlider";
import CourseSection from "../components/home/CourseSection";
import GoalSection from "../components/home/GoalSection";
import ViewingSection from "../components/home/ViewingSection";
import TopCategories from "../components/home/TopCategories";

const images = ["/home-1.jpg", "/home-2.jpg"];

const Home: React.FC = () => {
  const { mode } = useThemeContext();
  const textColor = mode === "light" ? "black" : "white";

  return (
    <Box
      sx={{
        bgcolor: textColor === "white" ? "black" : "white",
        color: textColor,
        mb: 5,
        // minHeight: "90vh",
      }}
    >
      <ImageSlider images={images} />
      <CourseSection />
      <GoalSection />
      {/* <ViewingSection /> */}
      <TopCategories />
    </Box>
  );
};

export default Home;
