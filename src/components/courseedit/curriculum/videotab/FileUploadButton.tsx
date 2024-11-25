import { Grid, Typography, IconButton, Box, Button } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../../theme/ThemeContext";

interface FileUploadButtonProps {
   onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
   id: string | undefined;
   updateVideo: () => void;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
   onFileChange,
   id,
   updateVideo,
}) => {
   const { t } = useTranslation();
   const [previewSrc, setPreviewSrc] = useState<string | null>(null);
   const { mode } = useThemeContext();

   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
         const file = event.target.files[0];
         const fileUrl = URL.createObjectURL(file);
         setPreviewSrc(fileUrl);
         onFileChange(event);
      }
   };
   const styleButton = {
      fontSize: "12px",
      mx: "5px",
      backgroundColor: mode === "dark" ? "white" : "black",
      color: mode === "dark" ? "black" : "white",
      padding: "10px 20px",
      fontWeight: "bold",
      ":hover": {
         backgroundColor: mode === "dark" ? "white" : "black",
      },
   };

   return (
      <Grid container direction="column" spacing={2} alignItems="center" mb={5}>
         {previewSrc ? (
            <Grid item>
               <Box
                  sx={{
                     border: "1px solid #ccc",
                     borderRadius: "8px",
                     overflow: "hidden",
                     mt: "20px",
                  }}
               >
                  <video
                     src={previewSrc}
                     controls
                     width={"500px"}
                     height={"300px"}
                  />
               </Box>
            </Grid>
         ) : (
            id && (
               <Grid item>
                  <Box
                     sx={{
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        overflow: "hidden",
                        mt: "20px",
                     }}
                  >
                     <iframe
                        title="Video Preview"
                        src={id}
                        width={"500px"}
                        height={"300px"}
                        allow="autoplay"
                     />
                  </Box>
               </Grid>
            )
         )}

         {previewSrc && (
            <Grid item>
               <Button
                  variant="outlined"
                  onClick={() => setPreviewSrc(null)}
                  sx={styleButton}
               >
                  {t("removePreview")}
               </Button>
               <Button
                  variant="outlined"
                  onClick={updateVideo}
                  sx={styleButton}
               >
                  {t("uploadVideo")}
               </Button>
            </Grid>
         )}
         <Grid item>
            <Box
               sx={{
                  border: "2px dashed #ccc",
                  padding: "16px",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                  minWidth: "500px",
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
                     onChange={handleFileChange}
                     hidden
                     accept="video/*"
                  />
               </IconButton>
               <Typography variant="body1" color="textSecondary">
                  {t("click_to_upload")}
               </Typography>
            </Box>
         </Grid>
      </Grid>
   );
};

export default FileUploadButton;
