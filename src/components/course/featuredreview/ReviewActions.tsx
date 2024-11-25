import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

interface ReviewActionsProps {
   likes: number;
   dislikes: number;
   handleLike: () => void;
   handleDislike: () => void;
   textColor: string;
}

const ReviewActions: React.FC<ReviewActionsProps> = ({
   likes,
   dislikes,
   handleLike,
   handleDislike,
   textColor,
}) => {
   return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
         <IconButton
            onClick={handleLike}
            sx={{
               color: likes > 0 ? "primary.main" : textColor,
               "&:hover": { color: "primary.main" },
            }}
         >
            <ThumbUpIcon />
         </IconButton>
         <Typography sx={{ mr: 2 }}>{likes}</Typography>
         <IconButton
            onClick={handleDislike}
            sx={{
               color: dislikes > 0 ? "error.main" : textColor,
               "&:hover": { color: "error.main" },
            }}
         >
            <ThumbDownIcon />
         </IconButton>
         <Typography>{dislikes}</Typography>
      </Box>
   );
};

export default ReviewActions;
