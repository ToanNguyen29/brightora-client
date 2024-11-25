import { Box, Typography, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../theme/ThemeContext";

type CourseTitleFormProps = {
   title: string;
   handleTitleChange: (value: string) => void;
};

const CourseTitleForm: React.FC<CourseTitleFormProps> = ({
   title,
   handleTitleChange,
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
            {t("create_course.how_title")}
         </Typography>

         <Typography variant="h6" gutterBottom mb={10}>
            {t("create_course.change_later")}
         </Typography>

         <TextField
            label={t("example.py_js")}
            variant="outlined"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            fullWidth
            sx={{ mt: 2, maxWidth: 600 }}
            InputProps={{
               style: {
                  color: textColor,
               },
            }}
            InputLabelProps={{
               style: {
                  color: textColor,
               },
            }}
         />
      </Box>
   );
};

export default CourseTitleForm;
