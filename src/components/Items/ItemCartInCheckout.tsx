import { CardMedia, Tooltip } from "@mui/material";
import { useMemo } from "react";
import { Book, ItemEpsType } from "src/common/types";
import { getTotalPrice } from "src/common/utils";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";

export interface ItemCartInCheckoutProps {
    book: Book;
    eps: ItemEpsType[];
}

const ItemCartInCheckout = ({ book, eps }: ItemCartInCheckoutProps) => {
    const t = useTranslation();

    const tooltipTitle = useMemo(() => {
        return eps
            .sort((a: ItemEpsType, b: ItemEpsType) => a.eps_no - b.eps_no)
            .map((ep) => ep.eps_no + (ep.description ? ` ${ep.description}` : ""))
            .join(", ");
    }, [eps]);

    const totalPrice = useMemo(() => {
        return getTotalPrice(eps);
    }, [eps]);

    return (
        <BoxHorizon
            sx={{
                gap: 2,
                py: 2,
                px: 3,
            }}
        >
            <CardMedia
                component="img"
                src={book.cover}
                alt={book.title}
                sx={{
                    width: "40px",
                    height: "40px",
                    objectFit: "scale-down",
                    border: "1px solid rgb(224,224,224)",
                    p: 1.5,
                    borderRadius: 2,
                    flexShrink: 0,
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
                    {book.title}
                </TypographyBase>

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
            </BoxBase>
            <TypographyBase variant="body2">
                {totalPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                })}
            </TypographyBase>
        </BoxHorizon>
    );
};

export default ItemCartInCheckout;
