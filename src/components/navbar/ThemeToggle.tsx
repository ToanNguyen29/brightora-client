// ThemeToggle.tsx
import React from "react";
import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

interface ThemeToggleProps {
   mode: string;
   toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ mode, toggleTheme }) => {
   return (
      <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: 2 }}>
         {mode === "dark" ? (
            <Brightness7 />
         ) : (
            <Brightness4 sx={{ color: "black" }} />
         )}
      </IconButton>
   );
};

export default ThemeToggle;
