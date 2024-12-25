import React, { useEffect, useState } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  LinearProgress,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import RatingList from "./RatingList"; // Không thay đổi props
import { IReview, IReviewDetail } from "../../../models/Course";
import { getReviewByCourse } from "../../../services/ReviewService";

interface RatingModalProps {
  open: boolean;
  onClose: () => void;
  courseId: string;
  ratingStat: IReview | undefined;
  textColor: string;
  backgroundColor: string;
  headerBackgroundColor: string;
}

const RatingModal: React.FC<RatingModalProps> = ({
  open,
  onClose,
  courseId,
  ratingStat,
  textColor,
  backgroundColor,
  headerBackgroundColor,
}) => {
  const { t } = useTranslation();
  const stars = [5, 4, 3, 2, 1];
  const page_size = 5;
  const [page_number, setPageNumber] = useState(1);
  const [reviewsOfCourse, setReviewOfCourse] = useState<IReviewDetail[]>([]);
  const [totalReviews, setTotalReviews] = useState<number>(0);

  useEffect(() => {
    if (!courseId || !open) return;

    const fetchReview = async () => {
      try {
        const data = await getReviewByCourse(courseId, page_number, page_size);
        console.log("getReviewByCourse", data);
        if (data.status <= 305) {
          setReviewOfCourse((prevReviews) => [
            ...prevReviews,
            ...data.data.data,
          ]);
          setTotalReviews(data.data.total_items);
        }
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };

    fetchReview();
  }, [courseId, page_number, open]);

  const handleShowMore = () => {
    setPageNumber(page_number + 1);
  };

  return (
    <Modal
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
            top: "10%",
            left: "50%",
            transform: "translate(-50%, 0)",
            width: "80%",
            maxWidth: "1000px",
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
            maxHeight: "70vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ textAlign: "left" }}
            >
              {ratingStat?.average_rating.toFixed(1) || 0} course rating •{" "}
              {ratingStat?.total_reviews || 0} ratings
            </Typography>
            <Typography
              variant="h6"
              sx={{ cursor: "pointer", color: "text.secondary" }}
              onClick={onClose}
            >
              ✕
            </Typography>
          </Box>

          {/* Main Content */}
          <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
            {/* Rating Stats */}
            <Box sx={{ flex: "1", minWidth: "300px" }}>
              {stars.map((star, index) => {
                const starCount = ratingStat?.star[`${star}_star`] || 0;
                const percentage = ratingStat?.total_reviews
                  ? (starCount / ratingStat.total_reviews) * 100
                  : 0;

                return (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <Typography
                      sx={{
                        width: "25px",
                        fontWeight: "bold",
                        color: "text.primary",
                      }}
                    >
                      {star}★
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={percentage}
                      sx={{
                        height: 8,
                        borderRadius: 2,
                        flex: 1,
                        mx: 2,
                        backgroundColor: "#f0f0f0",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#f5c518",
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        width: "50px",
                        textAlign: "right",
                        color: "text.secondary",
                      }}
                    >
                      {Math.round(percentage)}%
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            <Box sx={{ flex: "3" }}>
              <RatingList
                ratings={reviewsOfCourse}
                textColor={textColor}
                backgroundColor={backgroundColor}
                headerBackgroundColor={headerBackgroundColor}
                isGrid={false}
              />
            </Box>
          </Box>

          {/* Show More Button */}
          {reviewsOfCourse.length < totalReviews && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Button variant="outlined" onClick={handleShowMore}>
                {t("Show More")}
              </Button>
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default RatingModal;
