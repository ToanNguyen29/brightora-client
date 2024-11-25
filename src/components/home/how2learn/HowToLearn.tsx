import React from "react";
import { Box, Grid, useTheme } from "@mui/material";
import fakeData from "./fakeData.json";
import { useThemeContext } from "../../../theme/ThemeContext";
import AuthorCard from "./AuthorCard";

const HowToLearn = () => {
   const theme = useTheme();
   const { mode } = useThemeContext();
   const textColor = mode === "light" ? "text.primary" : "text.secondary";

   const cardStyle = {
      bgcolor: mode === "light" ? "white" : "black",
      border: `1px solid ${theme.palette.divider}`,
      boxShadow: theme.shadows[3],
      ":hover": {
         boxShadow: theme.shadows[10],
      },
      m: 2,
      height: "100%",
      display: "flex",
      flexDirection: "column",
   };

   const cardContentBoxStyle = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      flexGrow: 1,
   };

   return (
      <Box sx={{ flexGrow: 1, m: 2, mx: "10%" }}>
         <Grid container spacing={2} justifyContent="center">
            {fakeData.slice(0, 3).map((data, index) => (
               <Grid item xs={12} sm={6} md={4} key={index}>
                  <AuthorCard
                     author={data.author}
                     avatar={data.avatar}
                     content={data.content}
                     videoTitle={data.video_title}
                     videoLink={data.video_links}
                     cardStyle={cardStyle}
                     textColor={textColor}
                     cardContentBoxStyle={cardContentBoxStyle}
                  />
               </Grid>
            ))}
         </Grid>
      </Box>
   );
};

export default HowToLearn;
