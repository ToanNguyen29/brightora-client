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
  Divider,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Overview from "../components/learning/Overview";
import Reviews from "../components/learning/Review";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../theme/ThemeContext";
import { getCourse } from "../services/CourseService";
import {
  ICourseInfoPage,
  IExerciseLearn,
  ILessonLearn,
  ISectionLearn,
  Scheduler,
} from "../models/Course";
import { getSectionByCourseId } from "../services/SectionService";
import { useAuth } from "../context/AuthContext";
import LoadingPage from "./LoadingPage";
import QuesAndAns from "../components/learning/QuesAndAns";
import ListItemLesson from "../components/learning/ListItemLesson";
import { getEnrollByCourse, updateScheduler } from "../services/Enrollment";
import ProgressEnrollment from "../components/learning/ProgressEnrollment";

const LearningPage: React.FC = () => {
  const { userInfo } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { courseId, lessonId, exerciseId } = useParams();
  const [enrollId, setEnrollId] = useState<string>();
  const { mode } = useThemeContext();
  const { t } = useTranslation();
  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";
  const navigate = useNavigate();
  const [course, setCourse] = useState<ICourseInfoPage | undefined>();
  const [sections, setSections] = useState<ISectionLearn[] | undefined>();
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [scheduler, setScheduler] = useState<Scheduler[]>([]);
  const token = localStorage.getItem("token");

  const total =
    sections?.reduce(
      (accumulator, currentValue) => accumulator + currentValue.lessons.length,
      0
    ) || 1;

  const completed =
    scheduler.reduce(
      (accumulator, currentValue) =>
        accumulator + (currentValue.is_done ? 1 : 0),
      0
    ) || 0;

  useEffect(() => {
    if (!courseId || !userInfo._id) return;
    const fetchCourse = async () => {
      try {
        await getCourse(courseId, userInfo._id)
          .then((data) => {
            if (data.status <= 305) {
              setIsLoading(true);
              setCourse(data.data);
            }
          })
          .catch((err) => {
            alert("Error: " + err.detail);
          });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourse();
  }, [courseId, userInfo._id]);

  useEffect(() => {
    if (!courseId) return;
    const fetchSectionByCourse = async () => {
      await getSectionByCourseId(courseId)
        .then((data) => {
          if (data.status <= 305) {
            setSections(data.data);
          }
        })
        .catch((err) => {
          alert("Error: " + err);
        });
    };
    fetchSectionByCourse();
  }, [courseId]);

  useEffect(() => {
    if (!courseId) return;
    const fetchEnrollByCourse = async () => {
      await getEnrollByCourse(courseId, token)
        .then((data) => {
          if (data.status <= 305) {
            console.log("Toan Nguyen Enroll", data);
            setScheduler(data.data.schedule);
            setEnrollId(data.data._id);
          }
        })
        .catch((err) => {
          alert("Error: " + err);
        });
    };
    fetchEnrollByCourse();
  }, [courseId, token]);

  useEffect(() => {
    if (!isLoading && course?.relation && course.relation.is_enroll === false)
      navigate(`/course/${courseId}`);
  }, [course, navigate, courseId, isLoading]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) =>
    setTabIndex(newValue);

  const toggleSection = (id: string) => {
    setExpandedSections(
      expandedSections.includes(id)
        ? expandedSections.filter((x) => x !== id)
        : [...expandedSections, id]
    );
  };

  const handleClickLesson = (
    event: React.SyntheticEvent,
    id: string,
    type: string
  ) => {
    setSelectedLesson(id);
    if (type === "lesson") navigate(`lesson/${id}`, { replace: true });
    else if (type === "excercise")
      navigate(`exercise/${id}`, { replace: true });
  };

  const handleUpdateScheduler = (updatedScheduler: Scheduler) => {
    setScheduler((prev) => {
      const exists = prev.find((x) => x.id === updatedScheduler.id);
      if (exists) {
        return prev.map((x) =>
          x.id === updatedScheduler.id ? updatedScheduler : x
        );
      } else {
        return [...prev, updatedScheduler];
      }
    });
  };
  useEffect(() => {
    if (enrollId && scheduler.length > 0) {
      updateScheduler(token, enrollId, scheduler);
    }
  }, [scheduler, enrollId, token]);

  if (isLoading) return <LoadingPage />;

  return (
    <Box>
      <Box
        display="flex"
        sx={{
          px: 5,
          backgroundColor: textColor,
          border: backgroundColor,
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          color={backgroundColor}
          sx={{ p: 3 }}
        >
          {course?.title}
        </Typography>
        <ProgressEnrollment completed={completed} total={total} />
      </Box>

      <Box sx={{}}>
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2}>
          <Box
            flex={3}
            sx={{
              width: "100%",
              height: "auto",
              aspectRatio: "16/9",
              border: "1px solid #ddd",
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
                  {t("please_select_lesson")}
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
                <Tab label="Q&A" />
                <Tab label="Reviews" />
              </Tabs>
            </AppBar>

            <Box mt={2}>
              {tabIndex === 0 && <Overview course={course} />}
              {tabIndex === 1 && <QuesAndAns courseId={courseId} />}
              {tabIndex === 2 && (
                <Reviews reviewStat={course?.review} courseId={courseId} />
              )}
            </Box>
          </Box>

          <Box
            flex={1}
            maxHeight="100vh"
            overflow="auto"
            sx={{
              position: "sticky",
              top: 20,
            }}
          >
            <Typography variant="h5" fontWeight="bold" sx={{ p: 1.5 }}>
              {t("course_content")}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {sections?.map((section) => (
              <Box key={section.id} mb={2}>
                <ListItem onClick={() => toggleSection(section.id)}>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                      >
                        {`Section ${section.ordinal_number}: ${section.title}`}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                      >
                        {`${section?.lessons.length} lessons + exercises`}
                      </Typography>
                    }
                  />
                  {expandedSections.includes(section.id) ? (
                    <ExpandLess
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    />
                  ) : (
                    <ExpandMore
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    />
                  )}
                </ListItem>
                <Collapse
                  in={expandedSections.includes(section.id)}
                  timeout="auto"
                  unmountOnExit
                >
                  {section.lessons.map(
                    (lesson: ILessonLearn | IExerciseLearn) => (
                      <ListItemLesson
                        key={lesson._id}
                        lesson={lesson}
                        selectedLesson={selectedLesson}
                        onSelectLesson={handleClickLesson}
                        handleUpdateScheduler={handleUpdateScheduler}
                        schedular={
                          scheduler.find((x) => x.id === lesson._id) || null
                        }
                      />
                    )
                  )}
                </Collapse>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LearningPage;
