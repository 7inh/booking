import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CardMedia, Tooltip } from "@mui/material";
import { useMemo } from "react";
import { Book, ItemEpsType } from "src/common/types";
import { getTotalPrice } from "src/common/utils";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxCenter from "src/components/Boxs/BoxCenter";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import DialogSelectEps from "src/components/Dialogs/DialogSelectEps";
import Icon from "src/components/Icons/Icon";
import TypographyBase from "src/components/Typographys/TypographyBase";
import { useCartContext } from "src/contexts/CartContext";
import { useBoolean } from "src/hooks/utils/useBoolean";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";

export interface ItemCartDetailProps {
    cartId: string;
    book: Book;
    eps: ItemEpsType[];
}

const ItemCartDetail = ({ cartId, book, eps }: ItemCartDetailProps) => {
    const t = useTranslation();
    const snackbar = useSnackBar();

    const { updateCart, removeFromCart } = useCartContext();

    const open = useBoolean();

    const tooltipTitle = useMemo(() => {
        return eps
            .sort((a: ItemEpsType, b: ItemEpsType) => a.eps_no - b.eps_no)
            .map((ep) => ep.eps_no + (ep.description ? ` ${ep.description}` : ""))
            .join(", ");
    }, [eps]);

    const renderDialogSelectEps = useMemo(() => {
        if (!open.value) return null;

        return (
            <DialogSelectEps
                open={open.value}
                onClose={open.onFalse}
                confirmText={t("common.update")}
                itemId={book.id}
                selectedListItemEps={eps}
                onConfirm={(selectedListItemEps) => {
                    updateCart({ cartId, eps: selectedListItemEps });
                    snackbar({
                        message: t("success.updateCart"),
                        severity: "success",
                    });
                }}
            />
        );
    }, [book.id, cartId, eps, open.onFalse, open.value, snackbar, t, updateCart]);

    return (
        <BoxHorizon
            key={book.id}
            sx={{
                alignItems: "stretch",
            }}
        >
            {renderDialogSelectEps}
            <CardMedia
                component="img"
                src={book.cover}
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
                    gap: 1,
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
                        {book.title}
                    </TypographyBase>
                    <TypographyBase
                        sx={{
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "#f44336",
                        }}
                    >
                        {getTotalPrice(eps).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </TypographyBase>
                </BoxBase>
                <BoxHorizon gap={0.5}>
                    <Tooltip title={tooltipTitle} arrow>
                        <BoxBase
                            sx={{
                                bgcolor: "grey.300",
                                py: 0.1,
                                px: 1,
                                width: "fit-content",
                            }}
                        >
                            <TypographyBase variant="caption">
                                {t("pages.cart.selectedEps", {
                                    count: eps.length,
                                })}
                            </TypographyBase>
                        </BoxBase>
                    </Tooltip>
                    <BoxHorizon
                        sx={{
                            cursor: "pointer",
                            pr: 1,
                            py: 0.1,
                            pl: 0.15,
                            gap: 0.25,
                            bgcolor: "primary.main",
                            color: "white",
                            "&:hover": {
                                bgcolor: "primary.dark",
                            },
                        }}
                        onClick={open.onTrue}
                    >
                        <Icon icon="mingcute:edit-line" />
                        <TypographyBase variant="caption">{t("common.edit")}</TypographyBase>
                    </BoxHorizon>
                </BoxHorizon>
            </BoxBase>
            <BoxCenter p={1}>
                <DeleteForeverIcon
                    sx={{
                        cursor: "pointer",
                        color: "#f44336",
                        fontSize: "30px",
                    }}
                    onClick={() => removeFromCart(cartId)}
                />
            </BoxCenter>
        </BoxHorizon>
    );
};

export default ItemCartDetail;
