import React from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface PriceSectionProps {
  price: number; // Discounted price
  discount: number; // Discount percentage
  textColor: string; // Text color for the price
}

const PriceSection: React.FC<PriceSectionProps> = ({
  price,
  discount,
  textColor,
}) => {
  const { t } = useTranslation();

  // Calculate the original price based on the discount
  const originalPrice = price / (1 - discount / 100);

  return (
    <Box>
      {/* Discounted Price */}
      <Box
        sx={{
          display: "flex",

          alignContent: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mr: 2,
            fontWeight: "bold",
            color: textColor,
            alignContent: "center",
            textAlign: "center",
          }}
        >
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(price)}
        </Typography>

        {discount !== 0 && (
          <Typography
            variant="h6"
            sx={{
              textDecoration: "line-through",
              color: "gray",
              alignContent: "center",
              textAlign: "center",
            }}
          >
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(originalPrice)}
          </Typography>
        )}
      </Box>
      {/* Discount Percentage */}
      {discount !== 0 && (
        <Typography variant="subtitle1" sx={{ color: "gray" }}>
          {discount}% {t("off")}
        </Typography>
      )}
    </Box>
  );
};

export default PriceSection;
