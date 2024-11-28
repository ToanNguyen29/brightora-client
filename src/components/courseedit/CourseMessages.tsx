import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";
import RichTextBox from "../reused/RichTextBoxComponent";
import { useParams } from "react-router-dom";
import { getCourse, updateMessagesCourse } from "../../services/CourseService";
import Head from "./Head";

const CourseMessages: React.FC = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams<{ id: string }>();
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");
  const [congratulationMessage, setCongratulationMessage] =
    useState<string>("");

  const { t } = useTranslation();
  const { mode } = useThemeContext();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  useEffect(() => {
    console.log("WelcomeMessage", welcomeMessage);
  }, [welcomeMessage]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await getCourse(id).then((data) => {
          if (data.status <= 305) {
            console.log("course message", data);
            setWelcomeMessage(data.data.welcome_message);
            setCongratulationMessage(data.data.congratulation_message);
          }
        });
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await getCourse(id).then((data) => {
          if (data.status <= 305) {
            console.log("course landing", data);
            const collection = {
              title: data.data.title || "",
              subtitle: data.data.subtitle || "",
              description: data.data.description || "",
              language: data.data.language || [""],
              level: data.data.level || [""],
              category: data.data.category || [""],
              objectives: data.data.objectives || "",
              thumbnail: data.data.thumbnail || "",
              promotional_video: data.data.promotional_video || "",
            };
            console.log("collection", collection);
          }
        });
      }
    };

    fetchData();
  }, [id]);

  const handleWelcomeMessageChange = (value: string) => {
    setWelcomeMessage(value);
  };

  const handleCongratulationMessageChange = (value: string) => {
    setCongratulationMessage(value);
  };

  const handleSave = async () => {
    if (!id) return;
    try {
      await updateMessagesCourse(
        token,
        id,
        welcomeMessage,
        congratulationMessage
      ).then((data) => {
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
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
      <Head title={"course_messages_page"} />
      <Box mx={"20px"} sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          {t("course_description")}
        </Typography>
        <Box
          sx={{
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
            borderBottom: "0.5px groove",
            width: "100%",
            mb: 6,
          }}
        >
          <RichTextBox
            text={welcomeMessage}
            handleTextChange={handleWelcomeMessageChange}
          />
        </Box>

        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          {t("course_description")}
        </Typography>
        <Box
          sx={{
            backgroundColor: "transparent",

            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
            borderBottom: "0.5px groove",
            width: "100%",
          }}
        >
          <RichTextBox
            text={congratulationMessage}
            handleTextChange={handleCongratulationMessageChange}
          />
        </Box>
      </Box>

      <Button
        sx={{
          fontSize: "16px",
          my: "15px",
          ml: "15px",
          backgroundColor: mode === "dark" ? "white" : "black",
          color: mode === "dark" ? "black" : "white",
          padding: "10px 20px",
          fontWeight: "bold",
          ":hover": {
            backgroundColor: mode === "dark" ? "white" : "black",
          },
          width: "200px",
        }}
        onClick={handleSave}
      >
        {t("save_changed")}
      </Button>
    </Box>
  );
};

export default CourseMessages;
