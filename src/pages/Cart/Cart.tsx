import { PAGE_MAX_WIDTH } from "src/common/const";
import BoxBase from "src/components/Boxs/BoxBase";
import Breadcrumb from "src/components/Breadcrumb/Breadcrumb";
import { useCartContext } from "src/contexts/CartContext";
import useTranslation from "src/hooks/utils/useTranslation";
import CartDetail from "src/pages/Cart/CartDetail";
import CartEmpty from "src/pages/Cart/CartEmpty";

const Cart = () => {
    const { items } = useCartContext();
    const t = useTranslation();

    return (
        <>
            <Breadcrumb
                links={[
                    {
                        name: t("pages.home.title"),
                        href: "/",
                    },
                    {
                        name: t("pages.cart.title"),
                        href: "/cart",
                    },
                ]}
            />
            <BoxBase
                sx={{
                    width: "100%",
                    maxWidth: PAGE_MAX_WIDTH,
                    mx: "auto",
                    mt: 2,
                    mb: 5,
                }}
            >
                <BoxBase mx={1}>
                    {items.length ? <CartDetail items={items} /> : <CartEmpty />}
                </BoxBase>
            </BoxBase>
        </>
    );
};

export default Cart;
