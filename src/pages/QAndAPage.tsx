import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { getCoursesMe } from "../services/CourseService";
import { getQAndAByCourse } from "../services/QuesAndAnsService";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../theme/ThemeContext";

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
  const [reply, setReply] = useState<string>("");
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(
    null
  );
  const [filter, setFilter] = useState<string>("all"); // Trạng thái filter: "all", "answered", "unanswered"

  const { t } = useTranslation();
  const { mode } = useThemeContext();

  const backgroundColor = mode === "dark" ? "#ffffff" : "#000000";
  const textColor = mode === "dark" ? "#000000" : "#ffffff";

  // Fake thông tin instructor
  const instructor = {
    name: "John Doe",
    photo: "https://via.placeholder.com/40",
  };

  // Lấy danh sách khóa học của lecturer
  useEffect(() => {
    const fetchCoursesMe = async () => {
      await getCoursesMe(token).then((data) => {
        console.log("Course of instructor:", data);
        if (data.status <= 305) {
          setCourses(data.data.data);
        }
      });
    };
    fetchCoursesMe();
  }, [token]);

  // Lấy danh sách Q&A của khóa học hiện tại
  useEffect(() => {
    if (!currentCourseId) return;
    const fetchQAndA = async () => {
      await getQAndAByCourse(token, currentCourseId, 1, 10).then((data) => {
        console.log("getQAndAByCourse:", data);
        if (data.status <= 305) {
          setQAndAList(data.data.data);
          setFilteredQAndAList(data.data.data); // Gắn danh sách vào bộ lọc ban đầu
        }
      });
    };
    fetchQAndA();
  }, [currentCourseId, token]);

  // Bộ lọc câu hỏi dựa trên trạng thái trả lời
  useEffect(() => {
    if (filter === "all") {
      setFilteredQAndAList(qAndAList);
    } else if (filter === "answered") {
      setFilteredQAndAList(qAndAList?.filter((q) => q.answer !== null));
    } else if (filter === "unanswered") {
      setFilteredQAndAList(qAndAList?.filter((q) => q.answer === null));
    }
  }, [filter, qAndAList]);

  const handleReply = async (questionId: string) => {
    // if (!reply.trim()) return;
    // await replyToQuestion(token, questionId, reply).then((data) => {
    //   console.log("Reply submitted:", data);
    //   if (data.status <= 305) {
    //     setQAndAList((prev) =>
    //       prev?.map((q) => (q._id === questionId ? { ...q, answer: reply } : q))
    //     );
    //     setReply("");
    //     setCurrentQuestionId(null);
    //   }
    // });
  };

  return (
    <>
      <Typography variant="h3" fontFamily={"monospace"} sx={{ ml: 4, mb: 5 }}>
        {t("q_and_a")}
      </Typography>

      <Stack direction="row" gap={2} sx={{ p: 2 }}>
        <Paper
          elevation={3}
          sx={{
            width: 300,
            maxHeight: "80vh",
            overflowY: "auto",
            p: 2,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            {t("courses")}
          </Typography>
          <List>
            {courses?.map((course) => (
              <ListItem
                key={course._id}
                disablePadding
                sx={{
                  bgcolor:
                    currentCourseId === course._id ? "grey.300" : "transparent",
                  borderRadius: 1,
                }}
              >
                <ListItemButton onClick={() => setCurrentCourseId(course._id)}>
                  <ListItemText primary={course?.title || ""} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            ml: 7,
            width: "100%",
            minWidth: "110vh",
            overflowY: "auto",
          }}
        >
          {/* <Typography variant="h6" gutterBottom>
            Q&A
          </Typography> */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <FormControl
              sx={{
                minWidth: 200,
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
          </Box>

          {filteredQAndAList && filteredQAndAList.length > 0 ? (
            filteredQAndAList.map((q) => (
              <Card key={q._id} sx={{ mb: 2 }}>
                <CardContent>
                  {/* Thông tin sinh viên */}
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar src={q.student.photo} alt={q.student.first_name} />
                    <Box ml={2}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {q.student.first_name} {q.student.last_name}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body1" mb={2}>
                    {q.question}
                  </Typography>

                  {q.answer ? (
                    <Box display="flex" mt={3}>
                      <Avatar
                        src={instructor.photo}
                        alt={instructor.name}
                        sx={{ mr: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {instructor.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            mt: 1,
                            pl: 2,
                            borderLeft: "4px solid",
                            borderColor: "primary.main",
                          }}
                        >
                          {q.answer}
                        </Typography>
                        <Button
                          variant="text"
                          size="small"
                          sx={{ mt: 1 }}
                          onClick={() => {
                            setCurrentQuestionId(q._id);
                            setReply(q.answer || "");
                          }}
                        >
                          Edit
                        </Button>
                      </Box>
                    </Box>
                  ) : currentQuestionId === q._id ? (
                    <Box mt={2}>
                      <TextField
                        fullWidth
                        label="Your Reply"
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        multiline
                        rows={2}
                        sx={{ mb: 2 }}
                      />
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleReply(q._id)}
                        >
                          Submit
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => setCurrentQuestionId(null)}
                        >
                          Cancel
                        </Button>
                      </Stack>
                    </Box>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => setCurrentQuestionId(q._id)}
                    >
                      Reply
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1">
              No questions match the filter criteria.
            </Typography>
          )}
        </Box>
      </Stack>
    </>
  );
};

export default QAndAPage;
