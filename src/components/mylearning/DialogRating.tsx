import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import Rating from "@mui/material/Rating";
import {
  createReview,
  getReviewMeOfCourse,
  updateReview,
} from "../../services/ReviewService";

interface DialogRatingProps {
  ratingDialogOpen: boolean;
  courseId: string;
  setRatingDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DialogRating: React.FC<DialogRatingProps> = ({
  ratingDialogOpen,
  courseId,
  setRatingDialogOpen,
}) => {
  const token = localStorage.getItem("token");
  const { mode } = useThemeContext();
  const { t } = useTranslation();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";
  const [isRated, setIsRated] = useState<boolean>(false);
  const [reviewId, setReviewId] = useState("");
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState("");

  const handleSubmitRating = async () => {
    console.log("submit rating");
    try {
      await createReview(token, courseId, selectedRating, reviewText).then(
        (data) => {
          console.log(data.data);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateRating = async () => {
    console.log("Update rating");

    try {
      await updateReview(token, reviewId, selectedRating, reviewText).then(
        (data) => {
          console.log(data.data);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  //   const handleDeleteRating = async () => {};

  const handleRatingClose = () => setRatingDialogOpen(false);

  useEffect(() => {
    const fetchReviewMeOfCourse = async () => {
      await getReviewMeOfCourse(token, courseId).then((data) => {
        console.log(data);
        if (data.status <= 305) {
          setSelectedRating(data.data.data.rating);
          setReviewText(data.data.data.comment);
          setReviewId(data.data.data._id);
          setIsRated(true);
        }
      });
    };
    fetchReviewMeOfCourse();
  }, [token, courseId]);

  return (
    <Dialog
      open={ratingDialogOpen}
      onClose={handleRatingClose}
      maxWidth="md" // Increased width
      fullWidth // Makes it fill up the width
      sx={{
        "& .MuiDialog-paper": {
          minWidth: "700px", // Sets a custom min width
          borderRadius: 3, // Rounds the corners
          p: 3, // Adds padding
          bgcolor: backgroundColor,
        },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: backgroundColor,
          color: textColor,
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        {t("Select Rating")}
      </DialogTitle>

      <DialogContent sx={{ bgcolor: backgroundColor }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Rating
            value={selectedRating}
            onChange={(event, newValue) => setSelectedRating(newValue)}
            size="large"
            sx={{ mb: 2 }}
          />
        </Box>
        <TextField
          label={t("Review")}
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          sx={{
            mt: 2,
            bgcolor: backgroundColor,
            color: textColor,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: textColor },
              "&:hover fieldset": { borderColor: textColor },
              "&.Mui-focused fieldset": { borderColor: textColor },
            },
          }}
          InputProps={{
            style: { color: textColor },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ bgcolor: backgroundColor, p: 2 }}>
        <Button
          onClick={handleRatingClose}
          sx={{ color: "error.main", fontWeight: "bold" }}
        >
          {t("Cancel")}
        </Button>
        <Button
          onClick={() => {
            if (!isRated) handleSubmitRating();
            else handleUpdateRating();
            handleRatingClose();
          }}
          color="primary"
          variant="contained"
          sx={{ fontWeight: "bold", ml: 2 }}
        >
          {t("Submit")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogRating;
