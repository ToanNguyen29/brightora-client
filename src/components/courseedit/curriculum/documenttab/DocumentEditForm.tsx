import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslation } from "react-i18next";
import RichTextBox from "../../../reused/RichTextBoxComponent";
import { useThemeContext } from "../../../../theme/ThemeContext";
import { IDocument } from "../../../../models/Course";
// import { saveDocument } from "../../../../services/LessonService";
import UploadFile from "../../../../services/AwsServices";
// import testUploadFile from "../../../../services/test";
import ProgressBox from "../ProgressBox";

interface DocumentEditFormProps {
  editDocument: IDocument;
  handleSave: (updateDocument: IDocument) => void;
}

const DocumentEditForm: React.FC<DocumentEditFormProps> = ({
  editDocument,
  handleSave,
}) => {
  const { t } = useTranslation();
  const { mode } = useThemeContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (editDocument) {
      setEditTitle(editDocument.title);
      setEditDescription(editDocument.description);
    } else {
      setEditTitle("");
      setEditDescription("");
    }
  }, [editDocument]);

  const buttonStyle = {
    fontSize: "14px",
    my: "5px",
    backgroundColor: mode === "dark" ? "white" : "black",
    color: mode === "dark" ? "black" : "white",
    padding: "10px 20px",
    fontWeight: "bold",
    ":hover": {
      backgroundColor: mode === "dark" ? "white" : "black",
    },
    minWidth: "200px",
  };

  const onSave = async () => {
    if (editDocument) {
      let file_id = "";
      if (selectedFile) {
        try {
          const fileExtension = selectedFile.type.split("/").pop();
          const s3_key = `documents/${new Date().getTime()}.${fileExtension}`;
          file_id = `https://brightora.s3.amazonaws.com/${s3_key}`;

          UploadFile(s3_key, selectedFile, setProgress, () => {
            const updatedDocument: IDocument = {
              title: editTitle,
              description: editDescription,
              file_url: file_id,
            };

            console.log(updatedDocument);
            setSelectedFile(null);

            handleSave(updatedDocument);
          });
        } catch (error) {
          console.error("File upload failed:", error);
        }
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <Box>
      <TextField
        label={t("Title")}
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        fullWidth
        margin="normal"
      />

      <RichTextBox
        text={editDescription}
        handleTextChange={(newText) => setEditDescription(newText)}
      />

      <Box display="flex" alignItems="center" mt={2}>
        <Button variant="outlined" component="label" sx={buttonStyle}>
          {t("Upload File")}
          <input
            type="file"
            hidden
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
          />
        </Button>

        {selectedFile && (
          <Typography sx={{ ml: 2 }}>
            {t("Selected File")}: {selectedFile.name}
          </Typography>
        )}
      </Box>
      {progress > 0 && <ProgressBox progress={progress} />}

      <Button sx={buttonStyle} startIcon={<SaveIcon />} onClick={onSave}>
        {t("Save")}
      </Button>
    </Box>
  );
};

export default DocumentEditForm;
