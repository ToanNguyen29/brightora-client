import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";
import RichTextBox from "../reused/RichTextBoxComponent";
import { useParams } from "react-router-dom";
import { getCourse, updateMessagesCourse } from "../../services/CourseService";
import Head from "./Head";
import AutoCloseAlert from "../reused/Alert";

const CourseMessages: React.FC = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams<{ id: string }>();
  const [alertOpen, setAlertOpen] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");
  const [congratulationMessage, setCongratulationMessage] =
    useState<string>("");

  const { t } = useTranslation();
  const { mode } = useThemeContext();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (id) {
  //       await getCourse(id).then((data) => {
  //         if (data.status <= 305) {
  //           const collection = {
  //             title: data.data.title || "",
  //             subtitle: data.data.subtitle || "",
  //             description: data.data.description || "",
  //             language: data.data.language || [""],
  //             level: data.data.level || [""],
  //             category: data.data.category || [""],
  //             objectives: data.data.objectives || "",
  //             thumbnail: data.data.thumbnail || "",
  //             promotional_video: data.data.promotional_video || "",
  //           };
  //           console.log("collection", collection);
  //         }
  //       });
  //     }
  //   };

  //   fetchData();
  // }, [id]);

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
        setAlertOpen(true);
      });
    } catch (error) {
      console.log(error);
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
      <Head title={"course_messages_page"} />
      <Box mx={"20px"} sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          {t("congratulation_message")}
        </Typography>
        <AutoCloseAlert
          severity="success"
          message="Save change completed."
          open={alertOpen}
          onClose={handleCloseAlert}
        />
        <Box
          sx={{
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
            borderBottom: "0.5px groove",
            width: "100%",
            mb: 1,
          }}
        >
          <RichTextBox
            text={welcomeMessage}
            handleTextChange={handleWelcomeMessageChange}
          />
        </Box>

        <Typography variant="h6" fontWeight="bold">
          {t("welcome_message")}
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
