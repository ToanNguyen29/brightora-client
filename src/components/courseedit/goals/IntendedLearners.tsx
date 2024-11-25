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
const IntendedLearners: React.FC<colorProps> = ({
   backgroundColor,
   textColor,
   value,
   name,
   handleChange,
}) => {
   const { t } = useTranslation();

   const handleAddLearner = () => {
      handleChange(name, [...value, ""]);
   };

   const handleLearnerChange = (index: number, valueUpdate: string) => {
      const updatedLearners = value;
      updatedLearners[index] = valueUpdate;
      handleChange(name, updatedLearners);
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
            {t("course.who")}
         </Typography>
         <Typography variant="h6">{t("course.write_des")}</Typography>

         {value.map((learner, index) => (
            <TextField
               key={index}
               value={learner}
               onChange={(e) => handleLearnerChange(index, e.target.value)}
               label={t("example.py_program")}
               sx={commonTextFieldStyles}
               variant="outlined"
            />
         ))}

         <Button
            onClick={handleAddLearner}
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
            <AddIcon />
            {t("add_more")}
         </Button>
      </Box>
   );
};

export default IntendedLearners;
