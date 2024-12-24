import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles
import "./customQuillStyles.css"; // Import your custom CSS
import { htmlToMarkdown, markdownToHtml } from "./Parser";

interface RichTextBoxProps {
  text: string | undefined;
  handleTextChange: (text: string) => void;
}

const ForwardedReactQuill = React.forwardRef<
  ReactQuill,
  ReactQuill.ReactQuillProps
>((props, ref) => <ReactQuill ref={ref} {...props} />);

const RichTextBox: React.FC<RichTextBoxProps> = ({
  text,
  handleTextChange,
}) => {
  const [value, setValue] = useState<string>("");
  const reactQuillRef = useRef<ReactQuill>(null);
  const isInternalChangeRef = useRef(false);

  useEffect(() => {
    if (!isInternalChangeRef.current) {
      const updatedValue = markdownToHtml(text || "");
      setValue(updatedValue);
    }
    isInternalChangeRef.current = false;
  }, [text]);

  const onChange = (content: string) => {
    isInternalChangeRef.current = true;
    setValue(content);
    const markdownText = htmlToMarkdown(content).trim();
    handleTextChange(markdownText);
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 1,
        mt: "10px",
        mb: "20px",
        height: "100%",
      }}
    >
      <ForwardedReactQuill
        ref={reactQuillRef}
        value={value}
        onChange={onChange}
        modules={{
          toolbar: [
            ["bold", "italic"],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
          clipboard: { matchVisual: false },
        }}
        formats={["bold", "italic", "list", "bullet"]}
      />
    </Box>
  );
};

export default RichTextBox;
