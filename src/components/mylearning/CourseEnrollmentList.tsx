import React, { useEffect, useState } from "react";

import SearchBar from "../navbar/SearchBar";
import { Box, Grid, Pagination, Typography, Button } from "@mui/material";

import { getEnrollmentMe } from "../../services/Enrollment";
import { ICourseCard } from "../../models/Course";
import MyCourseCard from "./MyCourseCard";
import { useNavigate } from "react-router-dom"; // Thêm hook để điều hướng
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";

const CourseEnrollmentList: React.FC = () => {
  const navigate = useNavigate(); // Hook để điều hướng
  const token = localStorage.getItem("token");
  const [myCourses, setMyCourses] = useState<ICourseCard[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<ICourseCard[]>([]);
  const { mode } = useThemeContext();
  const { t } = useTranslation();
  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(event.target.value);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCourses(myCourses);
    } else {
      const filtered = myCourses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
    setCurrentPage(1);
  }, [searchQuery, myCourses]);

  useEffect(() => {
    if (!token) return;
    const fetchMyLearning = async () => {
      try {
        await getEnrollmentMe(token).then((data) => {
          console.log("Enrollment", data.data);
          if (data.status <= 304) {
            const courses = data.data.map((item) => item.course);
            console.log("Course", courses);
            setMyCourses(courses);
            setFilteredCourses(courses);
          }
        });
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchMyLearning();
  }, [token]);

  return (
    <>
      <Box
        alignItems="center"
        gap={2}
        mb={5}
        sx={{
          width: "200px",
          backgroundColor: "white",
          borderRadius: 1,
          ml: "auto",
          display: "block",
        }}
      >
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
      </Box>
      <Box>
        {filteredCourses.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              marginTop: "50px",
            }}
          >
            <Typography
              variant="body1"
              color={textColor}
              gutterBottom
              sx={{ mb: 3 }}
            >
              You don't have any courses in your list yet. Explore amazing
              courses now!
            </Typography>
            <Button
              variant="outlined"
              // color="primary"
              sx={{
                color: backgroundColor,
                backgroundColor: textColor,
                borderColor: textColor,
                ":hover": {
                  color: textColor,
                  backgroundColor: backgroundColor,
                },
              }}
              onClick={() => navigate("/")} // Điều hướng đến trang chủ
            >
              {t("browse_now")}
            </Button>
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {currentCourses.map((course, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <MyCourseCard course={course} />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "16px",
              }}
            >
              <Pagination
                count={Math.ceil(filteredCourses.length / coursesPerPage)} // Tổng số trang
                page={currentPage} // Trang hiện tại
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default CourseEnrollmentList;
