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
  IconButton,
  TextField,
  CardMedia,
  Button,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import {
  getCoursesOfInstructor,
  updateCourse,
} from "../../services/CourseService";
import { useNavigate } from "react-router-dom";
import { IUpdateCourse } from "../../models/Course";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";

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
  query?: string;
}

const CourseOfInstructor: React.FC<CourseOfInstructorProps> = ({
  status,
  query = "",
}) => {
  const { t } = useTranslation();
  const { mode } = useThemeContext();
  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";
  const { userInfo } = useAuth();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filterCourses, setFilterCourses] = useState<Course[]>([]);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  const handleEdit = (id: string) => {
    navigate(`${id}/manage/goals/`, { replace: true });
  };

  const handleUpdateDiscount = async (id: string) => {
    if (discountPercentage < 0 || discountPercentage > 100) {
      alert("Discount must be between 0 and 100.");
      return;
    }
    const formData: IUpdateCourse = {
      discount_percentage: discountPercentage !== 0 ? discountPercentage : 0,
    };
    console.log("formData", formData);
    if (id) {
      await updateCourse(token, id, formData).then((data) => {
        console.log("data", data);
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course._id === id
              ? { ...course, discount_percentage: discountPercentage }
              : course
          )
        );
        console.log("data", data);
        setEditingCourseId(null);
      });
    }
  };

  useEffect(() => {
    const fetchCoursesMe = async () => {
      if (!userInfo._id) return;
      await getCoursesOfInstructor(userInfo._id, 1, 100, status).then(
        (data) => {
          if (data.status <= 305) {
            setCourses(data.data.data);
          }
        }
      );
    };
    fetchCoursesMe();
  }, [status, userInfo._id]);

  useEffect(() => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(lowerCaseQuery) ||
        course.subtitle.toLowerCase().includes(lowerCaseQuery)
    );
    setFilterCourses(filtered);
  }, [query, courses]);

  return (
    <Box sx={{ padding: 1 }}>
      {filterCourses.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            p: 6,
            border: "0.01px solid",
            minWidth: "120vh",
          }}
        >
          <Typography variant="body1" sx={{ mt: 1, mb: 3, color: textColor }}>
            {`No ${status || ""} courses found`}
          </Typography>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: textColor,
              color: backgroundColor,
              borderColor: textColor,
              fontWeight: "bold",
              ":hover": {
                backgroundColor: backgroundColor,
                color: textColor,
              },
            }}
            onClick={() => navigate("/instructor/course/create")}
          >
            {t("add_new_course")}
          </Button>
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Table>
            <TableHead
              sx={{
                backgroundColor: "transparent",
              }}
            >
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", width: "15%" }}>
                  Thumbnail
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "20%" }}>
                  Title
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "15%" }}>
                  Category
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "15%" }}>
                  Level
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "15%" }}>
                  Language
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "10%" }}>
                  Price ($)
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "10%" }}>
                  Discount (%)
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "10%" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterCourses.map((course) => (
                <TableRow
                  key={course._id}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f9f9f9",
                    },
                  }}
                >
                  <TableCell>
                    <CardMedia
                      component="img"
                      image={course.thumbnail}
                      alt={course.title}
                      sx={{
                        aspectRatio: "16/9",
                        objectFit: "cover",
                        position: "relative",
                      }}
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
                  <TableCell>{course.language.join(", ")}</TableCell>
                  <TableCell>${course.price.toFixed(2)}</TableCell>
                  <TableCell>
                    {editingCourseId === course._id ? (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <TextField
                          value={discountPercentage}
                          onChange={(e) =>
                            setDiscountPercentage(Number(e.target.value))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter")
                              handleUpdateDiscount(course._id);
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
                              marginRight: 1,
                            },
                          }}
                        />
                        <Button
                          variant="outlined"
                          onClick={() => handleUpdateDiscount(course._id)}
                          sx={{
                            fontWeight: "bold",
                            height: "100%",
                            color: backgroundColor,
                            background: textColor,
                          }}
                        >
                          {t("save")}
                        </Button>
                      </Box>
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
                        {course.discount_percentage || 0} %
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
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
      )}
    </Box>
  );
};

export default CourseOfInstructor;
