import React, { useEffect, useState } from "react";
import { Box, Button, Paper } from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContext";
import InstructorHeader from "./instructor/InstructorHeader";
import InstructorInfo from "./instructor/InstructorInfo.tsx";
import MarkdownContent from "./instructor/MarkdownContent";
import {
  getInstructorStatistics,
  getUser,
} from "../../services/UserServices.ts";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useTranslation } from "react-i18next";
// import { getCoursesByOwner } from "../../services/CourseService.ts";

// const fakeData = {
//   name: "Dr. Angela Yu",
//   avt: "https://t3.ftcdn.net/jpg/06/57/85/22/360_F_657852299_5py03y6oH4mrUDyZnf9XxFSFfrjcqAzP.jpg",
//   position: "Developer and Lead Instructor",
//   rating: 4.7,
//   reviews: 870289,
//   students: 2878773,
//   courses: 7,
//   introduction: "/instructordes.md",
// };

interface InstructorProps {
  owner_id: string;
}

interface InstructorInfo {
  _id: string;
  email: string;
  headline: string;
  description: string;
  photo: string;
  first_name: string;
  last_name: string;
}

const Instructor: React.FC<InstructorProps> = ({ owner_id }) => {
  const { mode } = useThemeContext();
  const { t } = useTranslation();
  const [instructor, setInstructor] = useState<InstructorInfo | undefined>();
  const [instructorStat, setInstructorStat] = useState<any>({
    average_rating: 0,
    total: 0,
    total_reviews: 0,
    total_students: { total_students: 0 },
  });
  //   const [courseOfInstructor, setCourseOfInstructor] = useState();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";
  const secondaryTextColor = mode === "light" ? "#757575" : "#b0b0b0";
  const headerBackgroundColor = mode === "light" ? "#f0f0f0" : "#333333";
  const iconBackgroundColor = mode === "light" ? "#e0e0e0" : "#444444";

  const [showMore, setShowMore] = useState<boolean>(false);

  const isLongDescription = instructor?.description
    ? instructor?.description.length > 350
    : false;

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    if (!owner_id) return;
    const fetchInstructorStatistics = async () => {
      await getInstructorStatistics(owner_id).then((data) => {
        console.log("Stats Ins", data);
        if (data.status <= 305) {
          setInstructorStat(data.data);
        }
      });
    };
    fetchInstructorStatistics();
  }, [owner_id]);

  useEffect(() => {
    if (!owner_id) return;
    const fetchInstructorInfo = async () => {
      await getUser(owner_id)
        .then((data) => {
          if (data.status <= 305) {
            console.log("toan Stats instructor", data.data);
            setInstructor(data.data.data);
          } else {
            console.log();
          }
        })
        .catch((err) => {
          alert("Error: " + err.detail);
        });
    };
    fetchInstructorInfo();
  }, [owner_id]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: backgroundColor,
        mb: "20px",
        mt: "20px",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          borderRadius: "12px",
          backgroundColor: backgroundColor,
          color: textColor,
          padding: 2,
          width: "100%",
        }}
      >
        <InstructorHeader
          backgroundColor={headerBackgroundColor}
          textColor={textColor}
        />
        {instructor && instructorStat && (
          <InstructorInfo
            name={`${instructor?.first_name} ${instructor?.last_name}`}
            headline={instructor?.headline || ""}
            secondaryTextColor={secondaryTextColor}
            iconBackgroundColor={iconBackgroundColor}
            rating={instructorStat?.average_rating || 0}
            reviews={instructorStat?.total_reviews || 0}
            students={instructorStat?.total_students.total_students || 0}
            courses={instructorStat?.total || 0}
            avt={instructor?.photo || ""}
          />
        )}
        <Box
          sx={{
            position: "relative",
            maxHeight: showMore ? "none" : "200px",
            overflow: "hidden",
            transition: "max-height 0.3s ease",
          }}
        >
          <MarkdownContent
            markdownDescription={instructor?.description || ""}
          />
          {!showMore && (
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "100px",
                background: `linear-gradient(to bottom, rgba(255, 255, 255, 0), ${
                  mode === "light" ? "#ffffff" : "#000000"
                })`,
              }}
            />
          )}
        </Box>
        {isLongDescription && (
          <Button
            onClick={handleShowMore}
            sx={{
              mt: showMore ? 2 : 0,
              alignSelf: "center",
              textTransform: "none",
              color: textColor,
              fontWeight: "bold",
            }}
            startIcon={
              showMore ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
            }
          >
            {showMore ? t("show_less") : t("show_more")}
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default Instructor;
