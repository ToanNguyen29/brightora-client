import React from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  LinearProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import RatingList from "./RatingList"; // Không thay đổi props
import { IReview, IReviewDetail } from "../../../models/Course";

interface RatingModalProps {
  open: boolean;
  onClose: () => void;
  ratings: IReviewDetail[] | undefined;
  ratingStat: IReview | undefined;
  textColor: string;
  backgroundColor: string;
  headerBackgroundColor: string;
}

const RatingModal: React.FC<RatingModalProps> = ({
  open,
  onClose,
  ratings,
  ratingStat,
  textColor,
  backgroundColor,
  headerBackgroundColor,
}) => {
  const { t } = useTranslation();
  const stars = [5, 4, 3, 2, 1]; // Star rating levels in descending order

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
            maxHeight: "90vh",
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
          <Box
            sx={{
              display: "flex",
              gap: 4,
              alignItems: "flex-start",
            }}
          >
            {/* Rating Stats */}
            <Box
              sx={{
                flex: "1",
                minWidth: "300px",
              }}
            >
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

            {/* Rating List */}
            <Box
              sx={{
                flex: "3",
              }}
            >
              <RatingList
                ratings={ratings} // Không thay đổi props
                textColor={textColor}
                backgroundColor={backgroundColor}
                headerBackgroundColor={headerBackgroundColor}
                isGrid={false}
              />
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default RatingModal;
