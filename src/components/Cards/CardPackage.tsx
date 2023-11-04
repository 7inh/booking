import { LoadingButton } from "@mui/lab";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useMemo } from "react";
import { PackageType } from "src/common/types";
import { getExpireDate } from "src/common/utils";
import ButtonPrimary from "src/components/Buttons/ButtonPrimary";
import { IconProductChecked } from "src/components/Icons/IconExternal";
import { useTranslationContext } from "src/contexts/TranslationContext";
import useTranslation from "src/hooks/utils/useTranslation";
import { addDotToNumber } from "src/pages/BuyKcoin/utils";

export interface CardPackageProps {
    plan: PackageType;
    onClick: (plan: PackageType) => void;
    showState?: boolean;
    verified?: boolean;
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
            backgroundColor: "rgba(255, 75, 34, 0.20)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "36px",
        },
        typography: {
            fontSize: "20px",
            color: "primary.main",
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
                mx: "100px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
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

const CardPackage = (props: CardPackageProps) => {
    const { plan, onClick, showState, verified } = props;

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
            <Box
                sx={[
                    sx.body.product.container,
                    {
                        marginLeft: showState
                            ? {
                                  xs: "30px",
                                  sm: "60px",
                              }
                            : "",
                        marginRight: showState ? "0px" : "",
                    },
                ]}
            >
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
                <Box>
                    <ProductPrice value={plan.price} />
                    <br />
                    {product}
                    <br />
                    {showState ? (
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontWeight: 300,
                                color: "#A1A1A1",
                                mx: "20px",
                                ml: {
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
                    ) : null}
                </Box>
                {showState ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            pr: {
                                xs: "20px",
                                sm: "50px",
                            },
                        }}
                    >
                        <ButtonPrimary
                            sx={{
                                width: "fit-content",
                                px: "36px",
                                minWidth: "fit-content",
                            }}
                            label={t("page.accountManagement.cancelSubscription")}
                        ></ButtonPrimary>
                    </Box>
                ) : null}
            </Box>
        );
    }, [locale, plan.amount, plan.numBot, plan.numLimitToken, plan.price, showState, t]);

    const renderButton = useMemo(() => {
        return (
            <LoadingButton
                sx={verified ? sx.button.container(plan.bought) : sx.button.container(false)}
                onClick={() => onClick(plan)}
                disabled={plan.bought && verified}
            >
                <Typography sx={sx.button.typography}>
                    {plan.bought
                        ? verified
                            ? plan.productId === "com.kamimind.trial"
                                ? t("common.verified")
                                : t("page.buyKpoint.subscribed")
                            : t("auth.verifyNow")
                        : plan.productId === "enterprise"
                        ? t("common.contact")
                        : t("page.buyKpoint.subscribeNow")}
                </Typography>
            </LoadingButton>
        );
    }, [onClick, plan, t, verified]);

    return (
        <Box sx={sx.container}>
            {renderHeader}
            <br />
            {renderBody}
            <br />
            {showState ? null : (
                <>
                    {renderButton}
                    <br />
                </>
            )}
        </Box>
    );
};

export const ProductPrice = (props: {
    value: number | string;
    color?: string;
    unitOnly?: boolean;
}) => {
    const t = useTranslation();

    const { color, unitOnly = false } = props;
    if (typeof props.value === "string") {
        return (
            <Box sx={sx.body.price.container}>
                <Typography sx={{ ...sx.body.price.value, color }}>{props.value}</Typography>
            </Box>
        );
    }

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

export const ProductItem = (props: { value: PackageType["amount"]; unit: string }) => {
    const { value, unit } = props;
    return (
        <FormControlLabel
            sx={sx.body.product.formControl}
            control={<Checkbox checked={true} checkedIcon={<IconProductChecked />} />}
            label={
                <Box sx={sx.body.product.label.container}>
                    <Typography sx={sx.body.product.label.value}>
                        {typeof value === "string" ? value : addDotToNumber(value.toString(), ",")}
                    </Typography>
                    <Typography sx={sx.body.product.label.unit}>{unit}</Typography>
                </Box>
            }
        />
    );
};

export default CardPackage;
