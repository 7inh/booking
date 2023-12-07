import { CardMedia } from "@mui/material";
import { PAGE_MAX_WIDTH } from "src/common/const";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";

const Feature = () => {
    const t = useTranslation();
    return (
        <BoxBase
            sx={{
                maxWidth: PAGE_MAX_WIDTH,
                mx: "auto",
            }}
        >
            <BoxBase
                sx={{
                    px: 1,
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "1fr 1fr 1fr",
                    },
                    justifyContent: "space-between",
                    width: "100%",
                    my: 10,
                    gap: 3,
                    pr: 1,
                    boxSizing: "border-box",
                    "& > div": {
                        flexShrink: 0,
                    },
                }}
            >
                <BoxHorizon
                    gap={1}
                    sx={{
                        width: "100%",
                    }}
                >
                    <CardMedia
                        component="img"
                        src="/images/delivery.png"
                        sx={{
                            width: "70px",
                            height: "70px",
                            objectFit: "contain",
                        }}
                    />
                    <BoxBase mt={1}>
                        <TypographyBase variant="h6">{t("feature.delivery.title")}</TypographyBase>
                        <TypographyBase variant="body2">
                            {t("feature.delivery.subTitle")}
                        </TypographyBase>
                    </BoxBase>
                </BoxHorizon>
                <BoxHorizon
                    sx={{
                        width: "100%",
                        gap: 1,
                    }}
                >
                    <CardMedia
                        component="img"
                        src="/images/quality.png"
                        sx={{
                            width: "70px",
                            height: "70px",
                            objectFit: "contain",
                        }}
                    />
                    <BoxBase mt={1}>
                        <TypographyBase variant="h6">{t("feature.quality.title")}</TypographyBase>
                        <TypographyBase
                            variant="body2"
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
                            {t("feature.quality.subTitle")}
                        </TypographyBase>
                    </BoxBase>
                </BoxHorizon>
                <BoxHorizon
                    gap={1}
                    sx={{
                        width: "100%",
                    }}
                >
                    <CardMedia
                        component="img"
                        src="/images/rate.png"
                        sx={{
                            width: "70px",
                            height: "70px",
                            objectFit: "contain",
                        }}
                    />
                    <BoxBase mt={1}>
                        <TypographyBase variant="h6">{t("feature.service.title")}</TypographyBase>
                        <TypographyBase variant="body2">
                            {t("feature.service.subTitle")}
                        </TypographyBase>
                    </BoxBase>
                </BoxHorizon>
            </BoxBase>
        </BoxBase>
    );
};

export default Feature;
