import React from "react";
import { Box, Typography } from "@mui/material";
import AvatarWithName from "./ratingitem/AvatarWithName";
import RatingStars from "./ratingitem/RatingStars";
import ContentText from "./ratingitem/ContentText";
import ActionButtons from "./ratingitem/ActionButtons";

interface RatingItemProps {
   name: string;
   rating: number;
   content: string;
   time: string;
   textColor: string;
   backgroundColor: string;
   headerBackgroundColor: string;
   isGrid: boolean;
}

const RatingItem: React.FC<RatingItemProps> = ({
   name,
   rating,
   content,
   time,
   textColor,
   backgroundColor,
   headerBackgroundColor,
   isGrid,
}) => {
   return (
      <Box
         sx={{
            mb: 2,
            p: 2,
            borderRadius: "8px",
            border: `1px solid ${headerBackgroundColor}`,
            backgroundColor: backgroundColor,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: isGrid ? "260px" : "auto", // Fixed height for grid layout
         }}
      >
         <AvatarWithName name={name} textColor={textColor} />
         <RatingStars rating={rating} textColor={textColor} />
         <ContentText content={content} textColor={textColor} isGrid={isGrid} />
         <Typography variant="caption" sx={{ color: "gray", mb: 2 }}>
            {time}
         </Typography>
         <ActionButtons textColor={textColor} />
      </Box>
   );
};

export default RatingItem;
