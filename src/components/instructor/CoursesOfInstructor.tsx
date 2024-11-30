import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { getCoursesMe } from "../../services/CourseService";
import { replace, useNavigate } from "react-router-dom";

type Course = {
  _id: string;
  title: string;
  subtitle: string;
  price: number;
  category: string[];
  level: string[];
  language: string[];
  sections: any[];
  thumbnail: string;
  created_at: string;
};

interface CourseOfInstructorProps {
  status?: string;
}

const CourseOfInstructor: React.FC<CourseOfInstructorProps> = ({
  status = "Draft",
}) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [coursesDraft, setCoursesDraft] = useState<Course[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  const handleEdit = (id: string) => {
    console.log(`Edit course with ID: ${id}`);
    navigate(`${id}/manage/goals/`, { replace: true });
  };

  useEffect(() => {
    const fetchCoursesMe = async () => {
      await getCoursesMe(token).then((data) => {
        console.log("Course of instructor:", data);
        if (data.status <= 305) {
          setCoursesDraft(data.data.data);
        }
      });
    };
    fetchCoursesMe();
  }, [token]);

  return (
    <Box sx={{ padding: 0 }}>
      <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, mt: 7 }}>
        {`${status} courses`}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Thumbnail</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Level</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Language</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Price ($)</TableCell>
              {/* <TableCell sx={{ fontWeight: "bold" }}>Sections</TableCell> */}
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coursesDraft.map((course) => (
              <TableRow
                key={course._id}
                onClick={() => handleEdit(course._id)}
                sx={{
                  cursor: "pointer", // Change cursor to pointer
                }}
              >
                {" "}
                <TableCell>
                  <Avatar
                    variant="square"
                    src={course.thumbnail}
                    alt={course.title}
                    sx={{ width: 56, height: 56 }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.subtitle}
                  </Typography>
                </TableCell>
                <TableCell>{course.category.join(", ")}</TableCell>
                <TableCell>{course.level.join(", ")}</TableCell>
                <TableCell>
                  {course?.language
                    ? course?.language.join(", ")
                    : ["English"].join(", ")}
                </TableCell>
                <TableCell>${course.price.toFixed(2)}</TableCell>
                <TableCell>
                  <IconButton
                    color="default" // 'default' for black; 'inherit' to inherit parent color
                    onClick={() => handleEdit(course._id)}
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CourseOfInstructor;
