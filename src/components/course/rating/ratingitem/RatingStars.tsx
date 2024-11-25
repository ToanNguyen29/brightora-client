import React from "react";
import { Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

interface RatingStarsProps {
   rating: number;
   textColor: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, textColor }) => {
   return (
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
         {Array.from({ length: 5 }, (_, i) => (
            <StarIcon
               key={i}
               sx={{
                  color: i < Math.round(rating) ? "#FFD700" : textColor,
                  mr: 0.5,
               }}
            />
         ))}
      </Box>
   );
};

export default RatingStars;
