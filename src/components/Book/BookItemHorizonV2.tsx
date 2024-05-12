import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CardMedia } from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BOOK_ITEM_HORIZON_HEIGHT, BOOK_ITEM_HORIZON_WIDTH } from "src/common/const";
import { Book } from "src/common/types";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxCenter from "src/components/Boxs/BoxCenter";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import BoxVertical from "src/components/Boxs/BoxVertical";
import ButtonBase from "src/components/Buttons/ButtonBase";
import DialogSelectEps from "src/components/Dialogs/DialogSelectEps";
import LinkBase from "src/components/Links/LinkBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import { useCartContext } from "src/contexts/CartContext";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";

export interface BookItemHorizonV2Props {
    book: Book;
}

const BookItemHorizonV2 = ({ book }: BookItemHorizonV2Props) => {
    const t = useTranslation();
    const snackbar = useSnackBar();
    const navigate = useNavigate();

    const { addToCart } = useCartContext();

    const [selectEpsType, setSelectEpsType] = useState<"addToCart" | "buyNow" | "">("");

    const renderDialogSelectEps = useMemo(() => {
        if (!selectEpsType) return null;

        return (
            <DialogSelectEps
                open={true}
                onClose={() => setSelectEpsType("")}
                confirmText={
                    selectEpsType === "addToCart" ? t("common.addToCart") : t("common.buyNow")
                }
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
                    if (selectEpsType === "buyNow") {
                        navigate("/cart");
                    }
                }}
            />
        );
    }, [addToCart, book, navigate, selectEpsType, snackbar, t]);

    return (
        <LinkBase to={`/book/${book.id}`}>
            {renderDialogSelectEps}
            <BoxBase
                sx={{
                    cursor: "pointer",
                    border: "1px solid #3333330d",
                    "&:hover": {
                        boxShadow: "0px 0px 10px 0px #3333330d",
                        transition: "all 0.3s ease",
                    },
                }}
            >
                <BoxHorizon
                    sx={{
                        p: 2,
                        alignItems: "stretch",
                        gap: 1,
                    }}
                >
                    <BoxBase position="relative">
                        {book.discount !== 0 ? (
                            <BoxCenter
                                sx={{
                                    bgcolor: "primary.main",
                                    position: "absolute",
                                    top: 1,
                                    left: 1,
                                    zIndex: 1,
                                    borderRadius: "50%",
                                    width: "30px",
                                    height: "30px",
                                    textAlign: "center",
                                    color: "white",
                                }}
                            >
                                <TypographyBase
                                    sx={{
                                        fontSize: "10px",
                                        px: 1,
                                        py: 0.25,
                                        fontWeight: 400,
                                    }}
                                >
                                    {book.discount}%
                                </TypographyBase>
                            </BoxCenter>
                        ) : null}
                        <CardMedia
                            component="img"
                            src={book.cover.replace("compact", "large")}
                            sx={{
                                width: BOOK_ITEM_HORIZON_WIDTH,
                                height: BOOK_ITEM_HORIZON_HEIGHT,
                            }}
                        />
                    </BoxBase>
                    <BoxVertical
                        sx={{
                            p: 1,
                            gap: 1,
                            flexGrow: 1,
                        }}
                    >
                        <TypographyBase variant="h6">{book.title}</TypographyBase>
                        <TypographyBase
                            sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "2",
                                WebkitBoxOrient: "vertical",
                                wordBreak: "break-word",
                                color: "text.secondary",
                                fontSize: "14px",
                            }}
                        >
                            {book.description}
                        </TypographyBase>
                    </BoxVertical>
                    <BoxBase
                        sx={{
                            borderLeft: "1px solid",
                            borderLeftColor: "divider",
                            pl: 2,
                            flexShrink: 0,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <BoxBase
                            flexGrow={1}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <TypographyBase variant="h6" color="primary.main">
                                {book.current_price.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </TypographyBase>
                            <TypographyBase
                                variant="body1"
                                color="text.secondary"
                                sx={{
                                    textDecoration: "line-through",
                                }}
                            >
                                {book.old_price.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </TypographyBase>
                        </BoxBase>
                        <BoxHorizon
                            gap={1}
                            sx={{
                                alignItems: "stretch",
                            }}
                        >
                            <BoxCenter
                                sx={{
                                    border: "1px solid #3333330d",
                                    px: 1,
                                    ":hover": {
                                        bgcolor: "primary.main",
                                        color: "white",
                                        transition: "all 0.3s ease",
                                        borderColor: "primary.main",
                                    },
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setSelectEpsType("addToCart");
                                }}
                            >
                                <ShoppingCartIcon />
                            </BoxCenter>
                            <ButtonBase
                                sx={{
                                    flexShrink: 0,
                                    "&:hover": {
                                        bgcolor: "primary.dark",
                                        boxShadow: "none",
                                    },
                                }}
                                label={t("common.buyNow")}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setSelectEpsType("buyNow");
                                }}
                            />
                        </BoxHorizon>
                    </BoxBase>
                </BoxHorizon>
            </BoxBase>
        </LinkBase>
    );
};

export default BookItemHorizonV2;
