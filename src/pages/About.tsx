import React from "react";
import { Container, Typography, Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

const About: React.FC = () => {
   const { t } = useTranslation();

   return (
      <Container>
         {/* Page Title */}
         <Box sx={{ my: 4 }}>
            <Typography
               variant="h4"
               sx={{ fontWeight: "bold", textAlign: "center" }}
            >
               {t("about")}
            </Typography>
         </Box>

         {/* Mission Section */}
         <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
               {t("ourMission")}
            </Typography>
            <Typography variant="body1">
               At Course Shop, our mission is to provide high-quality,
               affordable education that empowers learners of all ages to gain
               new skills, advance their careers, and enrich their lives. We
               believe that knowledge should be accessible to everyone, and we
               work tirelessly to create a diverse selection of courses for
               every interest and goal.
            </Typography>
         </Box>

         {/* Why Choose Us Section */}
         <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
               {t("whyChooseUs")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
               Our platform provides numerous benefits that make learning easy,
               fun, and rewarding:
            </Typography>
            <ul>
               <li>
                  <Typography variant="body1">
                     Expert Instructors: Learn from industry experts with
                     real-world experience.
                  </Typography>
               </li>
               <li>
                  <Typography variant="body1">
                     Flexible Learning: Study at your own pace, from any device,
                     anytime.
                  </Typography>
               </li>
               <li>
                  <Typography variant="body1">
                     Affordable Prices: High-quality education doesn't need to
                     be expensive.
                  </Typography>
               </li>
               <li>
                  <Typography variant="body1">
                     Wide Range of Courses: Choose from hundreds of topics, from
                     tech to personal development.
                  </Typography>
               </li>
            </ul>
         </Box>

         {/* Our Courses Section */}
         <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
               {t("ourCourses")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
               We offer a broad range of courses, including:
            </Typography>
            <Grid container spacing={4}>
               {[
                  "Web Development",
                  "Digital Marketing",
                  "Graphic Design",
                  "Data Science",
                  "Photography",
               ].map((course, index) => (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                     <Box
                        sx={{
                           p: 3,
                           border: "1px solid #ddd",
                           borderRadius: 2,
                        }}
                     >
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                           {course}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                           Learn the ins and outs of {course.toLowerCase()} from
                           top industry experts. Perfect for beginners and
                           advanced learners alike.
                        </Typography>
                     </Box>
                  </Grid>
               ))}
            </Grid>
         </Box>

         {/* Testimonials Section */}
         <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
               {t("testimonials")}
            </Typography>
            <Box sx={{ p: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
               <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                  "Course Shop has completely changed my career trajectory. I
                  learned web development skills that landed me my dream job.
                  The flexibility of learning at my own pace made it so easy to
                  keep up with the lessons!" - Jane Doe
               </Typography>
            </Box>
            <Box
               sx={{
                  p: 3,
                  backgroundColor: "#f9f9f9",
                  borderRadius: 2,
                  mt: 3,
               }}
            >
               <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                  "The courses are incredibly well structured and easy to
                  follow. Plus, the instructors really know their stuff. I
                  highly recommend Course Shop!" - John Smith
               </Typography>
            </Box>
         </Box>

         {/* Our Values Section */}
         <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
               {t("ourValues")}
            </Typography>
            <Typography variant="body1">
               At Course Shop, we are driven by our core values:
            </Typography>
            <ul>
               <li>
                  <Typography variant="body1">
                     Accessibility: We believe that everyone should have access
                     to quality education.
                  </Typography>
               </li>
               <li>
                  <Typography variant="body1">
                     Innovation: We embrace new technology and continuously seek
                     better ways to deliver education.
                  </Typography>
               </li>
               <li>
                  <Typography variant="body1">
                     Integrity: We operate with transparency, honesty, and a
                     commitment to excellence.
                  </Typography>
               </li>
            </ul>
         </Box>

         {/* Contact Section */}
         <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
               {t("contact_us")}
            </Typography>
            <Typography variant="body1">
               If you have any questions or would like more information, feel
               free to reach out. We’d love to hear from you!
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
               Email: support@courseshop.com
            </Typography>
            <Typography variant="body1">Phone: +1 (123) 456-7890</Typography>
         </Box>
      </Container>
   );
};

export default About;
