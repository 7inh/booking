import { CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BookDetail } from "src/common/types";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxCenter from "src/components/Boxs/BoxCenter";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import InputQuantity from "src/components/Inputs/InputQuantity";
import TypographyBase from "src/components/Typographys/TypographyBase";
import { useCartContext } from "src/contexts/CartContext";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";

export interface OverviewProps {
    book: BookDetail;
}

const Overview = ({ book }: OverviewProps) => {
    const { addToCart } = useCartContext();
    const snackbar = useSnackBar();
    const t = useTranslation();
    const navigate = useNavigate();

    return (
        <BoxBase
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "450px 1fr",
                },
                gap: 4,
            }}
        >
            <BoxBase
                showBorder
                sx={{
                    p: {
                        xs: 2,
                        md: 5,
                        lg: 10,
                    },
                    position: "relative",
                }}
            >
                <CardMedia
                    component="img"
                    image={book.cover.replace("compact", "master")}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "scale-down",
                    }}
                    alt={book.title}
                />
                {book.discount !== 0 ? (
                    <BoxCenter
                        sx={{
                            bgcolor: "primary.main",
                            position: "absolute",
                            top: 10,
                            left: 10,
                            zIndex: 1,
                            borderRadius: "50%",
                            width: "80px",
                            height: "80px",
                            textAlign: "center",
                            color: "white",
                        }}
                    >
                        <TypographyBase
                            sx={{
                                fontSize: "20px",
                                px: 1,
                                py: 0.25,
                                fontWeight: 400,
                            }}
                        >
                            {book.discount}%
                        </TypographyBase>
                    </BoxCenter>
                ) : null}
            </BoxBase>
            <BoxBase>
                <TypographyBase
                    sx={{
                        fontSize: "30px",
                        fontWeight: 500,
                    }}
                >
                    {book.title}
                </TypographyBase>
                <BoxHorizon gap={1} my={1}>
                    <TypographyBase
                        sx={{
                            fontSize: "24px",
                            fontWeight: 500,
                            color: "primary.main",
                        }}
                    >
                        {book.current_price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </TypographyBase>
                    <TypographyBase
                        sx={{
                            fontSize: "18px",
                            fontWeight: 300,
                            color: "primary.dark",
                            textDecoration: "line-through",
                        }}
                    >
                        {book.old_price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </TypographyBase>
                </BoxHorizon>
                <TypographyBase
                    sx={{
                        fontSize: "18px",
                        fontWeight: 300,
                        color: "primary.dark",
                    }}
                >
                    {book.description}
                </TypographyBase>
                <br />

                <br />
                <BoxBase sx={{}}>
                    <BoxHorizon
                        sx={{
                            width: {
                                xs: "100%",
                                md: "fit-content",
                            },
                        }}
                    >
                        <InputQuantity
                            onAddToCart={(quantity) => {
                                addToCart({ book, quantity });
                                snackbar({
                                    message: t("success.addToCart"),
                                    severity: "success",
                                });
                            }}
                            onBuyNow={(quantity) => {
                                addToCart({ book, quantity });
                                navigate("/cart");
                            }}
                        />
                    </BoxHorizon>
                </BoxBase>
            </BoxBase>
        </BoxBase>
    );
};

export default Overview;
