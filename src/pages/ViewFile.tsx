import React, { useState, useEffect } from "react";
import { Container, Typography, CircularProgress, Box } from "@mui/material";
import { useParams } from "react-router-dom";

const GoogleDriveViewer: React.FC = () => {
   const { itemId, fileType } = useParams<{
      itemId: string;
      fileType: "pdf" | "video" | "image";
   }>();

   const [loading, setLoading] = useState(true);

   useEffect(() => {
      // Reset loading state when the item or fileType changes
      setLoading(true);
   }, [itemId, fileType]);

   // Add a fallback for invalid parameters
   if (!itemId || !fileType) {
      return <div>Invalid file ID or type</div>;
   }

   // Render file based on the type
   const renderFile = () => {
      const baseUrl = `https://drive.google.com/file/d/${itemId}/preview`;
      switch (fileType) {
         case "pdf":
            return (
               <iframe
                  src={baseUrl}
                  title="PDF Viewer"
                  width="100%"
                  height="600px"
                  onLoad={() => setLoading(false)}
                  style={{ border: "none" }}
               />
            );
         case "video":
            return (
               <video
                  controls
                  width="100%"
                  onLoadedData={() => setLoading(false)} // Triggers when video data is available
                  onLoadStart={() => setLoading(true)}
               >
                  <source src={baseUrl} type="video/mp4" />
                  Your browser does not support the video tag.
               </video>
            );
         case "image":
            return (
               <img
                  src={baseUrl}
                  alt={"Google Drive file"}
                  style={{ maxWidth: "100%", height: "auto" }}
                  onLoad={() => setLoading(false)} // Triggers when the image is fully loaded
               />
            );
         default:
            return <Typography>Unsupported file type</Typography>;
      }
   };

   return (
      <Container>
         <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
         >
            {loading && <CircularProgress />}
            {renderFile()}
         </Box>
      </Container>
   );
};

export default GoogleDriveViewer;
