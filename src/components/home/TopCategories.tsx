import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";

const TopCategories: React.FC = () => {
  const { mode } = useThemeContext();
  const { t } = useTranslation();
  const textColor = mode === "light" ? "black" : "white";

  const categories = [
    { name: "programming", image: "/categories/marketing.jpg" },
    { name: "data_science", image: "/categories/marketing.jpg" },
    { name: "web_development", image: "/categories/marketing.jpg" },
    { name: "cyber_security", image: "/categories/marketing.jpg" },
    { name: "cloud_computing", image: "/categories/marketing.jpg" },
    { name: "database_administration", image: "/categories/marketing.jpg" },
    { name: "devops", image: "/categories/marketing.jpg" },
    { name: "it_support", image: "/categories/marketing.jpg" },
  ];

  return (
    <Box sx={{ mx: "10%", my: "30px", flexDirection: "column" }}>
      <Typography
        variant="h4"
        sx={{
          color: textColor,
          fontFamily: "math",
          fontWeight: "bold",
          mb: 4,
        }}
      >
        {t("top_categories")}
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2, px: 2 }}>
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                justifyContent: "space-between",
                boxShadow: 3,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                height="150"
                image={category.image}
                alt={category.name}
                sx={{
                  borderRadius: "8px 8px 0 0",
                  objectFit: "cover",
                }}
              />
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f5f5f5",
                  flexGrow: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    color: textColor || "#333",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                >
                  {t(category.name)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TopCategories;
