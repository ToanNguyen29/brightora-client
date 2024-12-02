import * as React from "react";
import { Box } from "@mui/material";
import StepperComponent from "./createcourse/StepperComponent";
import CourseTypeForm from "./createcourse/CourseTypeForm";
import ActionButtons from "./createcourse/ActionButtons";
import { useThemeContext } from "../../theme/ThemeContext";
import CourseTitleForm from "./createcourse/CourseTitleForm";
import CourseCategory from "./createcourse/CourseCategoryForm";
import CourseTimeForm from "./createcourse/CourseTimeForm";
import { createCourse } from "../../services/CourseService";
import { ICreateCourse } from "../../models/Course";
import { useNavigate } from "react-router-dom";

const steps = [
  "Choose the type of course you're offering",
  "Provide a catchy title for your course",
  "Select the appropriate category for your course",
  "Specify the duration or timing of your course",
];

export default function CreateCoursePage() {
  const token = localStorage.getItem("token");
  const { mode } = useThemeContext();
  const navigate = useNavigate();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";

  const [formData, setFormData] = React.useState<ICreateCourse>({
    type: "",
    title: "",
    category: [""],
    time_spend: 0,
  });

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleComplete = async () => {
    await createCourse(token, formData)
      .then((data) => {
        console.log(data);
        if (data.status <= 305) {
          navigate(`/instructor/course/${data.data.course_id}/manage/goals/`, {
            replace: true,
          });
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        alert("Error: " + err.detail);
      });
    // navigate(`/instructor/course/${id}/manage/goals/`, { replace: true });
  };

  const stepContent = [
    <CourseTypeForm
      courseType={formData.type}
      handleCourseTypeChange={(value: string) =>
        handleInputChange("type", value)
      }
    />,
    <CourseTitleForm
      title={formData.title}
      handleTitleChange={(value: string) => handleInputChange("title", value)}
    />,
    <CourseCategory
      category={formData.category}
      handleCategoryChange={(value: string[]) =>
        handleInputChange("category", value)
      }
    />,
    <CourseTimeForm
      time={formData.time_spend}
      handleTimeChange={(value: string) =>
        handleInputChange("time_spend", value)
      }
    />,
  ];

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: backgroundColor,
        transition: "height 0.3s ease",
      }}
    >
      <Box sx={{ width: "100%", mt: 3 }}>
        <StepperComponent activeStep={activeStep} steps={steps} />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {stepContent[activeStep]}
      </Box>

      <ActionButtons
        activeStep={activeStep}
        stepsLength={steps.length}
        handleBack={handleBack}
        handleNext={handleNext}
        isDisabledNext={
          (activeStep === 0 && !formData.type) ||
          (activeStep === 1 && !formData.title) ||
          (activeStep === 2 && formData.category.length === 0) ||
          (activeStep === 3 && !formData.time_spend)
        }
      />
    </Box>
  );
}
