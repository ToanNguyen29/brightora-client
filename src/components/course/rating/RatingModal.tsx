import React from "react";
import { Modal, Backdrop, Fade, Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import RatingList from "./RatingList";
import { IReviewDetail } from "../../../models/Course";

interface RatingModalProps {
  open: boolean;
  onClose: () => void;
  ratings: IReviewDetail[] | undefined;
  textColor: string;
  backgroundColor: string;
  headerBackgroundColor: string;
}

const RatingModal: React.FC<RatingModalProps> = ({
  open,
  onClose,
  ratings,
  textColor,
  backgroundColor,
  headerBackgroundColor,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      sx={{ width: "60%", p: 3, display: "flex", mx: "20%" }}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
            bgcolor: backgroundColor,
            borderRadius: "12px",
            boxShadow: 24,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 2,
              textAlign: "center",
              backgroundColor: headerBackgroundColor,
              padding: "8px",
              borderRadius: "4px",
              color: textColor,
            }}
          >
            {t("all_ratings")}
          </Typography>

          <RatingList
            ratings={ratings}
            textColor={textColor}
            backgroundColor={backgroundColor}
            headerBackgroundColor={headerBackgroundColor}
            isGrid={false} // Single item per row
          />

          <Button
            variant="outlined"
            sx={{
              mt: 2,
              mb: 2,
              display: "block",
              mx: "auto",
              borderColor: textColor,
              color: textColor,
            }}
            onClick={onClose}
          >
            {t("close")}
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default RatingModal;
