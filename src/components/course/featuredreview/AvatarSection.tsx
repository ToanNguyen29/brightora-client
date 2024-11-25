import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { useTranslation } from "react-i18next";

interface AvatarSectionProps {
   name: string;
   courses: number;
   reviews: number;
   avt: string;
   secondaryTextColor: string;
}

const AvatarSection: React.FC<AvatarSectionProps> = ({
   name,
   courses,
   reviews,
   avt,
   secondaryTextColor,
}) => {
   const { t } = useTranslation();

   return (
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
         <Avatar
            src={avt}
            alt={name}
            sx={{ width: 56, height: 56, bgcolor: secondaryTextColor }}
         />
         <Box sx={{ ml: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
               {name}
            </Typography>
            <Typography variant="body2" sx={{ color: secondaryTextColor }}>
               {courses} {t("courses")} · {reviews} {t("reviews")}
            </Typography>
         </Box>
      </Box>
   );
};

export default AvatarSection;
