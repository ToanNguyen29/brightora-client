import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";
import ActionButtons from "../course/rightbox/ActionButtons";
import { useAuth } from "../../context/AuthContext";
import { getCourse } from "../../services/CourseService";

export interface MouseEnterCourseBoxProps {
  id: string;
}

const MouseEnterCourseBox: React.FC<MouseEnterCourseBoxProps> = ({ id }) => {
  const { mode } = useThemeContext();
  const { t } = useTranslation();
  const { userInfo } = useAuth();
  const [isCart, setIsCart] = useState(false);
  const [isEnroll, setIsEnroll] = useState(false);
  const [inWishList, setInWishList] = useState(false);
  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  const [displayedObjectives, setDisplayedObjectives] = useState<string[]>([]);

  useEffect(() => {
    if (!id) return;
    const fetchCourse = async () => {
      await getCourse(id, userInfo._id)
        .then((data) => {
          if (data.status <= 305) {
            console.log("MouseEnter", data.data);
            setIsCart(data.data.relation.in_cart);
            setIsEnroll(data.data.relation.is_enroll);
            setInWishList(data.data.relation.in_wishlist);
            const objectives =
              data.data.goals.learningObjectives.length > 3
                ? data.data.goals.learningObjectives.slice(0, 3)
                : data.data.goals.learningObjectives;
            setDisplayedObjectives(objectives);
            console.log("displayedObjectivesRef", objectives);
          } else {
            console.log(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchCourse();
  }, [id, userInfo._id]);

  return (
    <Box
      sx={{
        position: "absolute",
        top: "auto",
        bottom: "100%",
        left: "70%",
        transform: "translateX(-40%)",
        bgcolor: backgroundColor,
        boxShadow: 3,
        p: 1,
        zIndex: 10,
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          fontWeight: "bold",
          color: textColor,
        }}
      >
        {t("What'll you learn?")}
      </Typography>

      {/* List of items */}
      <Box sx={{ mb: 2 }}>
        {displayedObjectives?.map((objective: string, index: number) => (
          <Typography
            key={index}
            variant="body2"
            sx={{
              color: textColor,
              mb: 0.5,
              fontSize: "0.9rem",
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            - {objective}
          </Typography>
        ))}
      </Box>
      <ActionButtons
        id={id}
        is_cart={isCart}
        in_wishlist={inWishList}
        is_enroll={isEnroll}
        textColor={textColor}
        backgroundColor={backgroundColor}
      />
    </Box>
  );
};

export default MouseEnterCourseBox;
