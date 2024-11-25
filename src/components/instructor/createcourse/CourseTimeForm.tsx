import {
   Box,
   Typography,
   RadioGroup,
   FormControlLabel,
   Radio,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../theme/ThemeContext";

type CourseTitleFormProps = {
   time: number;
   handleTimeChange: (value: string) => void;
};

const items = [
   { time: 2, content: "I'm very busy right now (0-2 hours)" },
   { time: 4, content: "I'm a bit less busy (2-4 hours)" },
   { time: 6, content: "I have lots of flexibility (5+ hours)" },
   { time: 24, content: "I'm open to any amount of time" },
];

const CourseTitleForm: React.FC<CourseTitleFormProps> = ({
   time,
   handleTimeChange,
}) => {
   const { t } = useTranslation();
   const { mode } = useThemeContext();

   const backgroundColor = mode === "dark" ? "#000000" : "#ffffff";
   const textColor = mode === "dark" ? "#ffffff" : "#000000";

   return (
      <Box
         sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 5,
            width: "100%",
            backgroundColor,
            color: textColor,
         }}
      >
         <Typography variant="h4" gutterBottom fontFamily={"monospace"}>
            {t("How much time can you spend creating your course per week?")}
         </Typography>

         <Typography variant="h6" gutterBottom mb={5}>
            {t(
               "There's no wrong answer. We can help you achieve your goals even if you don't have much time.",
            )}
         </Typography>

         <RadioGroup
            value={time}
            onChange={(e) => handleTimeChange(e.target.value)}
            sx={{ width: "100%", maxWidth: 600 }}
         >
            {items.map((item) => (
               <Box
                  key={item.time}
                  sx={{
                     border: "1px solid",
                     borderColor: textColor,
                     borderRadius: "8px",
                     padding: 1,
                     marginBottom: 2,
                  }}
               >
                  <FormControlLabel
                     value={item.time.toString()}
                     control={<Radio sx={{ color: textColor }} />}
                     label={t(item.content)}
                     sx={{
                        color: textColor,
                        width: "100%",
                     }}
                  />
               </Box>
            ))}
         </RadioGroup>
      </Box>
   );
};

export default CourseTitleForm;
