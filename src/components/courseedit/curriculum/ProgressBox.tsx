import { Box, Typography, LinearProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../theme/ThemeContext";
interface ProgressBoxProps {
   progress: number;
}
const ProgressBox: React.FC<ProgressBoxProps> = ({ progress }) => {
   const { t } = useTranslation();
   const { mode } = useThemeContext();

   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";
   return (
      <Box
         sx={{
            backgroundColor,
            borderRadius: "8px",
            textAlign: "center",
            width: "100%",
         }}
      >
         <Typography
            variant="h6"
            sx={{
               color: textColor,
               marginBottom: "8px",
            }}
         >
            {t("Progress")}: {progress}%
         </Typography>
         <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
               height: "10px",
               borderRadius: "5px",
               backgroundColor: "#e0e0e0",
               "& .MuiLinearProgress-bar": {
                  backgroundColor: textColor,
               },
            }}
         />
      </Box>
   );
};

export default ProgressBox;
