import { useCallback, useMemo, useState } from "react";
import { CartContext, CartState } from "src/contexts/CartContext";
import useGetItemByIds from "src/hooks/useGetItemByIds";
import { Book } from "src/common/types";

interface CartProviderProps {
    children: React.ReactNode;
}

const CartProvider = ({ children }: CartProviderProps) => {
    const [state, setState] = useState<CartState>({
        items: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart") || "") : [],
    });

    useGetItemByIds({
        ids: state.items.map((item) => parseInt(item.book.id)),
        onSuccess: (data) => updatePrice(data),
    });

    const addToCart = useCallback(
        (item: any) => {
            const index = state.items.findIndex((i) => i.book.id === item.book.id);
            if (index !== -1) {
                const newItems = [...state.items];
                newItems[index].quantity += item.quantity;
                setState((state) => ({
                    ...state,
                    items: newItems,
                }));
                localStorage.setItem("cart", JSON.stringify(newItems));
                return;
            }
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

    const updateCart = useCallback(
        (id: string, quantity: number) => {
            const index = state.items.findIndex((i) => i.book.id === id);
            if (index !== -1) {
                const newItems = [...state.items];
                newItems[index].quantity = quantity;
                setState((state) => ({
                    ...state,
                    items: newItems,
                }));
                localStorage.setItem("cart", JSON.stringify(newItems));
            }
        },
        [state.items]
    );

    const updatePrice = useCallback(
        (data: Book[]) => {
            const newItems = state.items.map((item) => {
                const book = data.find((b) => b.id === item.book.id);
                return {
                    ...item,
                    ...(book && { book }),
                };
            });
            setState((state) => ({
                ...state,
                items: newItems,
            }));
            localStorage.setItem("cart", JSON.stringify(newItems));
        },
        [state.items]
    );

    const value = useMemo(
        () => ({
            ...state,
            addToCart,
            removeFromCart,
            clearCart,
            updateCart,
        }),
        [state, addToCart, removeFromCart, clearCart, updateCart]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
