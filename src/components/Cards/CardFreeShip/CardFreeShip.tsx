import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CartData } from "src/common/types";
import { getTotalCartValue } from "src/common/utils";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import ButtonBase from "src/components/Buttons/ButtonBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";

export interface CartFreeShipProps {
    items: CartData;
}

const FREE_SHIP_PRICE = 350000;

const CartFreeShip = ({ items }: CartFreeShipProps) => {
    const t = useTranslation();
    const navigate = useNavigate();

    const cartTotalValue = useMemo(() => {
        return getTotalCartValue(items);
    }, [items]);

    if (cartTotalValue >= FREE_SHIP_PRICE) return null;

    return (
        <BoxHorizon
            sx={{
                background: "linear-gradient(90deg, #f44336 0%, #FF8F00 100%)",
                color: "#fff",
                px: 1,
                py: 0.5,
                justifyContent: "space-between",
                gap: 1,
            }}
        >
            <TypographyBase
                sx={{
                    fontSize: "0.9rem",
                    fontWeight: 400,
                }}
            >
                {t("message.freeShipForOrderOver", {
                    price: FREE_SHIP_PRICE.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    }),
                })}
            </TypographyBase>
            <ButtonBase
                variant="outlined"
                label={t("common.buyMore")}
                color="white"
                sx={{
                    flexShrink: 0,
                    "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.2)",
                        borderColor: "white",
                    },
                }}
                onClick={() => navigate("/shop")}
            />
        </BoxHorizon>
    );
};

export default CartFreeShip;
