import React from "react";
import { Typography } from "@mui/material";

interface ContentTextProps {
   content: string;
   textColor: string;
   isGrid: boolean;
}

const ContentText: React.FC<ContentTextProps> = ({
   content,
   textColor,
   isGrid,
}) => {
   return (
      <Typography
         variant="body2"
         sx={{
            color: textColor,
            mb: 1,
            overflow: "hidden", // Hide overflow text
            textOverflow: "ellipsis", // Add ellipsis if text overflows
            display: "-webkit-box", // Display as a box for webkit
            WebkitLineClamp: isGrid ? 3 : "unset", // Limit to 3 lines if grid, otherwise unset
            WebkitBoxOrient: "vertical", // Set orientation to vertical
         }}
      >
         {content}
      </Typography>
   );
};

export default ContentText;
