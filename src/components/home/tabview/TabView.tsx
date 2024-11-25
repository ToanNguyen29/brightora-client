import React, { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import RecomendCourseBox from "./RecomendCourseBox";

interface TabPanelProps {
   children: React.ReactNode;
   index: number;
   value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
   <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ padding: "24px" }} // Using inline style for simple values
   >
      {value === index && <Box>{children}</Box>}
   </div>
);

const generateAccessibilityProps = (index: number) => ({
   id: `simple-tab-${index}`,
   "aria-controls": `simple-tabpanel-${index}`,
});

const BasicTabs: React.FC = () => {
   const [tabIndex, setTabIndex] = useState(0);
   const { t } = useTranslation();

   const tabData = [
      { key: "python", label: t("python") },
      { key: "microsoft_excel", label: t("microsoft_excel") },
      { key: "web_development", label: t("web_development") },
      { key: "js", label: t("js") },
      { key: "data_science", label: t("data_science") },
      { key: "amz_aws", label: t("amz_aws") },
      { key: "drawing", label: t("drawing") },
   ];

   return (
      <Box sx={{ width: "100%" }}>
         <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
               value={tabIndex}
               onChange={(event, newValue) => setTabIndex(newValue)}
               aria-label="basic tabs example"
            >
               {tabData.map((tab, index) => (
                  <Tab
                     key={tab.key}
                     label={
                        <Typography variant="body1" fontWeight="bold">
                           {tab.label}
                        </Typography>
                     }
                     {...generateAccessibilityProps(index)}
                  />
               ))}
            </Tabs>
         </Box>

         {tabData.map((tab, index) => (
            <TabPanel key={tab.key} value={tabIndex} index={index}>
               <RecomendCourseBox tabName={tab.key} />
            </TabPanel>
         ))}
      </Box>
   );
};

export default BasicTabs;
