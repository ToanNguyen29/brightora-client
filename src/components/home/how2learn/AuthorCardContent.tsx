import React from "react";
import { CardContent, Typography, Link, IconButton } from "@mui/material";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

interface AuthorCardContentProps {
   content: string;
   videoTitle: string;
   videoLink: string;
   textColor: string;
   cardContentBoxStyle: object;
}

const AuthorCardContent: React.FC<AuthorCardContentProps> = ({
   content,
   videoTitle,
   videoLink,
   textColor,
   cardContentBoxStyle,
}) => {
   return (
      <CardContent sx={cardContentBoxStyle}>
         <Typography
            variant="h6"
            color={textColor}
            gutterBottom
            sx={{ textAlign: "justify" }}
         >
            {content}
         </Typography>

         <Link
            href={videoLink}
            underline="hover"
            color={textColor}
            sx={{
               display: "flex",
               alignItems: "center",
               justifyContent: "flex-start",
               mt: "auto",
               borderTop: "1px solid",
               width: "100%",
               pt: 1,
            }}
         >
            <IconButton
               size="large"
               sx={{
                  color: textColor,
                  fontSize: "2rem",
               }}
            >
               <VideoLibraryIcon />
            </IconButton>
            {videoTitle}
         </Link>
      </CardContent>
   );
};

export default AuthorCardContent;
