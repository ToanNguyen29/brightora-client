import React from "react";
import { Button, Stack } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PaymentIcon from "@mui/icons-material/Payment";
import { useTranslation } from "react-i18next";
import { addItemToCartMe } from "../../../services/CartService";
import { useCart } from "../../../context/CartContext";
import { useNavigate, useParams } from "react-router-dom";
import { addItemToWishListMe } from "../../../services/WishListService";

interface ActionButtonsProps {
  is_cart: boolean | undefined;
  is_review: any;
  in_wishlist: boolean | undefined;
  is_enroll: boolean | undefined;
  textColor: string;
  backgroundColor: string;
  handleCheckout: any;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  is_cart,
  is_review,
  is_enroll,
  in_wishlist,
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
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  const handleAddItemToWishList = async () => {
    if (courseId) {
      try {
        const items = [{ course: courseId }];
        console.log(items);
        await addItemToWishListMe(token, items).then(async (data) => {
          if (data.status <= 305) {
            console.log(data);
          }
        });
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  const handleLearn = () => {
    navigate(`learn`, { replace: true });
  };

  return (
    <Stack spacing={2} sx={{ mt: 3 }}>
      {!is_cart && !is_enroll && (
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
      )}
      {!in_wishlist && !is_enroll && (
        <Button
          variant="outlined"
          onClick={handleAddItemToWishList}
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
      )}
      {!is_enroll ? (
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
      ) : (
        <Button
          variant="contained"
          onClick={handleLearn}
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
          {t("go_to_learn")}
        </Button>
      )}
    </Stack>
  );
};

export default ActionButtons;
