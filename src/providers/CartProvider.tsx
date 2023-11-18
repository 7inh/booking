import { useCallback, useMemo, useState } from "react";
import { CartContext, CartState } from "src/contexts/CartContext";

interface CartProviderProps {
    children: React.ReactNode;
}

const CartProvider = ({ children }: CartProviderProps) => {
    const [state, setState] = useState<CartState>({
        items: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart") || "") : [],
    });

    const addToCart = useCallback(
        (item: any) => {
            setState((state) => ({
                ...state,
                items: [...state.items, item],
            }));
            localStorage.setItem("cart", JSON.stringify([...state.items, item]));
        },
        [state.items]
    );

    const removeFromCart = useCallback(
        (id: string) => {
            setState((state) => ({
                ...state,
                items: state.items.filter((item) => item.book.id !== id),
            }));
            localStorage.setItem(
                "cart",
                JSON.stringify(state.items.filter((item) => item.book.id !== id))
            );
        },
        [state.items]
    );

    const clearCart = useCallback(() => {
        setState((state) => ({
            ...state,
            items: [],
        }));
        localStorage.removeItem("cart");
    }, [setState]);

    const value = useMemo(
        () => ({
            ...state,
            addToCart,
            removeFromCart,
            clearCart,
        }),
        [state, addToCart, removeFromCart, clearCart]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
