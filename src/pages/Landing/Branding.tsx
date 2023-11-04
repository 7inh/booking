import CardMedia from "@mui/material/CardMedia";
import { PAGE_MAX_WIDTH } from "src/common/const";
import Particles from "src/components/AnimateBackgrounds/Particles";
import BoxBase from "src/components/Boxs/BoxBase";
import ButtonBase from "src/components/Buttons/ButtonBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import { useResponsive } from "src/hooks/utils/useResponsive";
import useTranslation from "src/hooks/utils/useTranslation";

const Branding = () => {
    const t = useTranslation();

    const mdDown = useResponsive("down", "md");

    return (
        <BoxBase
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "100vh",
                maxHeight: mdDown ? "600px" : "800px",
                maxWidth: PAGE_MAX_WIDTH,
                mx: "auto",
                px: 1,
                boxSizing: "border-box",
                position: "relative",
                gap: "24px",
                textAlign: mdDown ? "center" : "left",
            }}
        >
            <Particles />
            <BoxBase
                maxWidth={mdDown ? "100%" : "500px"}
                sx={{
                    zIndex: 2,
                    userSelect: "none",
                    pointerEvents: "none",
                }}
            >
                <TypographyBase
                    fontWeight={600}
                    color="white"
                    variant="h2"
                    sx={{
                        fontSize: mdDown ? "3rem" : "4rem",
                    }}
                >
                    {t("pages.home.branding.title")}
                </TypographyBase>
                <BoxBase
                    sx={{
                        height: "5px",
                        width: "100%",
                        maxWidth: "200px",
                        bgcolor: "primary.main",
                        my: "24px",
                        mx: mdDown ? "auto" : "",
                    }}
                />
                <TypographyBase variant="body1" fontWeight={200} color="white">
                    {t("pages.home.branding.subTitle")}
                </TypographyBase>
                <br />
                <ButtonBase
                    label={t("pages.home.branding.button")}
                    rounded
                    sx={{
                        fontSize: "1.2rem",
                        height: "48px",
                        width: "200px",
                        pointerEvents: "all",
                    }}
                />
            </BoxBase>

            <CardMedia
                component="img"
                sx={{
                    height: "60vh",
                    maxHeight: "600px",
                    width: "auto",
                    zIndex: 1,
                    display: mdDown ? "none" : "block",
                }}
                image={"/images/branding.jpeg"}
            />
        </BoxBase>
    );
};

export default Branding;
