import React, { useState } from "react";
import { Box, Paper, useTheme, useMediaQuery } from "@mui/material";
import PriceSection from "./rightbox/PriceSection";
import CourseIncludes from "./rightbox/CourseIncludes";
import CouponSection from "./rightbox/CouponSection";
import ActionButtons from "./rightbox/ActionButtons";
import { useThemeContext } from "../../theme/ThemeContext";
import ReactPlayer from "react-player";

const fakeData = {
  price: 2199000,
  include: {
    duration: 73.5,
    exercisesNumber: 63,
    articles: 54,
    downloadable_resources: 133,
  },
};

interface RightBoxProps {
  id: string | undefined;
  is_cart: boolean | undefined;
  is_review: any;
  in_wishlist: boolean | undefined;
  is_enroll: boolean | undefined;
  price: number;
  discount: number;
  handleCheckout: any;
  promotional_video: string;
}

const RightBox: React.FC<RightBoxProps> = ({
  id,
  is_cart,
  is_review,
  is_enroll,
  in_wishlist,
  price,
  discount,
  handleCheckout,
  promotional_video,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { mode } = useThemeContext();
  const [coupon, setCoupon] = useState("");

  const handleCouponChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(event.target.value);
  };

  const handleUseCoupon = () => {
    alert(`Coupon applied: ${coupon}`);
  };

  const backgroundColor = mode === "light" ? "white" : "black";
  const textColor = mode === "light" ? "black" : "white";

  return (
    <Box
      sx={{
        flex: "0 0 30%",
        position: isSmallScreen ? "relative" : "sticky",
        top: 0,
        alignSelf: "flex-start",
        mt: "10px",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          backgroundColor: backgroundColor,
          minHeight: "200px",
          borderRadius: "8px",
          boxShadow: theme.shadows[5],
          color: textColor,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "80%",
            position: "relative",
          }}
        >
          <ReactPlayer
            url={promotional_video}
            controls
            width="100%"
            height="100%"
          />
        </Box>
        <PriceSection price={price} discount={discount} textColor={textColor} />
        <CourseIncludes include={fakeData.include} textColor={textColor} />
        <ActionButtons
          id={id}
          is_cart={is_cart}
          is_enroll={is_enroll}
          in_wishlist={in_wishlist}
          is_review={is_review}
          handleCheckout={handleCheckout}
          textColor={textColor}
          backgroundColor={backgroundColor}
        />
        <CouponSection
          coupon={coupon}
          onCouponChange={handleCouponChange}
          onUseCoupon={handleUseCoupon}
          textColor={textColor}
          backgroundColor={backgroundColor}
        />
      </Paper>
    </Box>
  );
};

export default RightBox;
