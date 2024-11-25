import React from "react";
import { Typography, Box, Avatar, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import SchoolIcon from "@mui/icons-material/School";
import StatItem from "./StatItem"; // Import StatItem component
import { useTranslation } from "react-i18next";

interface InstructorInfoProps {
  name: string;
  headline: string;
  secondaryTextColor: string;
  iconBackgroundColor: string;
  rating: number;
  reviews: number;
  students: number;
  courses: number;
  avt: string;
}

const InstructorInfo: React.FC<InstructorInfoProps> = ({
  name,
  headline,
  secondaryTextColor,
  iconBackgroundColor,
  rating,
  reviews,
  students,
  courses,
  avt,
}) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ color: secondaryTextColor, mb: 2 }}>
        {headline}
      </Typography>
      <Grid container spacing={3} alignItems="center">
        {/* Avatar */}
        <Grid item xs={12} md={2}>
          <Avatar
            src={avt}
            sx={{
              width: 80,
              height: 80,
              bgcolor: secondaryTextColor,
            }}
          >
            {name[0]}
          </Avatar>
        </Grid>
        <Grid item xs={12} md={10}>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={3}>
              <StatItem
                icon={<StarIcon color="primary" />}
                value={rating}
                label={t("rating")}
                secondaryTextColor={secondaryTextColor}
                iconBackgroundColor={iconBackgroundColor}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <StatItem
                icon={<RateReviewIcon color="secondary" />}
                value={reviews.toLocaleString()}
                label={t("reviews")}
                secondaryTextColor={secondaryTextColor}
                iconBackgroundColor={iconBackgroundColor}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <StatItem
                icon={<PeopleIcon color="action" />}
                value={students.toLocaleString()}
                label={t("students")}
                secondaryTextColor={secondaryTextColor}
                iconBackgroundColor={iconBackgroundColor}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <StatItem
                icon={<SchoolIcon color="primary" />}
                value={courses}
                label={t("courses")}
                secondaryTextColor={secondaryTextColor}
                iconBackgroundColor={iconBackgroundColor}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InstructorInfo;
