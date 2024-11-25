import React, {
   createContext,
   useMemo,
   useState,
   useEffect,
   useContext,
   ReactNode,
} from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { PaletteMode } from "@mui/material";

interface ThemeContextProps {
   toggleTheme: () => void;
   mode: PaletteMode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = () => {
   const context = useContext(ThemeContext);
   if (!context) {
      throw new Error("useThemeContext must be used within a ThemeProvider");
   }
   return context;
};

export const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({
   children,
}) => {
   const [mode, setMode] = useState<PaletteMode>(() => {
      const savedMode = localStorage.getItem("themeMode") as PaletteMode;
      return savedMode || "light";
   });

   useEffect(() => {
      localStorage.setItem("themeMode", mode);
   }, [mode]);

   const toggleTheme = () => {
      setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
   };

   const theme = useMemo(
      () =>
         createTheme({
            palette: {
               mode,
            },
         }),
      [mode],
   );

   return (
      <ThemeContext.Provider value={{ toggleTheme, mode }}>
         <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
         </ThemeProvider>
      </ThemeContext.Provider>
   );
};
