import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useThemeContext } from "../../../theme/ThemeContext";
import ImagePreview from "./ImagePreview";
import ImageUploadButton from "./ImageUploadButton";
import SaveComponent from "../intercommunity/SaveComponent";
import { updatePhoto } from "../../../services/UserServices";
import UploadFile from "../../../services/AwsServices"; // Đảm bảo bạn có hàm này cho việc upload ảnh
import { useAuth } from "../../../context/AuthContext";

const EditPhotoBody: React.FC = () => {
  const token = localStorage.getItem("token");
  const { userInfo, setUserInfo } = useAuth();
  const { mode } = useThemeContext();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null); // Để lưu trữ lỗi nếu có

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setImageName(file.name);
        setPhoto(file);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!userInfo.photo) return;
    setSelectedImage(userInfo.photo);
  }, [userInfo]);

  const handleSave = async () => {
    if (!photo) {
      setError("No photo selected.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);

    try {
      const name = Date.now();
      const s3Key = `userPhoto/${name}.png`;
      const url = `https://brightora.s3.amazonaws.com/userPhoto/${name}.png`;

      UploadFile(s3Key, photo, setProgress, async () => {
        await updatePhoto(token, url).then((data) => {
          console.log(data);
          if (data.status < -305) {
            setUserInfo(data.data.data);
          }
        });
        setError(null);
      });
    } catch (error) {
      setError("Error uploading photo.");
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        height: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        width: "100%",
        mt: "50px",
        // px: "50px",
      }}
    >
      <ImagePreview selectedImage={selectedImage} />
      <ImageUploadButton
        imageName={imageName}
        handleImageUpload={handleImageUpload}
        mode={mode}
      />

      {/* Hiển thị lỗi nếu có */}
      {error && (
        <Box sx={{ color: "red", mt: 2 }}>
          <Typography variant="body2">{error}</Typography>
        </Box>
      )}

      {/* Hiển thị tiến trình tải lên */}
      {progress > 0 && progress < 100 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">Uploading: {progress}%</Typography>
        </Box>
      )}

      <SaveComponent handleSave={handleSave} />
    </Box>
  );
};

export default EditPhotoBody;
