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
  TextField,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { getCoursesMe, updateCourse } from "../../services/CourseService";
import { useNavigate } from "react-router-dom";
import { IUpdateCourse } from "../../models/Course";

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
  discount_percentage: number;
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
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  const handleEdit = (id: string) => {
    console.log(`Edit course with ID: ${id}`);
    navigate(`${id}/manage/goals/`, { replace: true });
  };

  const handleUpdateDiscount = async (id: string) => {
    const formData: IUpdateCourse = {
      discount_percentage: discountPercentage,
    };
    if (id) {
      await updateCourse(token, id, formData).then((data) => {
        console.log("Discount updated:", data);
        setCoursesDraft((prevCourses) =>
          prevCourses.map((course) =>
            course._id === id
              ? { ...course, discount_percentage: discountPercentage }
              : course
          )
        );
        setEditingCourseId(null); // Exit edit mode
      });
    }
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
              <TableCell sx={{ fontWeight: "bold" }}>
                Discount percentage (%)
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coursesDraft.map((course) => (
              <TableRow
                key={course._id}
                sx={{
                  cursor: "pointer",
                }}
              >
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
                  {course.language
                    ? course.language.join(", ")
                    : ["English"].join(", ")}
                </TableCell>
                <TableCell>${course.price.toFixed(2)}</TableCell>
                <TableCell>
                  {editingCourseId === course._id ? (
                    <TextField
                      value={discountPercentage}
                      onChange={(e) =>
                        setDiscountPercentage(Number(e.target.value))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleUpdateDiscount(course._id);
                      }}
                      autoFocus
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                      }}
                      sx={{
                        "& .MuiInputBase-root": {
                          fontSize: "1rem",
                          border: "none",
                          padding: 0,
                        },
                      }}
                    />
                  ) : (
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setEditingCourseId(course._id);
                        setDiscountPercentage(course.discount_percentage);
                      }}
                    >
                      {course.discount_percentage}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="default"
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
