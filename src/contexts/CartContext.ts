import { createContext, useContext } from "react";
import { CartItem } from "src/common/types";

export interface CartState {
    items: CartItem[];
}

interface CartContextType extends CartState {
    addToCart: (book: CartItem) => void;
    removeFromCart: (bookId: string) => void;
    clearCart: () => void;
    updateCart: (bookId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType>({
    items: [],
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
    updateCart: () => {},
});

CartContext.displayName = "CartContext";

const useCartContext = () => useContext(CartContext);

export { CartContext, useCartContext };