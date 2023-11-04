import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useMemo } from "react";
import { GiftType } from "src/common/types";
import { getExpireDate } from "src/common/utils";
import { IconProductChecked } from "src/components/Icons/IconExternal";
import { useTranslationContext } from "src/contexts/TranslationContext";
import useTranslation from "src/hooks/utils/useTranslation";
import { addDotToNumber } from "src/pages/BuyKcoin/utils";

export interface CardGiftProps {
    plan: GiftType;
}

const sx = {
    container: {
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow:
            "0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)",
    },
    header: {
        container: {
            backgroundColor: "rgba(0, 167, 110, 0.20)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "36px",
        },
        typography: {
            fontSize: "20px",
            color: "#00A76E",
            fontWeight: 700,
            textTransform: "capitalize",
        },
    },
    body: {
        container: {
            padding: "16px",
        },
        price: {
            container: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
            },
            value: {
                fontSize: "25px",
                fontWeight: 700,
            },
            unit: (unitOnly = false) => ({
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#A1A1A1",
                fontSize: "14px",
                "& > p:first-of-type": {
                    fontSize: "10px",
                    ...(!unitOnly
                        ? {
                              marginBottom: "12px",
                              marginRight: "-2px",
                          }
                        : {}),
                },
            }),
        },
        product: {
            container: {
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                ml: "10px",
            },
            formControl: {
                "& > span:first-of-type": {
                    padding: "0",
                },
            },
            label: {
                container: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    marginLeft: "8px",
                },
                value: {
                    fontSize: "14px",
                    fontWeight: 600,
                },
                unit: {
                    fontSize: "14px",
                    fontWeight: 300,
                },
            },
        },
    },
    button: {
        container: (disabled: boolean) => ({
            backgroundColor: disabled ? "#A1A1A1" : "primary.main",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "fit-content",
            p: "8px 16px",
            borderRadius: "8px",
            mx: "auto",
            textTransform: "none",
            "&:hover": {
                backgroundColor: "primary.dark",
            },
        }),
        typography: {
            color: "white",
            fontSize: "14px",
            fontWeight: 500,
        },
    },
};

const CardGift = (props: CardGiftProps) => {
    const { plan } = props;

    const { locale } = useTranslationContext();
    const t = useTranslation();

    const renderHeader = useMemo(() => {
        return (
            <Box sx={sx.header.container}>
                <Typography sx={sx.header.typography}>{plan.productName}</Typography>
            </Box>
        );
    }, [plan.productName]);

    const renderBody = useMemo(() => {
        const product = (
            <Box sx={[sx.body.product.container, {}]}>
                <ProductItem value={plan.numBot} unit={t("page.buyKpoint.numBot")} />
                <ProductItem value={plan.amount} unit={t("page.buyKpoint.point")} />
                <ProductItem
                    value={plan.numLimitToken}
                    unit={t("page.buyKpoint.wordsPerKnowledgeBase")}
                />
            </Box>
        );

        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Box
                    sx={{
                        width: "fit-content",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        ml: {
                            xs: "20px",
                            sm: "50px",
                        },
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "20px",
                            fontWeight: 700,
                        }}
                    >
                        {t("page.accountManagement.codeGift")}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "32px",
                            fontWeight: 700,
                            color: "#00A76E",
                        }}
                    >
                        ANDKB8930
                    </Typography>
                </Box>
                <Box
                    sx={{
                        ml: {
                            xs: "20px",
                            sm: "50px",
                        },
                    }}
                >
                    <ProductPrice value={plan.price} />
                    <br />
                    {product}
                    <br />
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: 300,
                            color: "#A1A1A1",
                            mr: {
                                xs: "20px",
                                sm: "50px",
                            },
                        }}
                    >
                        {t("page.buyKpoint.yourVoucherWillBeExpiredOn")}{" "}
                        <Typography
                            component="span"
                            sx={{
                                fontSize: "14px",
                                fontWeight: 500,
                                color: "#2A2A2A",
                                my: "10px",
                            }}
                        >
                            {getExpireDate(locale)}
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        );
    }, [locale, plan.amount, plan.numBot, plan.numLimitToken, plan.price, t]);

    return (
        <Box sx={sx.container}>
            {renderHeader}
            <br />
            {renderBody}
            <br />
        </Box>
    );
};

export const ProductPrice = (props: { value: number; color?: string; unitOnly?: boolean }) => {
    const t = useTranslation();

    const { color, unitOnly = false } = props;
    return (
        <Box sx={sx.body.price.container}>
            <Typography sx={{ ...sx.body.price.value, color }}>
                {addDotToNumber(props.value.toString())}
            </Typography>
            <Box sx={sx.body.price.unit(unitOnly)}>
                <Typography>VNĐ</Typography>
                {unitOnly ? null : (
                    <Typography>/{t("common.month").toLocaleLowerCase()}</Typography>
                )}
            </Box>
        </Box>
    );
};

export const ProductItem = (props: { value: number; unit: string }) => {
    const { value, unit } = props;
    return (
        <FormControlLabel
            sx={sx.body.product.formControl}
            control={
                <Checkbox
                    checked={true}
                    checkedIcon={
                        <IconProductChecked
                            sx={{
                                color: "#00A76E",
                            }}
                        />
                    }
                />
            }
            label={
                <Box sx={sx.body.product.label.container}>
                    <Typography sx={sx.body.product.label.value}>
                        {addDotToNumber(value.toString(), ",")}
                    </Typography>
                    <Typography sx={sx.body.product.label.unit}>{unit}</Typography>
                </Box>
            }
        />
    );
};

export default CardGift;
