import { Box, Button } from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import Head from "./Head";
import LearningObjectives from "./goals/LearningObjectives";
import IntendedLearners from "./goals/IntendedLearners";
import Requirements from "./goals/Requirements";
import { useEffect, useState } from "react";
import { IGoal, IUpdateCourse } from "../../models/Course";
import { useParams } from "react-router-dom";
import { getCourse, updateCourse } from "../../services/CourseService";
import AutoCloseAlert from "../reused/Alert";

const Goals: React.FC = () => {
  const token = localStorage.getItem("token");

  const { t } = useTranslation();
  const { mode } = useThemeContext();
  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";
  const { id } = useParams<{ id: string }>();
  const [alertOpen, setAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState<string>("");

  const [formData, setFormData] = useState<IGoal>({
    learningObjectives: ["", "", "", ""],
    requirements: [""],
    intendedLearners: [""],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          await getCourse(id).then((data) => {
            if (data.status <= 305) {
              setFormData(data.data.goals);
            } else {
              console.log(data);
              if (Array.isArray(data.data.detail)) {
                setErrorAlertOpen(data.data.detail[0].msg);
              } else {
                setErrorAlertOpen(data.data.detail);
              }
            }
          });
        }
      } catch (err) {
        setErrorAlertOpen("Error fetching data.");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (name: string, value: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const sanitizedFormData: IGoal = {
        learningObjectives: formData.learningObjectives.filter(
          (obj) => obj.trim() !== ""
        ),
        requirements: formData.requirements.filter((req) => req.trim() !== ""),
        intendedLearners: formData.intendedLearners.filter(
          (learner) => learner.trim() !== ""
        ),
      };

      const body: IUpdateCourse = {
        goals: sanitizedFormData,
      };

      console.log("data filter", formData, sanitizedFormData);

      if (id) {
        await updateCourse(token, id, body)
          .then((data) => {
            if (data.status <= 305) {
              setAlertOpen(true);
            } else {
              if (Array.isArray(data.data.detail)) {
                setErrorAlertOpen(data.data.detail[0].msg);
              } else {
                setErrorAlertOpen(data.data.detail);
              }
            }
          })
          .catch((err) => {});
      }
    } catch (error) {
      setErrorAlertOpen("Error saving data.");
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <Box
      width={"100%"}
      height={"100%"}
      sx={{
        border: "0.5px groove",
        backgroundColor: backgroundColor,
        color: textColor,
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <AutoCloseAlert
        severity="success"
        message="Save change completed."
        open={alertOpen}
        onClose={handleCloseAlert}
      />
      <AutoCloseAlert
        severity="error"
        message={`${errorAlertOpen}`}
        open={!errorAlertOpen ? false : true}
        onClose={() => setErrorAlertOpen("")}
      />

      <Head title={"intended_learners"} />

      <LearningObjectives
        handleChange={handleChange}
        name={"learningObjectives"}
        value={formData.learningObjectives}
        backgroundColor={backgroundColor}
        textColor={textColor}
      />

      <Requirements
        backgroundColor={backgroundColor}
        textColor={textColor}
        handleChange={handleChange}
        name={"requirements"}
        value={formData.requirements}
      />

      <IntendedLearners
        backgroundColor={backgroundColor}
        textColor={textColor}
        handleChange={handleChange}
        name={"intendedLearners"}
        value={formData.intendedLearners}
      />

      <Button
        sx={{
          fontSize: "16px",
          my: "15px",
          mx: "20px",
          backgroundColor: mode === "dark" ? "white" : "black",
          color: mode === "dark" ? "black" : "white",
          padding: "10px 20px",
          fontWeight: "bold",
          ":hover": {
            backgroundColor: mode === "dark" ? "white" : "black",
          },
          width: "100px",
        }}
        onClick={handleSave}
      >
        {t("save")}
      </Button>
    </Box>
  );
};

export default Goals;
