import { Box, Grid, Typography, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../theme/ThemeContext";
import CourseCardMyCourse from "./CourseCardMyCourse";
import { getCoursesByOwner } from "../../../services/CourseService";

interface CourseListProps {
  id: string | undefined;
}

const CourseList: React.FC<CourseListProps> = ({ id }) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalCourse, setTotalCourse] = useState(0); // Tổng số khóa học
  const [courses, setCourses] = useState([]);
  const pageSize = 6;

  const { t } = useTranslation();
  const { mode } = useThemeContext();
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  useEffect(() => {
    if (!id) return;
    const fetchInstructorInfo = async () => {
      await getCoursesByOwner(id, pageNumber, pageSize)
        .then((data) => {
          if (data.status <= 305) {
            console.log("pagination", data.data);
            setCourses(data.data.data);
            setTotalCourse(data.data.total_items);
          } else {
            console.log("else");
          }
        })
        .catch((err) => {
          alert("Error: " + err.detail);
        });
    };
    fetchInstructorInfo();
  }, [id, pageNumber]);

  const totalPages = Math.ceil(totalCourse / pageSize); // Tổng số trang

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageNumber(value); // Cập nhật số trang hiện tại
  };

  // Xử lý khi thay đổi số lượng khóa học mỗi trang

  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight={"bold"}
        sx={{ mb: 2, color: textColor }}
      >
        {t("my_courses")} ({totalCourse})
      </Typography>

      {/* Đặt chiều cao tối thiểu cho Grid để giữ vị trí của thanh pagination */}
      <Grid
        container
        spacing={3}
        sx={{
          minHeight: `calc(${Math.ceil(pageSize / 3)} * 150px)`, // Ước chừng chiều cao danh sách
        }}
      >
        {courses.map((course, index) => (
          <Grid item xs={12} sm={4} md={4} lg={4} key={index} padding={2}>
            <CourseCardMyCourse course={course} />
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 3,
        }}
      >
        <Pagination
          count={totalPages}
          page={pageNumber}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default CourseList;
