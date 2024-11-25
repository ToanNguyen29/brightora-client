import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Typography,
  Tabs,
  Tab,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
  Divider,
  Rating,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  PlayCircleOutline,
  CheckCircleOutline,
} from "@mui/icons-material";
import Overview from "../components/learning/Overview";
import Notes from "../components/learning/Notes";
import Reviews from "../components/learning/Review";
import { initialNotes, initialReviews } from "./mockData";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../theme/ThemeContext";
import { getCourse } from "../services/CourseService";
import {
  ICourseInfoPage,
  IExerciseLearn,
  ILessonLearn,
  ISectionLearn,
} from "../models/Course";
import { getSectionByCourseId } from "../services/SectionService";

// Data Interfaces
interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

interface Exercise {
  id: string;
  title: string | null;
  description: string | null;
  completed: boolean;
  questions: any;
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
  exercises: Exercise[];
  duration: string;
}

const courseSections: Section[] = [
  {
    id: "1",
    title: "Introduction to React",
    duration: "45 min",
    lessons: [
      {
        id: "1.1",
        title: "What is React?",
        duration: "15 min",
        completed: true,
      },
      {
        id: "1.2",
        title: "Environment Setup",
        duration: "30 min",
        completed: false,
      },
    ],
    exercises: [
      {
        id: "2.1",
        title: "Quiz 1",
        description: "Basic Nodejs",
        completed: true,
        questions: [
          {
            question: "Which is the most popular JavaScript framework?",
            options: ["Angular", "React", "Svelte", "Vue"],
            correctOption: 1,
          },
          {
            question: "Which company invented React?",
            options: ["Google", "Apple", "Netflix", "Facebook"],
            correctOption: 3,
          },
          {
            question: "What's the fundamental building block of React apps?",
            options: ["Components", "Blocks", "Elements", "Effects"],
            correctOption: 0,
          },
          {
            question:
              "What's the name of the syntax we use to describe the UI in React components?",
            options: ["FBJ", "Babel", "JSX", "ES2015"],
            correctOption: 2,
          },
        ],
      },
      {
        id: "2.2",
        title: "Quiz 2",
        description: "Basic react",
        completed: true,
        questions: [
          {
            question: "Which is the most popular JavaScript framework?",
            options: ["Angular", "React", "Svelte", "Vue"],
            correctOption: 1,
          },
          {
            question: "Which company invented React?",
            options: ["Google", "Apple", "Netflix", "Facebook"],
            correctOption: 3,
          },
          {
            question: "What's the fundamental building block of React apps?",
            options: ["Components", "Blocks", "Elements", "Effects"],
            correctOption: 0,
          },
          {
            question:
              "What's the name of the syntax we use to describe the UI in React components?",
            options: ["FBJ", "Babel", "JSX", "ES2015"],
            correctOption: 2,
          },
        ],
      },
    ],
  },
];

const LearningPage: React.FC = () => {
  // const token = localStorage.getItem("token");
  const { courseId, lessonId, exerciseId } = useParams();
  const { mode } = useThemeContext();
  const { t } = useTranslation();
  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";
  const navigate = useNavigate();

  const [course, setCourse] = useState<ICourseInfoPage | undefined>();
  const [sections, setSections] = useState<ISectionLearn[] | undefined>();

  const [tabIndex, setTabIndex] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  // const [selectedExercise, setSelectedExercise] = useState<string | null>(
  //    null,
  // );
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // const [courseData] = useState(courseSections);
  const [reviews, setReviews] = useState(initialReviews);
  const [notes, setNotes] = useState(initialNotes);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    content: "",
  });
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    if (!courseId) return;
    const fetchCourse = async () => {
      await getCourse(courseId)
        .then((data) => {
          if (data.status <= 305) {
            console.log("course In learning", data.data);
            setCourse(data.data);
          } else {
            console.log();
          }
        })
        .catch((err) => {
          alert("Error: " + err.detail);
        });
    };
    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    if (!courseId) return;
    const fetchSectionByCourse = async () => {
      await getSectionByCourseId(courseId)
        .then((data) => {
          console.log("Hi", data);
          if (data.status <= 305) {
            console.log("section In learning", data.data);
            setSections(data.data);
          } else {
            console.log();
          }
        })
        .catch((err) => {
          alert("Error: " + err);
        });
    };
    fetchSectionByCourse();
  }, [courseId]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) =>
    setTabIndex(newValue);

  const toggleSection = (id: string) => {
    setExpandedSections(
      expandedSections.includes(id)
        ? expandedSections.filter((x) => x !== id)
        : [...expandedSections, id]
    );
  };

  const handleAddReview = () => {
    if (newReview.name && newReview.rating && newReview.content) {
      const newReviewData = {
        id: (reviews.length + 1).toString(),
        name: newReview.name,
        rating: newReview.rating,
        content: newReview.content,
      };
      setReviews([...reviews, newReviewData]);
      setNewReview({ name: "", rating: 0, content: "" });
    }
  };

  const handleClickLesson = (
    event: React.SyntheticEvent,
    id: string,
    type: string
  ) => {
    console.log("typeeeeeeeeee", type);
    setSelectedLesson(id);
    if (type === "lesson") navigate(`lesson/${id}`, { replace: true });
    else if (type === "excercise")
      navigate(`exercise/${id}`, { replace: true });
  };

  // Handle add note
  const handleAddNote = () => {
    if (newNote) {
      const newNoteData = {
        id: (notes.length + 1).toString(),
        text: newNote,
      };
      setNotes([...notes, newNoteData]);
      setNewNote("");
    }
  };
  // maxWidth = "xl";
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="column"
        // mb={3}
        sx={{ backgroundColor: textColor, border: backgroundColor }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          color={backgroundColor}
          sx={{ p: 3 }}
        >
          {course?.title}
        </Typography>
      </Box>

      <Box sx={{}}>
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2}>
          {/* Video Player Section */}
          <Box
            flex={3}
            sx={{
              width: "100%",
              height: "auto",
              aspectRatio: "16/9",
              border: "1px solid #ddd",
              // mb: 1,
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: 0,
                paddingTop: "56.25%",
                background: backgroundColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {lessonId || exerciseId ? (
                <Outlet />
              ) : (
                <Typography
                  variant="h6"
                  sx={{
                    color: textColor,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}
                >
                  Please select a lesson for learning
                </Typography>
              )}
            </Box>

            <AppBar position="static" color="default" sx={{ mt: 1 }}>
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
              >
                <Tab label="Overview" />
                <Tab label="Notes" />
                <Tab label="Reviews" />
              </Tabs>
            </AppBar>

            <Box mt={2}>
              {tabIndex === 0 && (
                <Overview />
                // <Overview
                //    notes={notes}
                //    newNote={newNote}
                //    setNewNote={setNewNote}
                //    handleAddNote={handleAddNote}
                // ></Overview>
              )}
              {tabIndex === 1 && (
                <Notes
                  notes={notes}
                  newNote={newNote}
                  setNewNote={setNewNote}
                  handleAddNote={handleAddNote}
                />
              )}
              {tabIndex === 2 && (
                <Reviews
                  reviews={reviews}
                  newReview={newReview}
                  setNewReview={setNewReview}
                  handleAddReview={handleAddReview}
                />
              )}
            </Box>
          </Box>

          {/* Course Content Section */}
          <Box flex={1} maxHeight="75vh" overflow="auto">
            <Typography variant="h5" fontWeight="bold" sx={{ p: 1.5 }}>
              Course Content
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {sections?.map((section) => (
              <Box key={section.id} mb={2}>
                <ListItem onClick={() => toggleSection(section.id)}>
                  <ListItemText
                    primary={
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {`Section ${section.ordinal_number}: ${section.title}`}
                      </Typography>
                    }
                    secondary={`${section?.lessons.length} lessons + exercises`}
                  />
                  {expandedSections.includes(section.id) ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItem>
                <Collapse
                  in={expandedSections.includes(section.id)}
                  timeout="auto"
                  unmountOnExit
                >
                  {section.lessons.map(
                    (lesson: ILessonLearn | IExerciseLearn) => (
                      <ListItem
                        sx={{
                          backgroundColor:
                            selectedLesson === lesson.id
                              ? "rgba(0, 0, 0, 0.08)"
                              : "transparent",
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.08)",
                            cursor: "pointer",
                          },
                          "&:active": {
                            backgroundColor: "rgba(0, 0, 0, 0.16)", // Màu nền khi click
                          },
                        }}
                        key={lesson.id}
                        onClick={(e) =>
                          handleClickLesson(e, lesson.id, lesson.type)
                        }
                      >
                        <ListItemText
                          primary={
                            <Typography sx={{}}>
                              {lesson.type === "lesson"
                                ? `${lesson.ordinal_number}. ${lesson.title}`
                                : `Exercise. ${lesson.title}`}
                            </Typography>
                          }
                          // secondary={lesson.duration}
                        />
                      </ListItem>
                    )
                  )}
                </Collapse>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Tabs Section */}
      </Box>
    </Box>
  );
};

// Overview Component

export default LearningPage;
