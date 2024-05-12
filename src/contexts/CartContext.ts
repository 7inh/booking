import { createContext, useContext } from "react";
import { CartData, CartItem } from "src/common/types";

export interface CartState {
    items: CartData;
}

interface CartContextType extends CartState {
    addToCart: (cartItem: CartItem) => void;
    removeFromCart: (cartId: string) => void;
    clearCart: () => void;
    updateCart: (props: { cartId: string; eps: CartItem["eps"] }) => void;
    refetchPrice: () => void;
}

const CartContext = createContext<CartContextType>({
    items: {},
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
    updateCart: () => {},
    refetchPrice: () => {},
});

CartContext.displayName = "CartContext";

const useCartContext = () => useContext(CartContext);

export { CartContext, useCartContext };
