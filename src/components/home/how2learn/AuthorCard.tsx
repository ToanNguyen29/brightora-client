import React from "react";
import { Card } from "@mui/material";
import AuthorCardHeader from "./AuthorCardHeader";
import AuthorCardContent from "./AuthorCardContent";

interface AuthorCardProps {
   author: string;
   avatar: string;
   content: string;
   videoTitle: string;
   videoLink: string;
   cardStyle: object;
   textColor: string;
   cardContentBoxStyle: object;
}

const AuthorCard: React.FC<AuthorCardProps> = ({
   author,
   avatar,
   content,
   videoTitle,
   videoLink,
   cardStyle,
   textColor,
   cardContentBoxStyle,
}) => {
   return (
      <Card sx={cardStyle}>
         <AuthorCardHeader
            author={author}
            avatar={avatar}
            textColor={textColor}
         />
         <AuthorCardContent
            content={content}
            videoTitle={videoTitle}
            videoLink={videoLink}
            textColor={textColor}
            cardContentBoxStyle={cardContentBoxStyle}
         />
      </Card>
   );
};

export default AuthorCard;
