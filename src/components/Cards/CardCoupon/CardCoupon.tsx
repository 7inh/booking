import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InfoIcon from "@mui/icons-material/Info";
import { Coupon } from "src/common/types";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxCenter from "src/components/Boxs/BoxCenter";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";
import "./index.css";

export interface CardCouponProps {
    coupon: Coupon;
}

const CardCoupon = ({ coupon }: CardCouponProps) => {
    const { errorMessage } = coupon;
    const t = useTranslation();

    return (
        <BoxBase>
            <BoxBase
                sx={{
                    display: "flex",
                }}
            >
                <BoxBase
                    className="stamp-border"
                    sx={{
                        width: "50px",
                        height: "50px",
                    }}
                >
                    <BoxCenter className="stamp-border__content">
                        <TypographyBase
                            sx={{
                                fontSize: "25px",
                                fontWeight: "bold",
                            }}
                        >
                            %
                        </TypographyBase>
                    </BoxCenter>
                </BoxBase>
                <BoxBase
                    sx={{
                        border: "1px solid #000",
                        borderLeft: "none",
                        borderRight: "none",
                        marginLeft: "-5px",
                        flexGrow: 1,
                    }}
                >
                    <BoxBase
                        sx={{
                            marginLeft: "5px",
                            height: "100%",
                        }}
                    >
                        <BoxBase
                            sx={{
                                height: "100%",
                                py: 0.5,
                                px: 1,
                                display: "flex",
                                alignItems: "start",
                                justifyContent: "center",
                                flexDirection: "column",
                            }}
                        >
                            <TypographyBase
                                sx={{
                                    fontSize: "1.2rem",
                                    lineHeight: 1,
                                    fontWeight: 500,
                                    color: "rgb(244, 67, 54)",
                                }}
                            >
                                {coupon.code}
                            </TypographyBase>
                            <TypographyBase
                                sx={{
                                    fontSize: "0.9rem",
                                    color: "grey.600",
                                    lineHeight: 1.5,
                                }}
                            >
                                {t("pages.cart.discountValue")}
                                {": "}
                                {coupon.discountValue?.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </TypographyBase>
                        </BoxBase>
                    </BoxBase>
                </BoxBase>
                <BoxCenter
                    sx={{
                        bgcolor: "rgb(244, 67, 54)",
                        cursor: "pointer",
                        px: 0.5,
                    }}
                >
                    <DeleteForeverIcon
                        sx={{
                            color: "white",
                        }}
                    />
                </BoxCenter>
            </BoxBase>
            {errorMessage ? (
                <BoxBase
                    sx={{
                        bgcolor: "yellow",
                        display: "flex",
                        alignItems: "center",
                        px: 1,
                        py: 0.25,
                        color: "red",
                        gap: 0.5,
                    }}
                >
                    <InfoIcon
                        sx={{
                            fontSize: "14px",
                        }}
                    />
                    <TypographyBase
                        sx={{
                            fontSize: "0.8rem",
                        }}
                    >
                        {t(errorMessage, {
                            minPrice: coupon.min_price.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }),
                        })}
                    </TypographyBase>
                </BoxBase>
            ) : (
                <BoxBase
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        px: 1,
                        py: 0.25,
                        gap: 0.5,
                        bgcolor: "#ff9800",
                        color: "white",
                    }}
                >
                    <InfoIcon
                        sx={{
                            fontSize: "14px",
                        }}
                    />
                    <TypographyBase
                        sx={{
                            fontSize: "0.8rem",
                        }}
                    >
                        {t("pages.cart.couponDescription", {
                            discount:
                                coupon.type === 0
                                    ? coupon.discount + "%"
                                    : coupon.discount.toLocaleString("vi-VN", {
                                          style: "currency",
                                          currency: "VND",
                                      }),
                            maxDiscount: coupon.max_discount.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }),
                            minPrice: coupon.min_price.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }),
                        })}
                    </TypographyBase>
                </BoxBase>
            )}
        </BoxBase>
    );
};

export default CardCoupon;
