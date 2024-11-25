import React from "react";

import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../theme/ThemeContext";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const tabPaths = [
   "/my-course/learning/",
   "/my-course/lists/",
   "/my-course/wishlist/",
   "/my-course/archived/",
   "/my-course/learning-tools/",
];

const tabNames = [
   "all_course",
   "my_lists",
   "wishlist",
   "archived",
   "learning_tools",
];

function a11yProps(index: number) {
   return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
   };
}

const MyLearningPage: React.FC = () => {
   const { t } = useTranslation();
   const { mode } = useThemeContext();

   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#ffffff" : "#000000";

   const navigate = useNavigate();
   const location = useLocation();
   const currentPathIndex = tabPaths.indexOf(location.pathname);
   const [value, setValue] = React.useState(
      currentPathIndex !== -1 ? currentPathIndex : 0,
   );

   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
      navigate(tabPaths[newValue]);
   };

   return (
      <Box
         sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            borderColor: backgroundColor,
            backgroundColor: "transparent",
         }}
      >
         <Box
            sx={{
               borderColor: "divider",
               width: "100%",
               px: "25%",
               backgroundColor: mode === "dark" ? "white" : "black",
            }}
         >
            <Typography
               variant="h3"
               fontWeight={"bold"}
               sx={{ mt: 10, mb: 5, color: textColor }}
            >
               {t("my_learning")}
            </Typography>
            <Tabs
               value={value}
               onChange={handleChange}
               aria-label="basic tabs example"
            >
               <Tab
                  icon={
                     <Typography fontWeight={"bold"} sx={{ color: textColor }}>
                        {t(`${tabNames[0]}`)}
                     </Typography>
                  }
                  {...a11yProps(0)}
               />
               <Tab
                  icon={
                     <Typography fontWeight={"bold"} sx={{ color: textColor }}>
                        {t(`${tabNames[1]}`)}
                     </Typography>
                  }
                  {...a11yProps(1)}
               />
               <Tab
                  icon={
                     <Typography fontWeight={"bold"} sx={{ color: textColor }}>
                        {t(`${tabNames[2]}`)}
                     </Typography>
                  }
                  {...a11yProps(2)}
               />
               <Tab
                  icon={
                     <Typography fontWeight={"bold"} sx={{ color: textColor }}>
                        {t(`${tabNames[3]}`)}
                     </Typography>
                  }
                  {...a11yProps(3)}
               />
               <Tab
                  icon={
                     <Typography fontWeight={"bold"} sx={{ color: textColor }}>
                        {t(`${tabNames[4]}`)}
                     </Typography>
                  }
                  {...a11yProps(4)}
               />
            </Tabs>
         </Box>
         <Box
            sx={{
               flexGrow: 1,
               p: 3,
               margin: "10px",
               borderRadius: "8px",
               px: "25%",
            }}
         >
            <Outlet />
         </Box>
      </Box>
   );
};

export default MyLearningPage;
