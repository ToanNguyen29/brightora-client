import {
   Box,
   Button,
   FormControl,
   MenuItem,
   Select,
   Typography,
} from "@mui/material";
import { t } from "i18next";
import React from "react";
import { useThemeContext } from "../../../theme/ThemeContext";
import AddIcon from "@mui/icons-material/Add";

interface DropdownSectionProps {
   label: string;
   name: string;
   value: string[] | undefined;
   options: string[];
   handleSelectChange: (name: string, value: any) => void;
}

const DropdownSection: React.FC<DropdownSectionProps> = ({
   label,
   name,
   value,
   options,
   handleSelectChange,
}) => {
   const { mode } = useThemeContext();
   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";
   const handleAdd = () => {
      if (!value) {
         handleSelectChange(name, [""]);
         return;
      }
      handleSelectChange(name, [...value, ""]);
   };

   const handleChange = (name: string, valueUpdate: string, index: number) => {
      if (!value) {
         handleSelectChange(name, [""]);
         return;
      }
      const updatedValues = [...value];
      updatedValues[index] = valueUpdate;
      handleSelectChange(name, updatedValues);
   };
   return (
      <Box width={"30%"}>
         <Typography variant="h6" fontWeight={"bold"}>
            {label}
         </Typography>
         {value &&
            value.map((v, index) => (
               <FormControl fullWidth key={index}>
                  <Select
                     name={name}
                     value={v}
                     onChange={(e) =>
                        handleChange(e.target.name, e.target.value, index)
                     }
                     displayEmpty
                     sx={{
                        width: "100%",
                        fontSize: "20px",
                        mb: "10px",
                        borderColor: textColor,
                        backgroundColor: backgroundColor,
                     }}
                  >
                     <MenuItem value="" disabled>
                        Select {label}
                     </MenuItem>
                     {options.map((option) => (
                        <MenuItem key={option} value={option}>
                           {option}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            ))}
         <Button
            onClick={handleAdd}
            sx={{
               width: "fit-content",
               backgroundColor: backgroundColor,
               color: textColor,
               "&:hover": {
                  backgroundColor: backgroundColor,
               },
               marginBottom: "20px",
            }}
         >
            <AddIcon sx={{ mr: 1 }} />
            {t("add_more")}
         </Button>
      </Box>
   );
};

export default DropdownSection;
