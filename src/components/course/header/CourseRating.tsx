import React from "react";
import { Grid, Rating, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useThemeContext } from "../../../theme/ThemeContext";

interface CourseRatingProps {
   rating: number;
   numberRating: number;
}

const CourseRating: React.FC<CourseRatingProps> = ({
   rating,
   numberRating,
}) => {
   const { mode } = useThemeContext();
   const textColor = mode === "light" ? "black" : "white";
   const fontFamily = "system-ui";

   return (
      <Grid container spacing={2} alignItems="center">
         <Grid item>
            <Rating
               name="read-only"
               value={rating}
               precision={0.1}
               readOnly
               icon={<StarIcon fontSize="inherit" />}
               sx={{ color: "#FFD700", fontFamily: fontFamily }} // Gold color for stars
            />
         </Grid>
         <Grid item>
            <Typography fontSize="small" sx={{ color: textColor }}>
               {rating} ({numberRating.toLocaleString()} ratings)
            </Typography>
         </Grid>
      </Grid>
   );
};

export default CourseRating;
