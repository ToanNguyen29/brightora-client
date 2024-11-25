import { useState } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ReactMarkdown from "react-markdown";

interface DescriptionProps {
  description: string;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
  const { mode } = useThemeContext();
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState<boolean>(false);
  const isLongDescription = description.length > 500;

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";
  const headerBackgroundColor = mode === "light" ? "#f0f0f0" : "#333333";

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <Box
      sx={{
        display: "flex",
        // flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: backgroundColor,
        mb: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          //  maxWidth: 800,
          padding: 2,
          borderRadius: 2,
          backgroundColor: backgroundColor,
          color: textColor,
          position: "relative", // For positioning the gradient
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            backgroundColor: headerBackgroundColor,
            padding: "8px",
            borderRadius: "4px",
            mb: 3,
          }}
        >
          {t("description")}
        </Typography>

        <Box
          sx={{
            position: "relative",
            maxHeight: showMore ? "none" : "200px",
            overflow: "hidden",
            transition: "max-height 0.3s ease",
          }}
        >
          <ReactMarkdown>{description}</ReactMarkdown>

          {!showMore && (
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "100px",
                background: `linear-gradient(to bottom, rgba(255, 255, 255, 0), ${
                  mode === "light" ? "#ffffff" : "#000000"
                })`,
              }}
            />
          )}
        </Box>

        {isLongDescription && (
          <Button
            onClick={handleShowMore}
            sx={{
              mt: showMore ? 2 : 0,
              alignSelf: "center",
              textTransform: "none", // Disable uppercase text
              color: textColor, // Set color to match textColor
              fontWeight: "bold",
            }}
            startIcon={
              showMore ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
            }
          >
            {showMore ? t("show_less") : t("show_more")}
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default Description;
