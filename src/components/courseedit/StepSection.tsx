import React from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import { useThemeContext } from "../../theme/ThemeContext";

interface StepSectionProps {
   tabs: any[];
   value: number;
   handleChange: (event: React.SyntheticEvent, newValue: number) => void;
   labelBoxStyles: React.CSSProperties;
   isStepDone: (path: string) => boolean;
}

function a11yProps(index: number) {
   return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
   };
}

export const StepSection: React.FC<StepSectionProps> = ({
   tabs,
   value,
   handleChange,
   labelBoxStyles,
   isStepDone,
}) => {
   const { mode } = useThemeContext();

   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";
   const tabStyles = {
      minHeight: "10px",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      fontSize: 16,
      color: textColor,
      p: 0.5,
   };
   const iconStyles = {
      fontSize: 30,
      mr: 2,
      color: textColor,
      bgcolor: backgroundColor,
   };

   return (
      <>
         <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            sx={{ width: "100%", borderColor: "divider" }}
         >
            {tabs.map((tab, index) =>
               tab.title ? (
                  <Typography
                     variant="h6"
                     sx={{ my: "10px", color: textColor }}
                  >
                     {tab.title}
                  </Typography> // Skip rendering if the tab has a title
               ) : (
                  <Tab
                     key={index}
                     icon={
                        isStepDone(tab.path) ? (
                           <CheckCircleIcon sx={iconStyles} />
                        ) : (
                           <RadioButtonUncheckedIcon sx={iconStyles} />
                        )
                     }
                     label={<Box sx={labelBoxStyles}>{tab.label}</Box>}
                     {...a11yProps(index)}
                     sx={tabStyles}
                  />
               ),
            )}
         </Tabs>
      </>
   );
};
