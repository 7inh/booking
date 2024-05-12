import CloseIcon from "@mui/icons-material/Close";
import { Box, CardMedia, Tooltip } from "@mui/material";
import { useMemo } from "react";
import { Book, ItemEpsType } from "src/common/types";
import { getTotalPrice } from "src/common/utils";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import BoxVertical from "src/components/Boxs/BoxVertical";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";

export interface ItemCartInMenuProps {
    book: Book;
    eps: ItemEpsType[];
    onRemove?: () => void;
}

const ItemCartInMenu = ({ book, eps, onRemove }: ItemCartInMenuProps) => {
    const t = useTranslation();

    const totalPrice = useMemo(() => {
        return getTotalPrice(eps);
    }, [eps]);

    const tooltipTitle = useMemo(() => {
        return eps
            .sort((a: ItemEpsType, b: ItemEpsType) => a.eps_no - b.eps_no)
            .map((ep) => ep.eps_no + (ep.description ? ` ${ep.description}` : ""))
            .join(", ");
    }, [eps]);

    return (
        <BoxHorizon
            sx={{
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
            }}
        >
            <BoxHorizon
                gap={1}
                sx={{
                    alignItems: "stretch",
                    flexShrink: 0,
                    width: "100%",
                }}
            >
                <CardMedia
                    component="img"
                    src={book.cover}
                    sx={{
                        width: "50px",
                        height: "50px",
                        objectFit: "scale-down",
                        p: 0.5,
                        flexShrink: 0,
                    }}
                />
                <BoxVertical gap={1} flexGrow={1}>
                    <TypographyBase variant="caption">{book.title}</TypographyBase>
                    <BoxHorizon gap={1}>
                        <Tooltip
                            title={tooltipTitle}
                            placement="right"
                            sx={{
                                zIndex: 9999,
                            }}
                            arrow
                        >
                            <Box
                                sx={{
                                    bgcolor: "grey.300",
                                    py: 0.1,
                                    px: 1,
                                }}
                            >
                                <TypographyBase variant="caption">
                                    {t("pages.cart.selectedEps", {
                                        count: eps.length,
                                    })}
                                </TypographyBase>
                            </Box>
                        </Tooltip>
                        <TypographyBase
                            variant="caption"
                            lineHeight={1}
                            sx={{
                                color: "#f44336",
                            }}
                        >
                            {totalPrice.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </TypographyBase>
                    </BoxHorizon>
                </BoxVertical>
                <CloseIcon
                    fontSize="small"
                    sx={{
                        cursor: "pointer",
                        color: "primary.dark",
                        mt: 0.5,
                    }}
                    onClick={onRemove}
                />
            </BoxHorizon>
        </BoxHorizon>
    );
};

export default ItemCartInMenu;
