import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Divider, Tooltip } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PAGE_MAX_WIDTH } from "src/common/const";
import { CartData, Coupon } from "src/common/types";
import { getCartMainInfo, getCartWeight, getTotalCartValue } from "src/common/utils";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import ButtonBase from "src/components/Buttons/ButtonBase";
import DialogOrderSuccess from "src/components/Dialogs/DialogOrderSuccess";
import FormCheckOut, { OrderFormValuesProps } from "src/components/Forms/FormCheckOut";
import ItemCartInCheckout from "src/components/Items/ItemCartInCheckout";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useSubmitOrder from "src/hooks/useSubmitOrder";
import { useResponsive } from "src/hooks/utils/useResponsive";
import useTranslation from "src/hooks/utils/useTranslation";

const CheckOut = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const t = useTranslation();

    const isSmall = useResponsive("down", 1101);

    const [openDialogOrderSuccess, setOpenDialogOrderSuccess] = useState(false);
    const [shippingFee, setShippingFee] = useState<{
        fetched: boolean;
        value: number;
    }>({
        fetched: false,
        value: 0,
    });

    const { submitOrder } = useSubmitOrder({
        onSubmitOrderSuccess: () => {
            setOpenDialogOrderSuccess(true);
        },
    });

    const items: CartData = useMemo(() => state?.items || [], [state]);
    const coupons: Coupon[] = useMemo(() => state?.coupons || [], [state]);

    const cartWeight = useMemo(() => {
        return getCartWeight(items);
    }, [items]);

    const cartTotalValue = useMemo(() => {
        return getTotalCartValue(items);
    }, [items]);

    const couponValue = useMemo(() => {
        return coupons.reduce((acc, coupon) => acc + (coupon.discountValue || 0), 0);
    }, [coupons]);

    const finalFee = useMemo(() => {
        return cartTotalValue + shippingFee.value - couponValue;
    }, [cartTotalValue, couponValue, shippingFee]);

    const handleSubmit = useCallback(
        (data: OrderFormValuesProps) => {
            submitOrder({
                ...data,
                address: `${data.address}, ${data.ward?.WARDS_NAME}, ${data.district?.DISTRICT_NAME}, ${data.province?.PROVINCE_NAME}`,
                items: JSON.stringify(getCartMainInfo(items)),
                date: data.shipNow ? "now" : data.date,
                coupon: coupons.map((coupon) => coupon.code),
                shippingFee: shippingFee.value,
                total: finalFee,
            });
        },
        [coupons, finalFee, items, shippingFee.value, submitOrder]
    );

    useEffect(() => {
        if (cartTotalValue >= 350000) {
            setShippingFee({
                fetched: true,
                value: 0,
            });
        }
    }, [cartTotalValue]);

    return (
        <>
            <DialogOrderSuccess
                open={openDialogOrderSuccess}
                onClose={() => {
                    localStorage.removeItem("cart");
                    window.location.href = "/";
                }}
                onConfirm={() => {
                    localStorage.removeItem("cart");
                    window.location.href = "/";
                }}
            />
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
                        fontSize: "1.3rem",
                        fontWeight: 600,
                        mx: 1,
                    }}
                >
                    SUMSUE - {t("pages.checkout.title")}
                </TypographyBase>
                <LocalMallIcon
                    sx={{
                        fontSize: "1.3rem",
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
                        flexWrap: "wrap",
                    }}
                >
                    <BoxBase
                        sx={{
                            bgcolor: "rgb(255,255,255)",
                            flexGrow: 1,
                            mx: 1,
                        }}
                    >
                        <TypographyBase
                            sx={{
                                fontSize: "24px",
                                fontWeight: 600,
                                mb: 2,
                                mt: 3,
                            }}
                        >
                            {t("pages.checkout.checkoutInfo")}
                        </TypographyBase>
                        <FormCheckOut
                            weight={cartWeight}
                            currentShippingFee={shippingFee.value}
                            shouldRefetchShippingFee={cartTotalValue < 350000}
                            refetchShippingFee={(value) => {
                                setShippingFee({
                                    fetched: true,
                                    value,
                                });
                            }}
                            onClear={() => {
                                setShippingFee({
                                    fetched: false,
                                    value: 0,
                                });
                            }}
                            onSubmit={handleSubmit}
                        />
                        <ButtonBase
                            fullWidth
                            label={t("pages.checkout.submit")}
                            onClick={() => {
                                const form = document.querySelector("form");
                                form?.requestSubmit();
                            }}
                        ></ButtonBase>
                        <br />
                        <br />
                    </BoxBase>
                    <BoxBase
                        sx={{
                            bgcolor: "rgb(250,250,250)",
                            width: isSmall ? "100%" : "500px",
                            borderLeft: "1px solid rgb(224,224,224)",
                            pb: 10,
                        }}
                    >
                        <br />
                        {Object.keys(items).map((cartId) => {
                            const { book, eps } = items[cartId];
                            return <ItemCartInCheckout key={cartId} book={book} eps={eps} />;
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
                            {shippingFee.fetched ? (
                                <TypographyBase
                                    sx={{
                                        fontSize: "20px",
                                    }}
                                >
                                    {shippingFee.value.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </TypographyBase>
                            ) : (
                                <Tooltip
                                    title={t(
                                        "message.shippingFeeIsCalculatingPleaseInputYourAddress"
                                    )}
                                    placement="top"
                                    arrow
                                >
                                    <BoxBase>...</BoxBase>
                                </Tooltip>
                            )}
                        </BoxBase>
                        <BoxBase
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mx: 3,
                            }}
                        >
                            <TypographyBase variant="body2">
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
                                {finalFee.toLocaleString("vi-VN", {
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
