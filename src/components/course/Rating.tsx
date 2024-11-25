import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";
import { Box, Paper, Typography, Button } from "@mui/material";
import RatingList from "./rating/RatingList";
import RatingModal from "./rating/RatingModal";

const fakeData = {
   ratingStar: 4.7,
   ratingNumber: 320000,
   rating: [
      {
         name: "Waing Wai Wai P.",
         rating: 1,
         content:
            "I can't thank you enough, Dr. Angela Yu, for this incredible course! Despite being an online course, it has guided me to a solid level of Python programming knowledge. Your lessons are not only informative but also challenging, pushing me closer to my career goals. This course has been a perfect blend of theory and practical experience. I've now enrolled in your Full Stack Developer course, and I'm excited to continue learning with you. Thank you for creating such an outstanding learning experience!",
         time: "3 weeks ago",
      },
      {
         name: "John D.",
         rating: 2,
         content:
            "This course was a game changer for me. The way Dr. Yu explains complex concepts in a simple manner is unparalleled. I now feel confident in my Python skills and have already started building my own projects. Highly recommend to anyone looking to break into programming!",
         time: "2 weeks ago",
      },
      {
         name: "Emma W.",
         rating: 3,
         content:
            "I've taken many online courses, but this one stands out. The depth of knowledge and the real-world applications provided are exactly what I needed. Dr. Yu is an exceptional instructor, and this course has exceeded all my expectations.",
         time: "1 month ago",
      },
      {
         name: "Carlos R.",
         rating: 4,
         content:
            "Amazing course! The lessons are well-structured and easy to follow. The coding exercises were challenging but doable, and they really helped solidify my understanding of Python. I'll definitely be taking more courses from Dr. Yu in the future.",
         time: "4 weeks ago",
      },
      {
         name: "Sophia L.",
         rating: 3.0,
         content:
            "Dr. Yu's teaching style is simply the best! This course is so well-organized, and the practical examples made learning Python a breeze. I've learned so much in such a short amount of time, and I'm excited to keep applying these skills in my job.",
         time: "2 months ago",
      },
      {
         name: "Michael B.",
         rating: 4.5,
         content:
            "What an incredible course! Dr. Yu makes learning Python so engaging and fun. The balance between theory and practice is perfect, and the support from the community is just the cherry on top. I can't wait to continue my learning journey with other courses by Dr. Yu.",
         time: "3 months ago",
      },
      {
         name: "Linda K.",
         rating: 4.4,
         content:
            "This course is fantastic! The concepts are explained very clearly, and the hands-on projects are invaluable. I've tried other courses before, but this one truly stands out. Dr. Yu has a unique way of making difficult topics understandable.",
         time: "1 week ago",
      },
   ],
};

const Rating: React.FC = () => {
   const { mode } = useThemeContext();
   const { t } = useTranslation();
   const [open, setOpen] = useState(false);

   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";
   const headerBackgroundColor = mode === "light" ? "#f0f0f0" : "#333333";

   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   return (
      <>
         <Box
            sx={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               backgroundColor: backgroundColor,
               mb: "20px",
               width: "100%",
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
               <Typography
                  variant="h5"
                  sx={{
                     fontWeight: "bold",
                     mb: 2,
                     textAlign: "center",
                     backgroundColor: headerBackgroundColor,
                     borderRadius: "4px",
                     color: textColor,
                     padding: "8px",
                  }}
               >
                  {t("rating")}
               </Typography>

               <RatingList
                  ratings={fakeData.rating.slice(0, 4)}
                  textColor={textColor}
                  backgroundColor={backgroundColor}
                  headerBackgroundColor={headerBackgroundColor}
                  isGrid={true} // Two items per row
               />

               <Button
                  variant="outlined"
                  sx={{
                     mt: 2,
                     display: "block",
                     mx: "auto",
                     borderColor: textColor,
                     color: textColor,
                  }}
                  onClick={handleOpen}
               >
                  {t("show_more")}
               </Button>
            </Paper>
         </Box>

         <RatingModal
            open={open}
            onClose={handleClose}
            ratings={fakeData.rating}
            textColor={textColor}
            backgroundColor={backgroundColor}
            headerBackgroundColor={headerBackgroundColor}
         />
      </>
   );
};

export default Rating;
