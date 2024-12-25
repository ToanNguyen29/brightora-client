import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

import RatingStars from "./ratingitem/RatingStars";
import ContentText from "./ratingitem/ContentText";
import ActionButtons from "./ratingitem/ActionButtons";

interface RatingItemProps {
  name: string;
  photo?: string;
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
  photo,
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
        width: "100%",
        border: `1px solid ${headerBackgroundColor}`,
        backgroundColor: backgroundColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: isGrid ? "200px" : "auto", // Fixed height for grid layout
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar sx={{ mr: 2 }} src={photo || ""}>
          {!photo && name.charAt(0)}
        </Avatar>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: textColor }}
          >
            {name}
          </Typography>
          <RatingStars rating={rating} textColor={textColor} />
        </Box>
      </Box>
      {/* <AvatarWithName name={name} textColor={textColor} /> */}

      <ContentText content={content} textColor={textColor} isGrid={isGrid} />
      <Typography variant="caption" sx={{ color: "gray", mb: 2 }}>
        {time.slice(0, 10)}
      </Typography>
      {/* <ActionButtons textColor={textColor} /> */}
    </Box>
  );
};

export default RatingItem;
