import React, { useState } from "react";
import { Box, Typography, CircularProgress, Popover } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";

interface ProgressEnrollmentProps {
  completed: number;
  total: number;
}

const ProgressEnrollment: React.FC<ProgressEnrollmentProps> = ({
  completed,
  total,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const progress = Math.round((completed / total) * 100);

  const { mode } = useThemeContext();
  const { t } = useTranslation();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setIsExpanded(!isExpanded);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setIsExpanded(false);
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          mr: 1,
        }}
      >
        <CircularProgress
          variant="determinate"
          value={100}
          size={40}
          thickness={4}
          sx={{
            color: "#9e9e9e",
            position: "absolute",
          }}
        />

        <CircularProgress
          variant="determinate"
          value={progress}
          size={40}
          thickness={4}
        />

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <EmojiEventsIcon
            sx={{
              fontSize: 20,
              color: progress === 100 ? "#4caf50" : "#6d6d6d",
            }}
          />
        </Box>
      </Box>

      <Box
        onClick={handleToggle}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "bold",
            color: backgroundColor,
          }}
        >
          {t("your_progress")}
        </Typography>
        {isExpanded ? (
          <ExpandLessIcon
            sx={{ fontSize: 20, ml: 0.5, color: backgroundColor }}
          />
        ) : (
          <ExpandMoreIcon
            sx={{ fontSize: 20, ml: 0.5, color: backgroundColor }}
          />
        )}
      </Box>

      <Popover
        id="progress-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        disableRestoreFocus
      >
        <Box sx={{ p: 2, backgroundColor }}>
          <Typography sx={{ fontWeight: "bold", color: textColor }}>
            {completed} of {total} complete.
          </Typography>
          <Typography sx={{ color: "gray" }}>
            {t("Finish course to get your certificate")}
          </Typography>
        </Box>
      </Popover>
    </Box>
  );
};

export default ProgressEnrollment;
