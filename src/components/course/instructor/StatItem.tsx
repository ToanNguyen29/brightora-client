import React from "react";
import { Typography, Box } from "@mui/material";

interface StatItemProps {
   icon: JSX.Element;
   value: string | number;
   label: string;
   secondaryTextColor: string;
   iconBackgroundColor: string;
}

const StatItem: React.FC<StatItemProps> = ({
   icon,
   value,
   label,
   secondaryTextColor,
   iconBackgroundColor,
}) => (
   <Box
      sx={{
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
         textAlign: "center",
      }}
   >
      <Box
         sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 48,
            height: 48,
            borderRadius: "50%",
            backgroundColor: iconBackgroundColor,
            mb: 1,
         }}
      >
         {icon}
      </Box>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
         {value}
      </Typography>
      <Typography variant="body2" sx={{ color: secondaryTextColor }}>
         {label}
      </Typography>
   </Box>
);

export default StatItem;
