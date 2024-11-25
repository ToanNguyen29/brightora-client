import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import React from "react";

export enum Severity {
   success = "success",
   info = "info",
   warning = "warning",
   error = "error",
}

interface MessageProps {
   severity: Severity;
   message: string;
   note: string;
}

const Message: React.FC<MessageProps> = ({ severity, message, note }) => {
   return (
      <Alert severity={severity}>
         <AlertTitle>{message}</AlertTitle>
         {note}
      </Alert>
   );
};

export default Message;
