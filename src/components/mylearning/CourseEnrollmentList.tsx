import React, { useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import SearchBar from "../navbar/SearchBar";
import { Box, Grid, Pagination } from "@mui/material";

import { getEnrollmentMe } from "../../services/Enrollment";
import { ICourseCard } from "../../models/Course";
// import CourseGrid from "../home/tabview/CourseGrid";
import MyCourseCard from "./MyCourseCard";

const CourseEnrollmentList: React.FC = () => {
  const token = localStorage.getItem("token");
  const [myCourses, setMyCourses] = useState<ICourseCard[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = myCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Hàm xử lý khi thay đổi trang
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(event.target.value);

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
      <Box display="flex" alignItems="center" gap={2} mb={5}>
        <Box flex={7}>
          <FilterBar flex={7} />
        </Box>

        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
      </Box>
      <Box>
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
            count={Math.ceil(myCourses.length / coursesPerPage)} // Tổng số trang
            page={currentPage} // Trang hiện tại
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </>
  );
};

export default CourseEnrollmentList;
