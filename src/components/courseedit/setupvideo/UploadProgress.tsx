// UploadProgress.tsx
import { LinearProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface UploadProgressProps {
   progress: number;
}

const UploadProgress: React.FC<UploadProgressProps> = ({ progress }) => {
   const { t } = useTranslation();
   return (
      <>
         <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ width: "100%", marginBottom: "16px" }}
         />
         <Typography variant="body2" color="textSecondary">
            {progress}% {t("completed")}
         </Typography>
      </>
   );
};

export default UploadProgress;
