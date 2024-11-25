import { Box, Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
interface colorProps {
   backgroundColor: string;
   textColor: string;
   name: string;
   value: string[];
   handleChange: (name: string, value: string[]) => void;
}

const LearningObjectives: React.FC<colorProps> = ({
   backgroundColor,
   textColor,
   value,
   name,
   handleChange,
}) => {
   const { t } = useTranslation();

   const handleAddField = () => {
      handleChange(name, [...value, ""]);
   };

   const handleInputChange = (index: number, valueUpdate: string) => {
      let updatedObjectives = value;
      updatedObjectives[index] = valueUpdate;
      handleChange(name, updatedObjectives);
   };

   const commonTextFieldStyles = {
      width: "60%",
      mt: "20px",
      borderRadius: 5,
      fontSize: "20px",
   };

   return (
      <Box
         mx={"20px"}
         display={"flex"}
         flexDirection={"column"}
         mt={5}
         maxWidth={"90%"}
      >
         <Typography variant="h6" fontWeight={"bold"}>
            {t("create_course.what_learn")}
         </Typography>
         <Typography variant="h6">{t("course.help_enter")}</Typography>

         {value.map((objective, index) => (
            <TextField
               key={index}
               value={objective}
               onChange={(e) => handleInputChange(index, e.target.value)}
               label={t("create_course.enter_objective")}
               sx={commonTextFieldStyles}
               variant="outlined"
            />
         ))}

         <Button
            onClick={handleAddField}
            sx={{
               width: "fit-content",
               mt: "20px",
               backgroundColor: backgroundColor,
               color: textColor,
               "&:hover": {
                  backgroundColor: backgroundColor,
               },
            }}
         >
            <AddIcon sx={{ mr: 1 }} />
            {t("add_more")}
         </Button>
      </Box>
   );
};

export default LearningObjectives;
