import React, { useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import SearchBar from "../navbar/SearchBar";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Rating from "@mui/material/Rating";

import StarIcon from "@mui/icons-material/Star";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { getEnrollment } from "../../services/Enrollment";
import { useAuth } from "../../context/AuthContext";

const CourseEnrollmentList: React.FC = () => {
  const token = localStorage.getItem("token");
  const { userInfo } = useAuth();
  const { mode } = useThemeContext();
  const { t } = useTranslation();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(0);
  const [reviewText, setReviewText] = useState("");

  const handleRatingOpen = () => setRatingDialogOpen(true);
  const handleRatingClose = () => setRatingDialogOpen(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(event.target.value);

  useEffect(() => {
    if (!token || !userInfo._id) return;
    const fetchMyLearning = async () => {
      try {
        await getEnrollment(token).then((data) => {
          console.log("Enrollment", data.data);
        });
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchMyLearning();
  }, [token, userInfo._id]);

  return (
    <>
      <Box display="flex" alignItems="center" gap={2} mb={5}>
        <Box flex={7}>
          <FilterBar flex={7} />
        </Box>

        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        <Button variant="outlined" onClick={handleRatingOpen}>
          <StarIcon /> Rate
        </Button>

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
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={3}
            >
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
                console.log("Rating:", selectedRating);
                console.log("Review:", reviewText);
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
      </Box>
      {/* <CourseGrid courses={fakeData.courses} />; */}
    </>
  );
};

export default CourseEnrollmentList;
