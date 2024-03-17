import { useCallback, useMemo, useState } from "react";
import { CartItem, ItemEpsType } from "src/common/types";
import { getCartItemPriceChange, getItemEpsIds } from "src/common/utils";
import { CartContext, CartState } from "src/contexts/CartContext";
import useCheckPrice from "src/hooks/useCheckPrice";
import { v4 as uuidv4 } from "uuid";

interface CartProviderProps {
    children: React.ReactNode;
}

const CartProvider = ({ children }: CartProviderProps) => {
    const [state, setState] = useState<CartState>({
        items: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart") || "") : [],
    });

    const { mutateAsync: getPriceByItemEpsIds } = useCheckPrice();

    const addToCart = useCallback(
        (item: CartItem) => {
            const newItems = { ...state.items, [uuidv4()]: item };
            setState({
                ...state,
                items: newItems,
            });
            localStorage.setItem("cart", JSON.stringify(newItems));
        },
        [state]
    );

    const removeFromCart = useCallback(
        (cartId: string) => {
            const newItems = { ...state.items };
            delete newItems[cartId];
            setState({
                ...state,
                items: newItems,
            });
            localStorage.setItem("cart", JSON.stringify(newItems));
        },
        [state]
    );

    const clearCart = useCallback(() => {
        setState((state) => ({
            ...state,
            items: {},
        }));
        localStorage.removeItem("cart");
    }, [setState]);

    const updateCart = useCallback(
        ({ cartId, eps }: { cartId: string; eps: ItemEpsType[] }) => {
            const newItems = { ...state.items };
            newItems[cartId].eps = eps;
            setState({
                ...state,
                items: newItems,
            });
            localStorage.setItem("cart", JSON.stringify(newItems));
        },
        [state]
    );

    const refetchPrice = useCallback(async () => {
        try {
            const epsIds = getItemEpsIds(state.items);
            if (!epsIds.length) return;
            const response: any = await getPriceByItemEpsIds({
                item_eps_ids: epsIds,
            });
            const cartDataChange = getCartItemPriceChange({
                cartItems: state.items,
                itemEpsIdWithPrice: response.data,
            });

            if (Object.keys(cartDataChange).length > 0) {
                const newItems = { ...state.items, ...cartDataChange };
                setState({
                    ...state,
                    items: newItems,
                });
                localStorage.setItem("cart", JSON.stringify(newItems));
            }
        } catch (error) {
            console.log(error);
        }
    }, [getPriceByItemEpsIds, state]);

    const value = useMemo(
        () => ({
            ...state,
            addToCart,
            removeFromCart,
            clearCart,
            updateCart,
            refetchPrice,
        }),
        [state, addToCart, removeFromCart, clearCart, updateCart, refetchPrice]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
