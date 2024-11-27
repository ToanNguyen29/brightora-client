import DeleteIcon from "@mui/icons-material/Delete";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";
import { useNavigate } from "react-router-dom";
import { deleteItemFromCartMe } from "../../services/CartService";
import { useCart } from "../../context/CartContext";

import CourseRating from "../course/header/CourseRating";

interface CartProps {
  id: string;
  thumbnail: string;
  title: string;
  owner_name: string;
  rating: number;
  updated_at: string;
  numberRating: number;
  price: number;
}

const CartItem: React.FC<CartProps> = ({
  id,
  thumbnail,
  title,
  owner_name,
  updated_at,
  rating,
  numberRating,
  price,
}) => {
  const { mode } = useThemeContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { fetchCartMe } = useCart();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";
  // maxHeight: "90%",

  const handleDeleteItem = async () => {
    try {
      await deleteItemFromCartMe(token, id).then(async (data) => {
        console.log(data);
        if (data.status <= 305) {
          console.log("ok");
          await fetchCartMe();
        }
        // if (res.status <= 304) {
        //    // setCart((res as IDeleteItemCartResponse).data);
        //    // setQuantity((quantity) => quantity - 1);
        // } else {
        //    alert(`Error delete Item to Cart: ${res.detail}}`);
        // }
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <Box
      sx={{
        borderBottom: "1px solid",
        borderColor: mode === "light" ? "#ccc" : "#555",
        borderRadius: "0px",
        p: 1.5,
        mx: "auto",
        width: "100%",
        display: "flex",
        backgroundColor: backgroundColor,
        color: textColor,
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Box
        onClick={() => navigate(`/course/${id}`)}
        sx={{
          flex: 6,
          display: "flex",
          alignItems: "center",
          mr: 1,
        }}
      >
        <Box
          sx={{
            mr: 1.5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={thumbnail}
            alt={title}
            style={{
              aspectRatio: "16/9",
              width: "100%",
              height: "auto",
              maxWidth: "200px",
              maxHeight: "200px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>
        <Box sx={{ flex: 2, textAlign: "left" }}>
          <Typography
            variant="h6"
            sx={{
              color: textColor,
              fontWeight: "bold",
              mb: 1,
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2, // Giới hạn tiêu đề trong 2 dòng
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: textColor, mb: 0.5, fontSize: "0.9rem" }}
          >
            {t("By")}: {owner_name}
          </Typography>

          <CourseRating rating={rating} numberRating={numberRating} />

          {updated_at && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: textColor, mt: 0.5, fontSize: "0.9rem" }}
            >
              {t("updated_at")}: {updated_at}
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ flex: 1 }}>
        <Tooltip title={t("remove")}>
          <IconButton
            color="error"
            size="small"
            sx={{ display: "block" }}
            onClick={() => handleDeleteItem()}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title={t("moveToWishlist")}>
          <IconButton size="small" sx={{ display: "block" }}>
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Price Section */}
      <Box
        sx={{
          flex: 1,
          textAlign: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ color: textColor, fontWeight: "bold" }}
        >
          {`$${price.toFixed(3)}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default CartItem;
