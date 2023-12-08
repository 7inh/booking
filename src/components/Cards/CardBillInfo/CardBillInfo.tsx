import { Divider } from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem, Coupon } from "src/common/types";
import { validateCoupon } from "src/common/utils";
import BoxBase from "src/components/Boxs/BoxBase";
import ButtonBase from "src/components/Buttons/ButtonBase";
import InputCoupon from "src/components/Inputs/InputCoupon";
import ListCoupon from "src/components/Lists/ListCoupon";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";

export interface CartDetailProps {
    items: CartItem[];
}

const CardBillInfo = ({ items }: CartDetailProps) => {
    const t = useTranslation();
    const navigate = useNavigate();

    const [coupons, setCoupons] = useState<Coupon[]>([]);

    const cartTotalValue = useMemo(() => {
        return items.reduce((acc, item) => acc + item.book.current_price * item.quantity, 0);
    }, [items]);

    const shippingFee = useMemo(() => {
        return cartTotalValue >= 350000 ? 0 : 18000;
    }, [cartTotalValue]);

    const couponMapped = useMemo(
        () => validateCoupon(cartTotalValue, coupons),
        [cartTotalValue, coupons]
    );

    const couponValue = useMemo(() => {
        const validCoupon = couponMapped.filter((coupon) => !coupon.errorMessage);
        return validCoupon.reduce((acc, coupon) => acc + (coupon.discountValue || 0), 0);
    }, [couponMapped]);

    const finalFee = useMemo(() => {
        return cartTotalValue + shippingFee - couponValue;
    }, [cartTotalValue, couponValue, shippingFee]);

    return (
        <BoxBase
            sx={{
                border: "1px solid #ccc",
                height: "fit-content",
                p: 2,
            }}
        >
            <TypographyBase
                sx={{
                    fontSize: "22px",
                    fontWeight: 400,
                }}
            >
                {t("pages.cart.billInfo")}
            </TypographyBase>
            <Divider sx={{ my: 1 }} />
            <BoxBase
                sx={{
                    // fontFamily: "consolas",
                    my: 2,
                }}
            >
                <BoxBase
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <TypographyBase variant="body1">{t("pages.cart.subTotal")}</TypographyBase>
                    <TypographyBase
                        sx={{
                            fontSize: "20px",
                        }}
                    >
                        {cartTotalValue.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </TypographyBase>
                </BoxBase>
                <BoxBase
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <TypographyBase variant="body1">
                        {t("pages.cart.shipping")} ({t("pages.cart.temporary")})
                    </TypographyBase>
                    <TypographyBase
                        sx={{
                            fontSize: "20px",
                        }}
                    >
                        {shippingFee.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </TypographyBase>
                </BoxBase>
                <BoxBase
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <TypographyBase variant="body1">{t("pages.cart.coupon")}</TypographyBase>
                    <TypographyBase
                        sx={{
                            fontSize: "20px",
                        }}
                    >
                        -
                        {couponValue.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </TypographyBase>
                </BoxBase>
            </BoxBase>
            <Divider sx={{ my: 1 }} />
            <BoxBase my={2}>
                <TypographyBase
                    sx={{
                        fontSize: "1rem",
                        fontWeight: 500,
                        mb: 1,
                    }}
                >
                    {t("pages.cart.coupon")}
                </TypographyBase>
                <InputCoupon
                    coupons={coupons}
                    onSubmit={(coupon) => {
                        setCoupons([...coupons, coupon]);
                    }}
                />
                <ListCoupon coupons={couponMapped} />
            </BoxBase>
            <Divider sx={{ my: 1 }} />
            <BoxBase
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <TypographyBase
                    sx={{
                        fontSize: "1rem",
                        fontWeight: 500,
                    }}
                >
                    {t("pages.cart.total")}
                </TypographyBase>
                <TypographyBase
                    sx={{
                        fontSize: "20px",
                        color: "#f44336",
                    }}
                >
                    {finalFee.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    })}
                </TypographyBase>
            </BoxBase>
            <br />
            <ButtonBase
                fullWidth
                label={t("pages.cart.processToCheckout")}
                onClick={() => {
                    navigate(
                        {
                            pathname: "/checkout",
                        },
                        {
                            state: {
                                items: items,
                                coupons: couponMapped,
                            },
                        }
                    );
                }}
            ></ButtonBase>
            <TypographyBase
                sx={{
                    textAlign: "center",
                    fontSize: "12px",
                    fontWeight: 400,
                    mt: 1,
                }}
            >
                {t("pages.cart.shippingFeeCanBeChanged")}
            </TypographyBase>
        </BoxBase>
    );
};

export default CardBillInfo;
