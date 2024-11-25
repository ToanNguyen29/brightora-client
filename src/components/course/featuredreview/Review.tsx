import React, { useState } from "react";
import { Paper, Typography, Rating } from "@mui/material";
import AvatarSection from "./AvatarSection";
import ReviewActions from "./ReviewActions";
import { useThemeContext } from "../../../theme/ThemeContext";
import { useTranslation } from "react-i18next";

const fakeData = {
   name: "David K",
   courses: 51,
   reviews: 36,
   avt: "https://t3.ftcdn.net/jpg/06/57/85/22/360_F_657852299_5py03y6oH4mrUDyZnf9XxFSFfrjcqAzP.jpg",
   rating: 3.6,
   time: "3 years ago",
   content:
      "Angela is a great teacher and I have taken some other courses of hers. This one seems to be of the same great quality. If you want a simple code-along, this is not for you. Angela will Challenge you to actually use what she teaches you many times along the way. You WILL know how to program Python when you finish this course!",
};

const Review: React.FC<{ data: typeof fakeData }> = ({ data }) => {
   const { mode } = useThemeContext();
   const [likes, setLikes] = useState(0);
   const [dislikes, setDislikes] = useState(0);
   const { t } = useTranslation();

   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";
   const secondaryTextColor = mode === "light" ? "#757575" : "#b0b0b0";
   const headerBackgroundColor = mode === "light" ? "#f0f0f0" : "#333333";

   const handleLike = () => {
      setLikes(likes + 1);
   };

   const handleDislike = () => {
      setDislikes(dislikes + 1);
   };

   return (
      <Paper
         elevation={4}
         sx={{
            padding: 2,
            borderRadius: 3,
            backgroundColor,
            color: textColor,
            transition: "background-color 0.3s ease",
         }}
      >
         <Typography
            variant="h5"
            sx={{
               fontWeight: "bold",
               mb: 2,
               textAlign: "center",
               backgroundColor: headerBackgroundColor,
               padding: "8px",
               borderRadius: "4px",
            }}
         >
            {t("featured_review")}
         </Typography>
         <AvatarSection
            name={data.name}
            courses={data.courses}
            reviews={data.reviews}
            avt={data.avt}
            secondaryTextColor={secondaryTextColor}
         />
         <Rating value={data.rating} precision={0.1} readOnly />
         <Typography variant="body2" sx={{ color: secondaryTextColor, mb: 1 }}>
            {data.time}
         </Typography>
         <Typography variant="body1" sx={{ mb: 2 }}>
            {data.content}
         </Typography>
         <ReviewActions
            likes={likes}
            dislikes={dislikes}
            handleLike={handleLike}
            handleDislike={handleDislike}
            textColor={textColor}
         />
      </Paper>
   );
};

export default Review;
