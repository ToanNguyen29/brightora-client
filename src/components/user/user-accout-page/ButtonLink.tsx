import { Button, Stack } from "@mui/material";
import React from "react";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WebIcon from "@mui/icons-material/Web";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../theme/ThemeContext";

interface ButtonLinkProps {
  website_link: string | undefined;
  twitter_link: string | undefined;
  linkedin_link: string | undefined;
  facebook_link: string | undefined;
  youtube_link: string | undefined;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  website_link,
  twitter_link,
  linkedin_link,
  youtube_link,
  facebook_link,
}) => {
  const { t } = useTranslation();
  const { mode } = useThemeContext();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  return (
    <Stack spacing={2} sx={{ mt: 3 }}>
      <Button
        variant="outlined"
        sx={{
          backgroundColor: textColor,
          color: backgroundColor,
          width: 200,
          "&:hover": {
            backgroundColor: backgroundColor,
            color: textColor,
          },
        }}
        fullWidth
      >
        {t("send_message")}
      </Button>
      {website_link && (
        <Button
          variant="outlined"
          sx={{
            backgroundColor: backgroundColor,
            color: textColor,
            width: 200,
            "&:hover": {
              backgroundColor: textColor,
              color: backgroundColor,
            },
          }}
          startIcon={<WebIcon />}
          fullWidth
        >
          {t("website")}
        </Button>
      )}

      {linkedin_link && (
        <Button
          variant="outlined"
          sx={{
            backgroundColor: backgroundColor,
            color: textColor,
            width: 200,
            "&:hover": {
              backgroundColor: textColor,
              color: backgroundColor,
            },
          }}
          startIcon={<LinkedInIcon />}
          fullWidth
        >
          {t("linkedIn")}
        </Button>
      )}

      {twitter_link && (
        <Button
          variant="outlined"
          sx={{
            backgroundColor: backgroundColor,
            color: textColor,
            width: 200,
            "&:hover": {
              backgroundColor: textColor,
              color: backgroundColor,
            },
          }}
          startIcon={<XIcon />}
          fullWidth
        >
          {t("Twitter")}
        </Button>
      )}
    </Stack>
  );
};

export default ButtonLink;
