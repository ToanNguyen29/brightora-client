import React, { useState } from "react";
import { Grid, Pagination, Box } from "@mui/material";
import CourseCard from "./CourseCard";
import { ICourseCard } from "../../../models/Course";

interface CourseGridProps {
  courses: ICourseCard[];
  pagination?: boolean;
  coursesPerPageValue?: number;
  isWishListCard?: boolean;
  fetchWishList?: () => Promise<void>;
}

const CourseGrid: React.FC<CourseGridProps> = ({
  courses,
  pagination = true,
  coursesPerPageValue = 8,
  isWishListCard = false,
  fetchWishList,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = coursesPerPageValue;

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Hàm xử lý khi thay đổi trang
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {currentCourses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <CourseCard
              course={course}
              isWishListCard={isWishListCard}
              fetchWishList={fetchWishList}
            />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {pagination && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <Pagination
            count={Math.ceil(courses.length / coursesPerPage)} // Tổng số trang
            page={currentPage} // Trang hiện tại
            onChange={handlePageChange} // Xử lý khi thay đổi trang
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default CourseGrid;
