import LocalMallIcon from "@mui/icons-material/LocalMall";
import { CardMedia, Divider } from "@mui/material";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PAGE_MAX_WIDTH } from "src/common/const";
import { CartItem } from "src/common/types";
import { addCommas } from "src/common/utils";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import ButtonBase from "src/components/Buttons/ButtonBase";
import FormCheckOut from "src/components/Forms/FormCheckOut";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";

const CheckOut = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const t = useTranslation();

    const items: CartItem[] = useMemo(() => state?.items || [], [state]);

    const cartTotalValue = useMemo(() => {
        return items.reduce((acc, item) => acc + item.book.price * item.quantity, 0);
    }, [items]);

    const shippingFee = useMemo(() => {
        return 25000;
    }, []);

    const cartTotalValueWithShippingFee = useMemo(() => {
        return cartTotalValue + shippingFee;
    }, [cartTotalValue, shippingFee]);

    return (
        <>
            <BoxHorizon
                sx={{
                    maxWidth: PAGE_MAX_WIDTH,
                    mx: "auto",
                    justifyContent: "space-between",
                }}
            >
                <TypographyBase
                    sx={{
                        py: 2,
                        fontSize: "24px",
                        fontWeight: 600,
                        mx: 1,
                    }}
                >
                    SUMSUE - {t("pages.checkout.title")}
                </TypographyBase>
                <LocalMallIcon
                    sx={{
                        fontSize: "24px",
                        fontWeight: 600,
                        mx: 1,
                        color: "#f44336",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/")}
                />
            </BoxHorizon>
            <Divider />
            <BoxHorizon
                sx={{
                    alignItems: "stretch",
                }}
            >
                <BoxBase flexGrow={1}></BoxBase>
                <BoxHorizon
                    width="100%"
                    maxWidth={PAGE_MAX_WIDTH - 2 * 10}
                    sx={{
                        gap: 10,
                        alignItems: "stretch",
                    }}
                >
                    <BoxBase
                        sx={{
                            bgcolor: "rgb(255,255,255)",
                            flexGrow: 1,
                        }}
                    >
                        <TypographyBase
                            sx={{
                                fontSize: "24px",
                                fontWeight: 600,
                                mb: 2,
                            }}
                        >
                            {t("pages.checkout.checkoutInfo")}
                        </TypographyBase>
                        <BoxBase>
                            <FormCheckOut />
                        </BoxBase>
                        <ButtonBase fullWidth label={t("pages.checkout.submit")}></ButtonBase>
                        <br />
                        <br />
                    </BoxBase>
                    <BoxBase
                        sx={{
                            bgcolor: "rgb(250,250,250)",
                            width: "500px",
                            borderLeft: "1px solid rgb(224,224,224)",
                        }}
                    >
                        {items.map((item) => {
                            return (
                                <BoxHorizon
                                    key={item.book.id}
                                    sx={{
                                        gap: 2,
                                        py: 2,
                                        px: 3,
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        src={item.book.thumbnail}
                                        alt={item.book.title}
                                        sx={{
                                            width: "40px",
                                            height: "40px",
                                            objectFit: "scale-down",
                                            border: "1px solid rgb(224,224,224)",
                                            p: 1.5,
                                            borderRadius: 2,
                                        }}
                                    />
                                    <BoxBase
                                        sx={{
                                            flexGrow: 1,
                                        }}
                                    >
                                        <TypographyBase
                                            sx={{
                                                fontSize: "16px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {item.book.title}
                                        </TypographyBase>
                                        <TypographyBase
                                            sx={{
                                                fontSize: "14px",
                                                color: "rgb(117,117,117)",
                                            }}
                                        >
                                            {addCommas(item.book.price)} x {item.quantity}
                                        </TypographyBase>
                                    </BoxBase>
                                    <TypographyBase variant="body2">
                                        {addCommas(item.book.price * item.quantity)}
                                    </TypographyBase>
                                </BoxHorizon>
                            );
                        })}
                        <BoxBase
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mx: 3,
                                mt: 2,
                            }}
                        >
                            <TypographyBase variant="body2">
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
                        <Divider sx={{ my: 1, mx: 3 }} />
                        <BoxBase
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mx: 3,
                            }}
                        >
                            <TypographyBase
                                sx={{
                                    fontWeight: 600,
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
                                {cartTotalValueWithShippingFee.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </TypographyBase>
                        </BoxBase>
                    </BoxBase>
                </BoxHorizon>
                <BoxBase flexGrow={1} bgcolor="rgb(250,250,250)"></BoxBase>
            </BoxHorizon>
        </>
    );
};

export default CheckOut;
