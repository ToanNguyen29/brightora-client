import React, { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../theme/ThemeContext";
import PreviewBox from "./PreviewBox";
import UploadInput from "./UploadInput";
import GenerateImageModal from "./GenerateImageModal";
import { generateThumnail } from "../../../services/CourseService";
import { GenerateThumbnailForm } from "../../../models/Course";

interface ImageUploadSectionProps {
  label: string;
  name: string;
  id: string | undefined;
  handleFileUpload: (name: string, file: File) => void;
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
  label,
  name,
  id,
  handleFileUpload,
}) => {
  const { t } = useTranslation();
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const { mode } = useThemeContext();
  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";
  const token = localStorage.getItem("token");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setPreviewSrc(fileUrl);
      handleFileUpload(name, file);
    }
  };

  const handleModalClose = () => setOpenModal(false);
  async function urlToFile(url: string, fileName: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    const metadata = {
      type: "image/png",
    };

    return new File([blob], fileName, metadata);
  }

  const handleGenerateImage = async (
    courseTitle: string,
    description: string,
    imageStyle: string
  ) => {
    if (!token) {
      return;
    }
    console.log("Generating image with:", {
      courseTitle,
      description,
      imageStyle,
    });
    setOpenModal(false);
    const formData: GenerateThumbnailForm = {
      course_title: courseTitle,
      description: description,
      style: imageStyle,
    };
    await generateThumnail(formData, token).then((data) => {
      console.log(data);
      setPreviewSrc(data.data.image_url);
      handleFileUpload(name, data.data.image_url);
    });
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="center" my={2}>
      <PreviewBox
        previewSrc={previewSrc}
        defaultSrc={id}
        label={label}
        mode={mode}
        openModal={openModal}
      />
      <Box width="50%" display="flex" flexDirection="column">
        <UploadInput name={name} onFileChange={handleFileChange} />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, color: backgroundColor, bgcolor: textColor }}
          onClick={() => setOpenModal(true)}
        >
          {t("generate_image")}
        </Button>
      </Box>
      <GenerateImageModal
        open={openModal}
        onClose={handleModalClose}
        onConfirm={handleGenerateImage}
      />
    </Box>
  );
};

export default ImageUploadSection;
