import React from "react";
import { CardHeader, Avatar, Typography } from "@mui/material";

interface AuthorCardHeaderProps {
   author: string;
   avatar: string;
   textColor: string;
}

const AuthorCardHeader: React.FC<AuthorCardHeaderProps> = ({
   author,
   avatar,
   textColor,
}) => {
   return (
      <CardHeader
         avatar={<Avatar alt={author} src={avatar} />}
         title={
            <Typography variant="h6" color={textColor}>
               {author}
            </Typography>
         }
         sx={{
            ".MuiCardHeader-content": {
               overflow: "hidden",
            },
         }}
      />
   );
};

export default AuthorCardHeader;
