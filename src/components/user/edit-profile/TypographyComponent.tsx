import React from "react";
import { Typography } from "@mui/material";

interface TypographyComponentProps {
   text: string;
}

const TypographyComponent: React.FC<TypographyComponentProps> = ({ text }) => {
   const commonTypographyStyles = {
      mt: "5px",
      fontSize: "16px",
   };

   return <Typography sx={commonTypographyStyles}>{text}</Typography>;
};

export default TypographyComponent;
