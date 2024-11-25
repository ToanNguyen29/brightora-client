// FileUploadButton.tsx
import { Grid, Typography, IconButton, Box } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

interface FileUploadButtonProps {
   file: File | null;
   onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
   videoDuration: number | null;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
   file,
   onFileChange,
   videoDuration,
}) => {
   const { t } = useTranslation();

   return (
      <Grid container direction="column" spacing={2} alignItems="center" mb={5}>
         <Grid item>
            <Box
               sx={{
                  border: "2px dashed #ccc",
                  padding: "16px",
                  borderRadius: "8px",
                  textAlign: "center",
                  width: "100%",
                  cursor: "pointer", // Optional: Add pointer cursor on hover for better UX
                  minWidth: "300px",
                  mt: "20px",
               }}
            >
               <IconButton
                  color="primary"
                  aria-label="upload file"
                  component="label"
               >
                  <CloudUpload sx={{ fontSize: 48 }} />
                  <input
                     type="file"
                     onChange={onFileChange}
                     hidden
                     accept="video/*"
                  />
               </IconButton>
               <Typography variant="body1" color="textSecondary">
                  {t("click_to_upload")}
               </Typography>
            </Box>
         </Grid>

         {file && (
            <Grid item>
               <Typography variant="body2" color="textSecondary">
                  {t("upload_file")}: {file.name}
               </Typography>
               <Typography variant="body2" color="textSecondary">
                  {t("duration")}: {videoDuration}
               </Typography>
            </Grid>
         )}
      </Grid>
   );
};

export default FileUploadButton;
