import React, { useEffect, useState } from "react";
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  Box,
  Paper,
} from "@mui/material";
import { getCoursesMe } from "../services/CourseService";
import { getQAndAByCourse } from "../services/QuesAndAnsService";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../theme/ThemeContext";
import QAItem from "../components/qanda/QAndAItem";

interface ICourseQA {
  _id: string;
  title: string;
}

interface IQAndA {
  _id: string;
  question: string;
  answer: string | null;
  student: {
    first_name: string;
    last_name: string;
    photo: string;
  };
}

const QAndAPage: React.FC = () => {
  const token = localStorage.getItem("token");
  const [courses, setCourses] = useState<ICourseQA[] | undefined>();
  const [currentCourseId, setCurrentCourseId] = useState<string>();
  const [qAndAList, setQAndAList] = useState<IQAndA[] | undefined>();
  const [filteredQAndAList, setFilteredQAndAList] = useState<
    IQAndA[] | undefined
  >();
  const [filter, setFilter] = useState<string>("all");

  const { t } = useTranslation();
  const { mode } = useThemeContext();

  useEffect(() => {
    const fetchCoursesMe = async () => {
      await getCoursesMe(token).then((data) => {
        if (data.status <= 305) {
          setCourses(data.data.data);
          if (data.data.data) {
            setCurrentCourseId(data.data.data[0]._id); // Set the first course as the default
          }
        }
      });
    };
    fetchCoursesMe();
  }, [token]);

  useEffect(() => {
    if (!currentCourseId) return;
    const fetchQAndA = async () => {
      await getQAndAByCourse(token, currentCourseId, 1, 10).then((data) => {
        if (data.status <= 305) {
          setQAndAList(data.data.data);
          setFilteredQAndAList(data.data.data);
        }
      });
    };
    fetchQAndA();
  }, [currentCourseId, token]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredQAndAList(qAndAList);
    } else if (filter === "answered") {
      setFilteredQAndAList(qAndAList?.filter((q) => q.answer !== null));
    } else if (filter === "unanswered") {
      setFilteredQAndAList(qAndAList?.filter((q) => q.answer === null));
    }
  }, [filter, qAndAList]);

  const handleReply = async (questionId: string) => {};

  return (
    <Box display="flex" sx={{ width: "100%" }}>
      {/* Left Box */}
      <Box
        sx={{
          width: "300px",
          border: "1px solid #ccc",
          padding: "16px",
          borderRadius: "8px",
          overflowY: "auto",
          marginRight: "16px",
          flexShrink: 0, // Prevent shrinking
          mb: 2,
        }}
      >
        <h3>Courses</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {courses &&
            courses.map((course) => (
              <li
                key={course._id}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  background:
                    currentCourseId === course._id ? "#e0e0e0" : "transparent",
                  borderRadius: "4px",
                }}
                onClick={() => setCurrentCourseId(course._id)}
              >
                {course.title}
              </li>
            ))}
        </ul>
      </Box>
      {/* Right Box */}
      <Box
        sx={{
          flex: 1, // Take up the remaining space
          display: "flex",
          flexDirection: "column",
          width: "900px",
        }}
      >
        <FormControl
          sx={{
            mb: 2,
          }}
        >
          <Select
            labelId="filter-label"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="all">All Questions</MenuItem>
            <MenuItem value="answered">Answered Questions</MenuItem>
            <MenuItem value="unanswered">Unanswered Questions</MenuItem>
          </Select>
        </FormControl>
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
          }}
        >
          {filteredQAndAList && filteredQAndAList.length > 0 ? (
            filteredQAndAList.map((q) => (
              <QAItem key={q._id} qAndA={q} onReplySubmit={handleReply} />
            ))
          ) : (
            <Paper
              elevation={0}
              sx={{
                p: 2,
                border: "1px solid",
                borderColor: "grey.300", // Light grey border color
                borderRadius: 2, // Rounded corners
                backgroundColor: "background.paper", // Background color from theme
                textAlign: "center", // Center-align text
              }}
            >
              <Typography variant="body1" color="text.secondary">
                No questions match the filter criteria.
              </Typography>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default QAndAPage;
