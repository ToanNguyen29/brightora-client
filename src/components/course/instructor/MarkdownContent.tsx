import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownContentProps {
  markdownDescription: string; // Đổi tên prop thành markdownDescription
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({
  markdownDescription,
}) => {
  return <ReactMarkdown>{markdownDescription}</ReactMarkdown>;
};

export default MarkdownContent;
