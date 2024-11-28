import React, { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import RecomendCourseBox from "./RecomendCourseBox";
import { CategoryType } from "../../navbar/menu/categoriesItem";
import CourseListByType from "../../courseviewing/CourseListByType";

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
    { key: CategoryType.PROGRAMMING, label: t("programming") },
    { key: CategoryType.DATA_SCIENCE, label: t("data_science") },
    {
      key: CategoryType.WEB_DEVELOPMENT,
      label: t("web_development"),
    },
    { key: CategoryType.CYBER_SECURITY, label: t("cyber_security") },
    {
      key: CategoryType.CLOUD_COMPUTING,
      label: t("cloud_computing"),
    },
    {
      key: CategoryType.MACHINE_LEARNING,
      label: t("machine_learning"),
    },
  ];

  // Hàm lấy key của tab hiện tại
  const currentTabKey = tabData[tabIndex]?.key;

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
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

      <CourseListByType type={currentTabKey} />

      {tabData.map((tab, index) => (
        <TabPanel key={tab.key} value={tabIndex} index={index}>
          <RecomendCourseBox tabName={tab.label} />
        </TabPanel>
      ))}
    </Box>
  );
};

export default BasicTabs;
