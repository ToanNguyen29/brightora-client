import React from "react";
import { Stack, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ArticleIcon from "@mui/icons-material/Article";
import DownloadIcon from "@mui/icons-material/Download";
import DevicesIcon from "@mui/icons-material/Devices";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { useTranslation } from "react-i18next";

interface CourseIncludesProps {
   include: {
      duration: number;
      exercisesNumber: number;
      articles: number;
      downloadable_resources: number;
   };
   textColor: string;
}

const CourseIncludes: React.FC<CourseIncludesProps> = ({
   include,
   textColor,
}) => {
   const { t } = useTranslation();

   return (
      <>
         <Typography
            variant="body2"
            sx={{ mt: 2, fontWeight: "bold", color: textColor }}
         >
            {t("course_includes")}:
         </Typography>

         <Stack spacing={1} sx={{ mt: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
               <AccessTimeIcon fontSize="small" sx={{ color: textColor }} />
               <Typography variant="body2" sx={{ color: textColor }}>
                  {include.duration} {t("hours_on_demand_video")}
               </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
               <AssignmentIcon fontSize="small" sx={{ color: textColor }} />
               <Typography variant="body2" sx={{ color: textColor }}>
                  {include.exercisesNumber} {t("exercises")}
               </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
               <ArticleIcon fontSize="small" sx={{ color: textColor }} />
               <Typography variant="body2" sx={{ color: textColor }}>
                  {include.articles} {t("articles")}
               </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
               <DownloadIcon fontSize="small" sx={{ color: textColor }} />
               <Typography variant="body2" sx={{ color: textColor }}>
                  {include.downloadable_resources} {t("downloadable_resources")}
               </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
               <DevicesIcon fontSize="small" sx={{ color: textColor }} />
               <Typography variant="body2" sx={{ color: textColor }}>
                  {t("access_on_mobile_and_tv")}
               </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
               <LockOpenIcon fontSize="small" sx={{ color: textColor }} />
               <Typography variant="body2" sx={{ color: textColor }}>
                  {t("full_lifetime_access")}
               </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
               <WorkspacePremiumIcon
                  fontSize="small"
                  sx={{ color: textColor }}
               />
               <Typography variant="body2" sx={{ color: textColor }}>
                  {t("certificate_of_completion")}
               </Typography>
            </Stack>
         </Stack>
      </>
   );
};

export default CourseIncludes;
