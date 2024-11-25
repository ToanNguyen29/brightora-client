import React from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface PriceSectionProps {
  price: number;
  textColor: string;
}

const PriceSection: React.FC<PriceSectionProps> = ({ price, textColor }) => {
  const { t } = useTranslation();

  return (
    <Typography variant="h6" sx={{ fontWeight: "bold", color: textColor }}>
      {t("price")}: ${price.toFixed(3)}
    </Typography>
  );
};

export default PriceSection;
