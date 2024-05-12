import { CardMedia } from "@mui/material";
import { ItemEpsType } from "src/common/types";
import BoxBase, { BoxBaseProps } from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import Icon from "src/components/Icons/Icon";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";

export interface ItemEpsProps extends BoxBaseProps {
    itemEps: ItemEpsType;
    mainView?: boolean;
    isSelected?: boolean;
}

const getBgColor = (quantity: number, isSelected: boolean) => {
    if (!quantity) return "#f5f5f5";
    if (isSelected) return "white";
    return "#f5f5f5";
};

const getBorderColorHover = (quantity: number, isSelected: boolean) => {
    if (!quantity) return "transparent";
    if (isSelected) return "primary.main";
    return "#1E88E5";
};

const ItemEps = ({
    itemEps,
    mainView = false,
    isSelected = false,
    sx,
    onClick,
    ...rest
}: ItemEpsProps) => {
    const { id, cover, eps_no, title, description, current_price, old_price, quantity } = itemEps;

    const t = useTranslation();

    return (
        <BoxBase
            sx={{
                position: "relative",
                display: "flex",
                cursor: quantity ? "pointer" : "not-allowed",
                ...(mainView
                    ? {
                          borderBottom: "1px solid #e0e0e0",
                          alignItems: "flex-end",
                          gap: 2,
                          pb: 2,
                      }
                    : {
                          bgcolor: getBgColor(quantity, isSelected),
                          alignItems: "center",
                          gap: 1,
                          p: 1,
                          border: "1px solid",
                          borderColor: isSelected ? "primary.main" : "transparent",
                          "&:hover": {
                              border: "1px solid",
                              borderColor: getBorderColorHover(quantity, isSelected),
                          },
                      }),
                ...sx,
            }}
            onClick={() => {
                if (quantity) onClick?.(itemEps);
            }}
            {...rest}
        >
            <BoxBase
                sx={{
                    display: isSelected ? "flex" : "none",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bgcolor: "primary.main",
                    clipPath: "polygon(0 0, 100% 0, 0 100%)",
                    width: "25px",
                    height: "25px",
                }}
            >
                <Icon
                    icon="material-symbols:check"
                    sx={{
                        color: "white",
                        mt: "-3px",
                        ml: "-2px",
                    }}
                />
            </BoxBase>
            <CardMedia
                component="img"
                src={mainView ? cover.replace("compact", "large") : cover}
                sx={{
                    objectFit: "scale-down",
                    bgcolor: "white",
                    ...(mainView
                        ? {
                              width: "200px",
                              height: "200px",
                              border: "1px solid #e0e0e0",
                          }
                        : {
                              width: "50px",
                              height: "50px",
                          }),
                }}
            />
            <BoxBase key={id}>
                <TypographyBase
                    sx={{
                        fontSize: mainView ? "1.5rem" : "0.9rem",
                        color: "primary.dark",
                        textTransform: mainView ? "uppercase" : "none",
                    }}
                >
                    {mainView ? title : ""} {t("common.eps")} - {eps_no} {description}
                </TypographyBase>
                {mainView ? (
                    <>
                        <BoxHorizon
                            sx={{
                                alignItems: "stretch",
                                flexWrap: "wrap",
                                columnGap: {
                                    xs: 0.5,
                                    sm: 1,
                                },
                                pt: 1.5,
                            }}
                        >
                            <TypographyBase
                                sx={{
                                    color: "primary.main",
                                    lineHeight: "1",
                                }}
                            >
                                {current_price.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </TypographyBase>
                            <TypographyBase
                                sx={{
                                    textDecoration: "line-through",
                                    fontWeight: 400,
                                    fontSize: "0.9rem",
                                    color: "text.disabled",
                                    lineHeight: "1",
                                }}
                            >
                                {old_price.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </TypographyBase>
                        </BoxHorizon>
                        <TypographyBase
                            sx={{
                                fontSize: "0.9rem",
                                color: "text.disabled",
                                lineHeight: "1",
                                mt: 1,
                            }}
                        >
                            {t("pages.book.quantity")}: {quantity}
                        </TypographyBase>
                    </>
                ) : !quantity ? (
                    <TypographyBase
                        sx={{
                            fontSize: "0.7rem",
                            color: "primary.main",
                            mt: 1,
                            lineHeight: "1",
                        }}
                    >
                        {t("pages.book.soldOut")}
                    </TypographyBase>
                ) : null}
            </BoxBase>
        </BoxBase>
    );
};

export default ItemEps;
