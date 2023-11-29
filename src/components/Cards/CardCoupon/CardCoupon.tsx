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
                        }}
                    >
                        <BoxBase
                            sx={{
                                py: 0.5,
                                px: 1,
                            }}
                        >
                            <TypographyBase
                                sx={{
                                    fontSize: "20px",
                                    fontWeight: 500,
                                    color: "rgb(244, 67, 54)",
                                }}
                            >
                                {coupon.code}
                            </TypographyBase>
                            <TypographyBase
                                sx={{
                                    fontSize: "14px",
                                    color: "grey.600",
                                }}
                            >
                                {t("pages.cart.discountValue")}
                                {": "}
                                {coupon.value.toLocaleString("vi-VN", {
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
                        fontSize: "12px",
                    }}
                >
                    Đã hết lượt sử dụng
                </TypographyBase>
            </BoxBase>
        </BoxBase>
    );
};

export default CardCoupon;
