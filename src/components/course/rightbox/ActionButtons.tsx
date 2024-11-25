import React from "react";
import { Button, Stack } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PaymentIcon from "@mui/icons-material/Payment";
import { useTranslation } from "react-i18next";
import { addItemToCartMe } from "../../../services/CartService";
import { useCart } from "../../../context/CartContext";
import { useNavigate, useParams } from "react-router-dom";
import { IAddItemCartResponse } from "../../../models/Cart";

import { PayPalProvider } from "../../payment/paypal/PaypalProvider";
import PayPalButtonComponent from "../../payment/paypal/PaypalButton";

interface ActionButtonsProps {
  textColor: string;
  backgroundColor: string;
  handleCheckout: any;
}

interface item {
  courseId: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  textColor,
  backgroundColor,
  handleCheckout,
}) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { fetchCartMe } = useCart();
  const { courseId } = useParams();

  const handleAddItemToCart = async () => {
    if (courseId) {
      try {
        const items = [{ course: courseId }];
        console.log(items);
        await addItemToCartMe(token, items).then(async (data) => {
          if (data.status <= 305) {
            await fetchCartMe();
          }
        });
        // if (res.status <= 304) {
        //    setCart((res as IAddItemCartResponse).data);
        //    setQuantity((quantity) => quantity + 1);
        // } else {
        //    alert(`Error add Item to Cart: ${res.detail}}`);
        // }
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  return (
    <Stack spacing={2} sx={{ mt: 3 }}>
      <Button
        onClick={handleAddItemToCart}
        variant="contained"
        sx={{
          backgroundColor: textColor,
          color: backgroundColor,
          "&:hover": {
            backgroundColor: backgroundColor,
            color: textColor,
          },
        }}
        startIcon={<ShoppingCartIcon />}
        fullWidth
      >
        {t("add_to_cart")}
      </Button>
      <Button
        variant="outlined"
        sx={{
          backgroundColor: textColor,
          color: backgroundColor,
          "&:hover": {
            backgroundColor: backgroundColor,
            color: textColor,
          },
        }}
        startIcon={<FavoriteIcon />}
        fullWidth
      >
        {t("add_to_favorite")}
      </Button>
      <Button
        variant="contained"
        onClick={handleCheckout}
        sx={{
          backgroundColor: textColor,
          color: backgroundColor,
          "&:hover": {
            backgroundColor: backgroundColor,
            color: textColor,
          },
        }}
        startIcon={<PaymentIcon />}
        fullWidth
      >
        {t("buy_now")}
      </Button>
    </Stack>
  );
};

export default ActionButtons;
