import React from "react";
import { Box, IconButton } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

interface ActionButtonsProps {
   textColor: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ textColor }) => {
   return (
      <Box
         sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: "auto",
         }}
      >
         <IconButton>
            <ThumbUpAltIcon sx={{ color: textColor }} />
         </IconButton>
         <IconButton>
            <ThumbDownAltIcon sx={{ color: textColor }} />
         </IconButton>
      </Box>
   );
};

export default ActionButtons;
