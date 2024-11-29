import React, { useEffect, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PaymentIcon from "@mui/icons-material/Payment";
import { useTranslation } from "react-i18next";
import { addItemToCartMe } from "../../../services/CartService";
import { useCart } from "../../../context/CartContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  addItemToWishListMe,
  deleteItemFromWishlistMe,
} from "../../../services/WishListService";
import LoadingComponent from "../../reused/LoadingComponent";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

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
  const [isCart, setIsCart] = useState<boolean | undefined>(undefined);
  const [inWishList, setInWishList] = useState<boolean | undefined>(undefined);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { fetchCartMe } = useCart();
  const { courseId } = useParams();

  useEffect(() => {
    setIsCart(is_cart);
    setInWishList(in_wishlist);
  }, [is_cart, in_wishlist]);

  const handleAddItemToCart = async () => {
    if (courseId) {
      try {
        const items = [{ course: courseId }];
        console.log(items);
        await addItemToCartMe(token, items).then(async (data) => {
          if (data.status <= 305) {
            await fetchCartMe();
            setIsCart(true);
          }
        });
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  const handleGoToCart = async () => {
    navigate(`/cart`, { replace: true });
  };

  const handleAddItemToWishList = async () => {
    if (courseId) {
      try {
        const items = [{ course: courseId }];
        await addItemToWishListMe(token, items).then(async (data) => {
          if (data.status <= 305) {
            console.log(data);
            setInWishList(true);
          }
        });
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  const handleDeleteItemFromWishList = async () => {
    if (courseId) {
      console.log("delete wish");
      try {
        await deleteItemFromWishlistMe(token, courseId).then((data) => {
          console.log(data);
          if (data.status <= 205) {
            setInWishList(false);
          }
        });
      } catch (error) {}
    }
  };

  const handleLearn = () => {
    navigate(`learn`, { replace: true });
  };

  if (
    isCart === undefined ||
    inWishList === undefined ||
    is_enroll === undefined
  )
    return <LoadingComponent />;

  return (
    <Stack spacing={2} sx={{ mt: 3, position: "relative" }}>
      {is_enroll === false && (
        <Box sx={{ display: "flex" }}>
          <Button
            onClick={!isCart ? handleAddItemToCart : handleGoToCart}
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
            {!isCart ? t("add_to_cart") : t("go_to_cart")}
          </Button>
          <Button
            variant="outlined"
            onClick={
              inWishList
                ? handleDeleteItemFromWishList
                : handleAddItemToWishList
            }
            sx={{
              display: "flex",
              ml: 0.5,
              justifyContent: "center",
              alignItems: "center",
              flex: 3,
              border: `2px solid ${textColor}`,
              backgroundColor: backgroundColor,
              color: backgroundColor,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                // color: textColor,
              },
            }}
            fullWidth
          >
            {inWishList ? (
              <FavoriteIcon fontSize="large" sx={{ color: textColor }} />
            ) : (
              <FavoriteBorderIcon fontSize="large" sx={{ color: textColor }} />
            )}
          </Button>
        </Box>
      )}
      <Button
        variant="contained"
        onClick={is_enroll ? handleLearn : handleCheckout}
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
        {is_enroll ? t("go_to_learn") : t("buy_now")}
      </Button>
    </Stack>
  );
};

export default ActionButtons;
