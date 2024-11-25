import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";
import "./i18n"; // Import the i18n configuration

const root = ReactDOM.createRoot(
   document.getElementById("root") as HTMLElement,
);

root.render(
   <>
      <CssBaseline />
      <App />
   </>,
);
