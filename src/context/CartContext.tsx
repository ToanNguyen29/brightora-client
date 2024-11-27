import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ICart } from "../models/Cart";
import { useAuth } from "./AuthContext";
import { getCartMe } from "../services/CartService";

interface CartContextProps {
  cart: ICart | undefined;
  quantity: number;
  fetchCartMe: () => Promise<void>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const token = localStorage.getItem("token");
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const [cart, setCart] = useState<ICart | undefined>(undefined);
  const [quantity, setQuantity] = useState<number>(0);

  const fetchCartMe = useCallback(async () => {
    try {
      const data = await getCartMe(token);
      if (data.status <= 305) {
        console.log("Cart Me", data.data.cart);
        setCart(data.data.cart);
        setQuantity(data.data.cart.cart.length);
      } else {
        // Handle non-success status
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, [token]);

  useEffect(() => {
    if (!isLoadingAuth) {
      if (isAuthenticated) fetchCartMe();
      else {
        setCart(undefined);
        setQuantity(0);
      }
    }
  }, [fetchCartMe, isAuthenticated, isLoadingAuth, token]);

  return (
    <CartContext.Provider
      value={{
        cart,
        quantity,
        fetchCartMe,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within an CartProvider");
  }

  return context;
};

export { CartProvider, useCart };
