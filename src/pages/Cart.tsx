import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../theme/ThemeContext";
import CartItem from "../components/cart/ItemCart";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mode } = useThemeContext();

  const { cart, quantity } = useCart();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  const handleCheckout = async () => {
    if (cart?.cart) {
      const updatedCourses = cart?.cart.map((item) => {
        const { created_at, ...rest } = item;
        return rest;
      });
      navigate("/checkout", {
        state: { courses: updatedCourses.map((item) => item.course) },
      });
    }
  };

  const totalPrice =
    cart?.cart.reduce((sum, item) => sum + item.course.price, 0) || 0;

  return (
    <Box sx={{ width: "80%", mx: "auto", px: "10%", minHeight: "90vh" }}>
      <Typography
        variant="h3"
        fontWeight={"bold"}
        sx={{ mt: 6, mb: 1.5, color: textColor }}
      >
        {t("shopping_cart")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          p: 2,
          width: "100%",
        }}
      >
        <Box sx={{ pt: 3, pr: 3, width: "100%", mr: 3 }}>
          <Typography
            variant="h6"
            sx={{
              ml: 1.5,
              mb: 1,
              color: textColor,
              borderBottom: "1px solid",
              fontWeight: "bold",
            }}
          >
            {`${quantity} Course in Cart`}
          </Typography>
          {cart &&
            cart.cart.map((item) => (
              <CartItem
                key={item.course._id}
                id={item.course._id}
                updated_at={item.course.updated_at}
                title={item.course.title}
                price={item.course.price}
                rating={item.course.review.average_rating}
                numberRating={item.course.review.total_reviews}
                thumbnail={item.course.thumbnail}
                owner_name={`${item.course.owner.first_name} ${item.course.owner.last_name}`}
              />
            ))}
        </Box>

        <Box
          sx={{
            // flex: 3,
            p: 3,
            // borderBottom: "1px solid",
            borderColor: mode === "light" ? "#ccc" : "#555",
            borderRadius: "8px",
            backgroundColor: backgroundColor,
            color: textColor,
            maxHeight: "fit-content",
            width: "100%",
            maxWidth: "25%",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: textColor, mb: 2, fontWeight: "bold" }}
          >
            {t("total")}
          </Typography>
          <Typography
            variant="h3"
            sx={{ color: textColor, fontWeight: "bold", mb: 3 }}
          >
            ${totalPrice.toFixed(3) || (0.0).toFixed(3)}
          </Typography>

          <Button
            onClick={handleCheckout}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: textColor,
              color: backgroundColor,
            }}
          >
            {t("checkout")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CartPage;
