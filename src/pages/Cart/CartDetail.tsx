import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CardMedia, Divider, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem, Coupon } from "src/common/types";
import { validateCoupon } from "src/common/utils";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxCenter from "src/components/Boxs/BoxCenter";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import ButtonBase from "src/components/Buttons/ButtonBase";
import InputCoupon from "src/components/Inputs/InputCoupon";
import ListCoupon from "src/components/Lists/ListCoupon";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";

export interface CartDetailProps {
    items: CartItem[];
    updateCart: (id: string, quantity: number) => void;
    removeFromCart: (id: string) => void;
}

const CartDetail = ({ items, updateCart, removeFromCart }: CartDetailProps) => {
    const t = useTranslation();
    const navigate = useNavigate();

    const [coupons, setCoupons] = useState<Coupon[]>([]);

    const cartTotalValue = useMemo(() => {
        return items.reduce((acc, item) => acc + item.book.current_price * item.quantity, 0);
    }, [items]);

    const shippingFee = useMemo(() => {
        return 25000;
    }, []);

    const couponMapped = useMemo(
        () => validateCoupon(cartTotalValue, coupons),
        [cartTotalValue, coupons]
    );

    const couponValue = useMemo(() => {
        const validCoupon = couponMapped.filter((coupon) => !coupon.errorMessage);
        return validCoupon.reduce((acc, coupon) => acc + coupon.discount, 0);
    }, [couponMapped]);

    const finalFee = useMemo(() => {
        return cartTotalValue + shippingFee - couponValue;
    }, [cartTotalValue, couponValue, shippingFee]);

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
                        md: "1fr 350px",
                    },
                }}
            >
                <BoxBase
                    flexGrow={1}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                    }}
                >
                    {items.map((item) => (
                        <BoxHorizon
                            key={item.book.id}
                            sx={{
                                alignItems: "stretch",
                            }}
                        >
                            <CardMedia
                                component="img"
                                src={item.book.cover}
                                sx={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "scale-down",
                                    p: 0.75,
                                    flexShrink: 0,
                                }}
                            />
                            <BoxBase
                                sx={{
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    pb: 0.75,
                                }}
                            >
                                <BoxBase>
                                    <TypographyBase
                                        sx={{
                                            fontSize: "18px",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {item.book.title}
                                    </TypographyBase>
                                    <TypographyBase
                                        sx={{
                                            fontSize: "16px",
                                            fontWeight: 600,
                                            color: "#f44336",
                                        }}
                                    >
                                        {(item.book.current_price * item.quantity).toLocaleString(
                                            "vi-VN",
                                            {
                                                style: "currency",
                                                currency: "VND",
                                            }
                                        )}
                                    </TypographyBase>
                                </BoxBase>
                                <BoxBase
                                    showBorder
                                    sx={{
                                        display: "flex",
                                        alignItems: "stretch",
                                        justifyContent: "center",
                                        userSelect: "none",
                                        width: "fit-content",
                                    }}
                                >
                                    <BoxCenter
                                        sx={{
                                            cursor: "pointer",
                                            px: 2,
                                        }}
                                        onClick={() => {
                                            updateCart(
                                                item.book.id,
                                                Math.max(item.quantity - 1, 1)
                                            );
                                        }}
                                    >
                                        <TypographyBase
                                            sx={{
                                                fontSize: "20px",
                                                fontWeight: 500,
                                                textAlign: "center",
                                            }}
                                        >
                                            -
                                        </TypographyBase>
                                    </BoxCenter>
                                    <TextField
                                        sx={{
                                            width: "50px",
                                            textAlign: "center",
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                    border: "none",
                                                    borderRadius: "0px",
                                                },
                                                height: "100%",
                                                input: {
                                                    p: 0,
                                                    height: "100%",
                                                    textAlign: "center",
                                                },
                                            },
                                            bgcolor: "#f5f5f5",
                                        }}
                                        value={item.quantity}
                                        onChange={(event: any) => {
                                            if (isNaN(event.target.value)) {
                                                return;
                                            }
                                            updateCart(
                                                item.book.id,
                                                Math.max(Number(event.target.value), 1)
                                            );
                                        }}
                                    />
                                    <BoxCenter
                                        sx={{
                                            cursor: "pointer",
                                            px: 2,
                                        }}
                                        onClick={() => {
                                            updateCart(item.book.id, item.quantity + 1);
                                        }}
                                    >
                                        <TypographyBase
                                            sx={{
                                                fontSize: "20px",
                                                fontWeight: 500,
                                            }}
                                        >
                                            +
                                        </TypographyBase>
                                    </BoxCenter>
                                </BoxBase>
                            </BoxBase>
                            <BoxCenter p={1}>
                                <DeleteForeverIcon
                                    sx={{
                                        cursor: "pointer",
                                        color: "#f44336",
                                        fontSize: "30px",
                                    }}
                                    onClick={() => {
                                        removeFromCart(item.book.id);
                                    }}
                                />
                            </BoxCenter>
                        </BoxHorizon>
                    ))}
                </BoxBase>
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
                            <TypographyBase variant="body1">
                                {t("pages.cart.subTotal")}
                            </TypographyBase>
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
                                {t("pages.cart.shipping")}
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
                            <TypographyBase variant="body1">
                                {t("pages.cart.coupon")}
                            </TypographyBase>
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
                                fontSize: "18px",
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
                        }}
                    >
                        <TypographyBase variant="body1">{t("pages.cart.total")}</TypographyBase>
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
                </BoxBase>
            </BoxBase>
        </BoxBase>
    );
};

export default CartDetail;
