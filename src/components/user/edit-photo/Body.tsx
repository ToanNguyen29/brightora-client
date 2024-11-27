import { Box } from "@mui/material";
import React, { useState } from "react";
import { useThemeContext } from "../../../theme/ThemeContext";
import ImagePreview from "./ImagePreview";
import ImageUploadButton from "./ImageUploadButton";
import SaveComponent from "../intercommunity/SaveComponent";
// import { updatePhoto } from "../../../services/UserServices";
import { useAuth } from "../../../context/AuthContext";
// import { UpdateUserResponse } from "../../../models/User";

const EditPhotoBody: React.FC = () => {
  const { mode } = useThemeContext();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);

  const { setUserInfo } = useAuth();

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

  const handleSave = async () => {
    //  const formData = new FormData();
    //  if (photo) {
    //    formData.append("photo", photo);
    //  }
    //  try {
    //    const res = await updatePhoto(formData);
    //    if (res.status <= 304) {
    //      setUserInfo((res as UpdateUserResponse).data);
    //    } else {
    //      console.log("toan photo", res);
    //      // alert(`Error: ${res as Error}.message`);
    //    }
    //  } catch (error) {
    //    console.log(error);
    //  }
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
        px: "50px",
      }}
    >
      <ImagePreview selectedImage={selectedImage} />
      <ImageUploadButton
        imageName={imageName}
        handleImageUpload={handleImageUpload}
        mode={mode}
      />
      <SaveComponent handleSave={handleSave} />
    </Box>
  );
};

export default EditPhotoBody;
