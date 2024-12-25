import { Box, LinearProgress, Typography } from "@mui/material";
import { useState } from "react";
import FileUploadButton from "./FileUploadButton";
import { updateLessonVideo } from "../../../../services/LessonService";
import AutoCloseAlert from "../../../reused/Alert";
import UploadFile from "../../../../services/AwsServices";
// import testUploadFile from "../../../../services/test";
import ProgressBox from "../ProgressBox";
import { createTranscript } from "../../../../services/TranscriptService";

interface UploadVideoProps {
  video_url: string | undefined;
  id: string;
  setSelectedTab: (tab: number) => void;
  reloadData: () => void;
}

const UploadVideo: React.FC<UploadVideoProps> = ({
  video_url,
  id,
  setSelectedTab,
  reloadData,
}) => {
  console.log("video", video_url, id);
  const token = localStorage.getItem("token");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
    }
  };

  const updateVideo = async () => {
    if (!file || !id) {
      return;
    }
    setProgress(0);

    const url = `https://brightora.s3.amazonaws.com/lesson_video/${id}.mp4`;
    const s3_key = `lesson_video/${id}.mp4`;

    UploadFile(s3_key, file, setProgress, async () => {
      await updateLessonVideo(token, id, url).then((data) => {
        if (data.status <= 305) {
          reloadData();
          setSelectedTab(0);
        }
      });

      await createTranscript(token, url).then((data) => {
        console.log("Transcript created:", data);
      });
    });
  };

  return (
    <Box minHeight={"200px"} width={"100%"}>
      <AutoCloseAlert
        severity="success"
        message="Upload video completed."
        open={alertOpen}
        onClose={handleCloseAlert}
      />{" "}
      <FileUploadButton
        onFileChange={handleFileChange}
        id={video_url}
        updateVideo={updateVideo}
      />{" "}
      {progress > 0 && (
        <Box
          width={"500px"}
          mx="auto"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <ProgressBox progress={progress} />
        </Box>
      )}
    </Box>
  );
};

export default UploadVideo;
