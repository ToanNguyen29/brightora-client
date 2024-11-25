import React from "react";
import AppRoutes from "./routes";
import { ThemeContextProvider } from "./theme/ThemeContext";

const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <AppRoutes />
    </ThemeContextProvider>
  );
};

export default App;
