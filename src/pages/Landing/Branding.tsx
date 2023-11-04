import CardMedia from "@mui/material/CardMedia";
import { PAGE_MAX_WIDTH } from "src/common/const";
import Particles from "src/components/AnimateBackgrounds/Particles";
import BoxBase from "src/components/Boxs/BoxBase";
import ButtonBase from "src/components/Buttons/ButtonBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";

const Branding = () => {
    const t = useTranslation();
    return (
        <BoxBase
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "100vh",
                maxHeight: "800px",
                maxWidth: PAGE_MAX_WIDTH,
                mx: "auto",
            }}
        >
            <Particles />
            <BoxBase zIndex={2}>
                <BoxBase
                    maxWidth="80%"
                    sx={{
                        pointerEvents: "none",
                        userSelect: "none",
                    }}
                >
                    <TypographyBase variant="h2" fontWeight={600} color="white">
                        {t("pages.home.branding.title")}
                    </TypographyBase>
                    <BoxBase
                        sx={{
                            height: "5px",
                            width: "100%",
                            maxWidth: "200px",
                            bgcolor: "primary.main",
                            my: "24px",
                        }}
                    ></BoxBase>
                    <TypographyBase variant="body1" fontWeight={200} color="white">
                        {t("pages.home.branding.subTitle")}
                    </TypographyBase>
                </BoxBase>
                <br />
                <ButtonBase
                    label={t("pages.home.branding.button")}
                    rounded
                    sx={{
                        fontSize: "1.2rem",
                        height: "48px",
                        width: "200px",
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
                }}
                image={"/images/branding.jpeg"}
            />
        </BoxBase>
    );
};

export default Branding;
