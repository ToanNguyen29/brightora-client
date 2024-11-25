import React from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface InstructorHeaderProps {
  backgroundColor: string;
  textColor: string;
}

const InstructorHeader: React.FC<InstructorHeaderProps> = ({
  backgroundColor,
  textColor,
}) => {
  const { t } = useTranslation();

  return (
    <Typography
      variant="h6"
      sx={{
        fontWeight: "bold",
        mb: 2,
        textAlign: "center",
        backgroundColor: backgroundColor,
        padding: "8px",
        borderRadius: "4px",
        textColor: textColor,
      }}
    >
      {t("instructor")}
    </Typography>
  );
};

export default InstructorHeader;
