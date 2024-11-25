import { Box, Typography, Autocomplete, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../theme/ThemeContext";
import { categories } from "../../data";

type CourseCategoryProps = {
   category: string[];
   handleCategoryChange: (value: string[]) => void;
};

const CourseCategory: React.FC<CourseCategoryProps> = ({
   category,
   handleCategoryChange,
}) => {
   const { t } = useTranslation();
   const { mode } = useThemeContext();

   const backgroundColor = mode === "dark" ? "#000000" : "#ffffff";
   const textColor = mode === "dark" ? "#ffffff" : "#000000";

   const handleSelect = (value: string | null) => {
      if (value) {
         console.log([value]);
         handleCategoryChange([value]);
      }
   };

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
            {t("What category best fits the knowledge you'll share?")}
         </Typography>

         <Typography variant="h6" gutterBottom mb={10}>
            {t(
               "If you're not sure about the right category, you can change it later.",
            )}
         </Typography>

         <Autocomplete
            options={categories}
            value={category[0]}
            onChange={(event, newValue) => handleSelect(newValue)}
            renderInput={(params) => (
               <TextField
                  {...params}
                  label={t("choose_category")}
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2, maxWidth: 600 }}
                  InputProps={{
                     ...params.InputProps,
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
            )}
            sx={{ width: "100%", maxWidth: 600 }}
         />
      </Box>
   );
};

export default CourseCategory;
