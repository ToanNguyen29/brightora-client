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
      { name: "design", image: "/categories/marketing.jpg" },
      { name: "development", image: "/categories/marketing.jpg" },
      { name: "marketing", image: "/categories/marketing.jpg" },
      { name: "it_software", image: "/categories/marketing.jpg" },
      { name: "personal_development", image: "/categories/marketing.jpg" },
      { name: "business", image: "/categories/marketing.jpg" },
      { name: "photography", image: "/categories/marketing.jpg" },
      { name: "music", image: "/categories/marketing.jpg" },
   ];

   return (
      <Box sx={{ mx: "10%", my: "30px" }}>
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
         <Grid container spacing={2}>
            {categories.map((category, index) => (
               <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card sx={{ height: "100%" }}>
                     <CardMedia
                        component="img"
                        height="150"
                        image={category.image}
                        alt={category.name}
                     />
                     <CardContent>
                        <Typography
                           variant="h6"
                           sx={{
                              textAlign: "center",
                              color: textColor,
                              fontWeight: "bold",
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
