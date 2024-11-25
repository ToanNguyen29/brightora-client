import React, { useState } from "react";
import { Box } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles
import "./customQuillStyles.css"; // Import your custom CSS

const RichTextBox: React.FC = () => {
   const [text, setText] = useState<string>("");

   const handleTextChange = (value: string) => {
      setText(value);
   };

   return (
      <Box
         sx={{
            width: "100%",
            borderRadius: 1,
            mt: "10px",
         }}
      >
         <ReactQuill
            value={text}
            onChange={handleTextChange}
            modules={{
               toolbar: [
                  ["bold", "italic"], // Only bold and italics
               ],
            }}
            formats={[
               "bold",
               "italic", // Only support bold and italics
            ]}
            style={{
               maxWidth: "100%",
               wordWrap: "break-word",
            }}
         />
      </Box>
   );
};

export default RichTextBox;
