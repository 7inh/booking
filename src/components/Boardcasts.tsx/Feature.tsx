import { CardMedia } from "@mui/material";
import { PAGE_MAX_WIDTH } from "src/common/const";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";

const Feature = () => {
    const t = useTranslation();
    return (
        <BoxHorizon
            sx={{
                maxWidth: PAGE_MAX_WIDTH,
                mx: "auto",
                justifyContent: "space-between",
                width: "100%",
                my: 10,
                gap: 3,
                flexWrap: "wrap",
                pr: 1,
                boxSizing: "border-box",
                "& > div": {
                    flexShrink: 0,
                },
            }}
        >
            <BoxHorizon gap={1}>
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
            <BoxHorizon>
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
                    <TypographyBase variant="body2">{t("feature.quality.subTitle")}</TypographyBase>
                </BoxBase>
            </BoxHorizon>
            <BoxHorizon gap={1}>
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
                    <TypographyBase variant="body2">{t("feature.service.subTitle")}</TypographyBase>
                </BoxBase>
            </BoxHorizon>
        </BoxHorizon>
    );
};

export default Feature;
