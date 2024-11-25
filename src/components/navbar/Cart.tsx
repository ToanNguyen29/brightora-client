import React from "react";
import {
   IconButton,
   Popover,
   Box,
   Typography,
   Avatar,
   List,
   ListItem,
   Button,
   Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Cart() {
   const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
   const navigate = useNavigate();
   const { quantity, cart } = useCart();

   const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handlePopoverClose = () => {
      setAnchorEl(null);
   };

   const open = Boolean(anchorEl);

   // Calculate total price

   // Theme and Translation
   const { mode } = useThemeContext();
   const { t } = useTranslation();

   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";

   const totalPrice =
      cart?.cart.reduce((sum, item) => sum + item.course.price, 0) || 0;

   return (
      <div>
         <IconButton
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
         >
            <Badge badgeContent={quantity} color="secondary">
               <ShoppingCartIcon />
            </Badge>
         </IconButton>
         <Popover
            id="mouse-over-popover"
            sx={{ mt: "50px" }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
               vertical: "top",
               horizontal: "right",
            }}
            transformOrigin={{
               vertical: "top",
               horizontal: "right",
            }}
            onClose={handlePopoverClose}
            onMouseLeave={handlePopoverClose}
         >
            <Box
               sx={{
                  maxWidth: 300,
                  maxHeight: 500,
                  overflowY: "auto", // Enable scrolling for the list
                  border: "1px solid #ccc", // Add border to the box
                  boxShadow: 3,
                  borderRadius: 2,
                  backgroundColor: backgroundColor, // Apply theme-based background
                  color: textColor, // Apply theme-based text color
               }}
            >
               <List>
                  {cart?.cart.length === 0 && (
                     <Typography
                        variant="subtitle2"
                        sx={{ textAlign: "center", p: 1 }}
                     >
                        Your cart is empty
                     </Typography>
                  )}

                  {cart &&
                     cart.cart.map((item) => (
                        <ListItem
                           key={item.course._id}
                           sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                              cursor: "pointer",
                           }}
                           onClick={() =>
                              navigate(`/course/${item.course._id}`)
                           }
                        >
                           <Avatar
                              src={item.course.thumbnail}
                              alt={item.course.title}
                              sx={{
                                 width: 70,
                                 height: 70,
                                 mr: 2,
                                 borderRadius: "8px",
                              }}
                           />
                           <Box sx={{ flexGrow: 1 }}>
                              <Typography
                                 variant="body1"
                                 sx={{
                                    display: "-webkit-box",
                                    overflow: "hidden",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 2,
                                 }}
                              >
                                 {item.course.title}
                              </Typography>
                              <Typography
                                 variant="body2"
                                 color="text.secondary"
                                 sx={{
                                    display: "-webkit-box",
                                    overflow: "hidden",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 1,
                                 }}
                              >
                                 {`${item.course.owner.first_name} ${item.course.owner.last_name}`}
                              </Typography>
                              <Typography
                                 variant="body2"
                                 color="text.secondary"
                              >
                                 {item.course.price.toFixed(3)} USD
                              </Typography>
                           </Box>
                        </ListItem>
                     ))}
               </List>
               <Box
                  sx={{
                     position: "sticky",
                     bottom: 0,

                     backgroundColor: backgroundColor, // Ensure the footer is visible
                     color: textColor,
                     p: 2,
                     borderTop: "1px solid #ccc",
                  }}
               >
                  <Typography variant="h6">
                     {t("total")}: {totalPrice.toFixed(3)} USD
                  </Typography>
                  <Button
                     variant="contained"
                     fullWidth
                     sx={{
                        mt: 1,
                        with: "100%",
                        color: backgroundColor,
                        backgroundColor: textColor,
                     }}
                     onClick={() => {
                        handlePopoverClose();
                        navigate(`/cart`);
                     }}
                  >
                     {t("goto_cart")}
                  </Button>
               </Box>
            </Box>
         </Popover>
      </div>
   );
}
