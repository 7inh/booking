import { Box, BoxProps, Typography } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { getLanguageName } from "src/common/utils";
import { IconKCoin, IconStar } from "src/components/Icons/IconExternal";
import useTranslation from "src/hooks/utils/useTranslation";

export interface OverViewProps extends BoxProps {
    botProfile: any;
}

const OverView = ({ botProfile, sx, ...props }: OverViewProps) => {
    const { price, sales, language, avgStar } = botProfile;

    const t = useTranslation();

    const renderDataWithLabel = useCallback(
        (label: string, data: string | React.ReactNode, unit?: string | React.ReactNode) => {
            return (
                <Box>
                    <Box>
                        <Typography
                            sx={{
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#828282",
                            }}
                        >
                            {label}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            color: "black",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "28px",
                                lineHeight: 1,
                                fontWeight: 600,
                                textTransform: "none",
                            }}
                        >
                            {data}
                        </Typography>
                        {unit}
                    </Box>
                </Box>
            );
        },
        []
    );

    const renderPrice = useMemo(() => {
        return renderDataWithLabel(
            t("common.price"),
            price,
            <IconKCoin
                sx={{
                    width: "26px",
                    height: "26px",
                }}
            />
        );
    }, [price, renderDataWithLabel, t]);

    const renderPurchased = useMemo(() => {
        return renderDataWithLabel(t("common.purchased"), sales);
    }, [renderDataWithLabel, sales, t]);

    const renderLanguage = useMemo(() => {
        return renderDataWithLabel(t("common.language"), getLanguageName(language));
    }, [language, renderDataWithLabel, t]);

    const renderReviews = useMemo(() => {
        return renderDataWithLabel(
            t("common.reviews"),
            avgStar,
            <IconStar
                sx={{
                    width: "26px",
                    height: "26px",
                    color: "#FFC107",
                }}
            />
        );
    }, [avgStar, renderDataWithLabel, t]);

    return (
        <Box
            sx={{
                height: "90px",
                bgcolor: "#F5F5F5",
                borderRadius: "16px",
                ...sx,
            }}
            {...props}
        >
            <Box
                sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    mx: 5,
                    gap: 5,
                }}
            >
                {renderPrice}
                {renderPurchased}
                {renderLanguage}
                {renderReviews}
            </Box>
        </Box>
    );
};

export default OverView;
