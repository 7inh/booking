import { CartItem } from "src/common/types";
import BoxBase from "src/components/Boxs/BoxBase";
import CardBillInfo from "src/components/Cards/CardBillInfo/CardBillInfo";
import CartFreeShip from "src/components/Cards/CardFreeShip/CardFreeShip";
import ListItemCart from "src/components/Lists/ListItemCart";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";

export interface CartDetailProps {
    items: CartItem[];
}

const CartDetail = ({ items }: CartDetailProps) => {
    const t = useTranslation();

    return (
        <BoxBase>
            <TypographyBase
                sx={{
                    fontSize: "28px",
                    fontWeight: 400,
                }}
            >
                {t("pages.cart.yourCart")}
            </TypographyBase>
            <br />
            <BoxBase
                sx={{
                    gap: 3,
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "1fr 400px",
                    },
                }}
            >
                <ListItemCart items={items} />
                <BoxBase
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <CartFreeShip items={items} />
                    <CardBillInfo items={items} />
                </BoxBase>
            </BoxBase>
        </BoxBase>
    );
};

export default CartDetail;
