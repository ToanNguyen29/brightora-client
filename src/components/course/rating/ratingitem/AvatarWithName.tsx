import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

interface AvatarWithNameProps {
   name: string;
   textColor: string;
}

const AvatarWithName: React.FC<AvatarWithNameProps> = ({ name, textColor }) => {
   return (
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
         <Avatar sx={{ mr: 2, bgcolor: textColor }}>{name[0]}</Avatar>
         <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: textColor }}
         >
            {name}
         </Typography>
      </Box>
   );
};

export default AvatarWithName;
