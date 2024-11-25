import React from "react";
import { Box } from "@mui/material";

const LeftPanel: React.FC = () => {
  const src = `/official-login.jpg`; // Use the src you need for the background

  return (
    <Box
      sx={{
        width: "923px",
        height: "710px",
        backgroundImage: `url(${src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "8px 0 0 8px",
      }}
    />
  );
};

export default LeftPanel;
