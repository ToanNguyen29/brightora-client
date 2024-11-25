import React, { useEffect } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

interface AutoCloseAlertProps {
   severity: "success" | "info" | "warning" | "error";
   message: string;
   open: boolean;
   onClose: () => void;
}

const AutoCloseAlert: React.FC<AutoCloseAlertProps> = ({
   severity,
   message,
   open,
   onClose,
}) => {
   useEffect(() => {
      if (open) {
         const timer = setTimeout(() => {
            onClose(); // Close the alert after 3 seconds
         }, 3000);

         return () => {
            clearTimeout(timer);
         };
      }
   }, [open, onClose]);

   return (
      <Snackbar
         open={open}
         autoHideDuration={3000}
         onClose={onClose}
         anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
         <Alert
            onClose={onClose}
            severity={severity}
            variant="filled"
            style={{
               minHeight: "50px",
            }}
         >
            {message}
         </Alert>
      </Snackbar>
   );
};

export default AutoCloseAlert;
