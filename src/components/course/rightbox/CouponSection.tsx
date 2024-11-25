import React from "react";
import { TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface CouponSectionProps {
   coupon: string;
   onCouponChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   onUseCoupon: () => void;
   textColor: string;
   backgroundColor: string;
}

const CouponSection: React.FC<CouponSectionProps> = ({
   coupon,
   onCouponChange,
   onUseCoupon,
   textColor,
   backgroundColor,
}) => {
   const { t } = useTranslation();

   return (
      <>
         <TextField
            label={t("enter_coupon")}
            variant="outlined"
            value={coupon}
            onChange={onCouponChange}
            fullWidth
            sx={{
               mt: 3,
               input: {
                  color: textColor,
                  backgroundColor: backgroundColor,
               },
               "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                     borderColor: textColor,
                  },
                  "&:hover fieldset": {
                     borderColor: textColor,
                  },
               },
            }}
         />
         <Button
            variant="contained"
            sx={{
               backgroundColor: textColor,
               color: backgroundColor,
               mt: 1,
               "&:hover": {
                  backgroundColor: backgroundColor,
                  color: textColor,
               },
            }}
            onClick={onUseCoupon}
            fullWidth
         >
            {t("use_coupon")}
         </Button>
      </>
   );
};

export default CouponSection;
