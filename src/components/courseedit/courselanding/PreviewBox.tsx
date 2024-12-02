import React, { useState } from "react";
import { Box, CircularProgress } from "@mui/material";

interface PreviewBoxProps {
  previewSrc: string | null;
  defaultSrc: string | undefined;
  label: string;
  mode: string;
  openModal: boolean;
}

const PreviewBox: React.FC<PreviewBoxProps> = ({
  previewSrc,
  defaultSrc,
  label,
  mode,
  openModal,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  const handleImageLoad = () => {
    setLoading(false);
  };

  React.useEffect(() => {
    if (openModal) {
      setLoading(true); // Reset loading when modal opens
    }
  }, [openModal]);

  return (
    <Box
      width="50%"
      height="300px"
      mr={2}
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="relative"
      sx={{
        border: `1px solid ${textColor}`,
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: backgroundColor,
      }}
    >
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {previewSrc ? (
        <img
          src={previewSrc}
          alt={label}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: loading ? "none" : "block",
          }}
          onLoad={handleImageLoad}
        />
      ) : (
        defaultSrc && (
          <img
            src={defaultSrc}
            alt={label}
            style={{
              width: "100%",
              height: "100%",
              display: loading ? "none" : "block",
            }}
            onLoad={handleImageLoad}
          />
        )
      )}
    </Box>
  );
};

export default PreviewBox;
