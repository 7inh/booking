import { CardMedia, Skeleton } from "@mui/material";
import { useMemo, useState } from "react";
import { BookDetail } from "src/common/types";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxCenter from "src/components/Boxs/BoxCenter";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import ButtonBase from "src/components/Buttons/ButtonBase";
import DialogSelectEps from "src/components/Dialogs/DialogSelectEps";
import TypographyBase from "src/components/Typographys/TypographyBase";
import { useCartContext } from "src/contexts/CartContext";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";

export interface OverviewProps {
    book: BookDetail;
    isFetching?: boolean;
}

const Overview = ({ book, isFetching }: OverviewProps) => {
    const { addToCart } = useCartContext();
    const snackbar = useSnackBar();
    const t = useTranslation();
    const [confirmText, setConfirmText] = useState<string>("");

    const isSoldOut = useMemo(() => {
        return book.availability === 3 || book.quantity ? book.quantity - book.sold <= 0 : false;
    }, [book.availability, book.quantity, book.sold]);

    const renderDialogSelectEps = useMemo(() => {
        if (!confirmText) return null;

        return (
            <DialogSelectEps
                open={true}
                onClose={() => setConfirmText("")}
                confirmText={confirmText}
                itemId={book.id}
                onConfirm={(selectedListItemEps) => {
                    addToCart({
                        book,
                        eps: selectedListItemEps,
                    });
                    snackbar({
                        message: t("success.addToCart"),
                        severity: "success",
                    });
                }}
            />
        );
    }, [addToCart, book, confirmText, snackbar, t]);

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
            {renderDialogSelectEps}
            <BoxBase
                showBorder
                sx={{
                    p: {
                        xs: 2,
                        md: 3,
                        lg: 7,
                    },
                    position: "relative",
                    height: "fit-content",
                }}
            >
                {!isFetching ? (
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
                ) : (
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            width: "100%",
                            height: "100%",
                            minHeight: "450px",
                        }}
                    />
                )}
                {book.discount !== 0 && !isFetching ? (
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
                {!isFetching ? (
                    <TypographyBase
                        sx={{
                            fontSize: "1.9rem",
                            fontWeight: 500,
                        }}
                    >
                        {book.title.toUpperCase()}
                    </TypographyBase>
                ) : (
                    <Skeleton
                        variant="text"
                        sx={{
                            width: "100%",
                            height: "45px",
                        }}
                    />
                )}
                {!isFetching ? (
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
                ) : (
                    <Skeleton
                        variant="text"
                        sx={{
                            width: "100%",
                            height: "40px",
                            maxWidth: "200px",
                            mb: 1,
                            mt: 1,
                        }}
                    />
                )}
                {!isFetching ? (
                    <TypographyBase
                        sx={{
                            fontSize: "1rem",
                            fontWeight: 300,
                            color: "primary.dark",
                        }}
                    >
                        {book.description}
                    </TypographyBase>
                ) : (
                    <Skeleton
                        variant="text"
                        sx={{
                            width: "100%",
                            height: "300px",
                        }}
                    />
                )}
                <br />

                <br />
                <BoxBase
                    sx={{
                        display: isFetching ? "none" : "block",
                    }}
                >
                    <BoxHorizon
                        sx={{
                            width: {
                                xs: "100%",
                                md: "fit-content",
                            },
                        }}
                    >
                        {!isSoldOut ? (
                            <ButtonBase
                                label={t("common.buyNow")}
                                sx={{
                                    gridColumn: "1 / 3",
                                    fontSize: "1.2rem",
                                    px: 10,
                                }}
                                onClick={() => setConfirmText(t("common.buyNow"))}
                            ></ButtonBase>
                        ) : (
                            <BoxBase
                                showBorder
                                sx={{
                                    px: 3,
                                    py: 2,
                                    width: "100%",
                                }}
                            >
                                <TypographyBase
                                    sx={{
                                        fontSize: "1rem",
                                        fontWeight: 400,
                                        color: "primary.main",
                                        textAlign: "center",
                                    }}
                                >
                                    {t("pages.book.soldOut")}
                                </TypographyBase>
                            </BoxBase>
                        )}
                    </BoxHorizon>
                </BoxBase>
            </BoxBase>
        </BoxBase>
    );
};

export default Overview;
