import { CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PAGE_MAX_WIDTH } from "src/common/const";
import BoxBase from "src/components/Boxs/BoxBase";
import ButtonBase from "src/components/Buttons/ButtonBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import { useBoolean } from "src/hooks/utils/useBoolean";
import { useResponsive } from "src/hooks/utils/useResponsive";
import useTranslation from "src/hooks/utils/useTranslation";

const Branding = () => {
    const t = useTranslation();
    const navigate = useNavigate();

    const mdDown = useResponsive("down", "md");
    const isBigImageLoaded = useBoolean(false);

    return (
        <BoxBase
            sx={{
                height: "calc(100vh - 268px)",
                maxHeight: mdDown ? "600px" : "800px",
                position: "relative",
                bgcolor: "primary.main",
                overflow: "hidden",
            }}
        >
            {/* <Particles /> */}
            <BoxBase
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    maxHeight: "inherit",
                    bgcolor: "white",
                    zIndex: 1000,
                    opacity: isBigImageLoaded.value ? 0 : 1,
                    pointerEvents: "none",
                    transition: "opacity 0.5s",
                }}
            ></BoxBase>
            <CardMedia
                component="img"
                src="/images/bg.jpg"
                sx={{
                    objectFit: "cover",
                    position: "absolute",
                    height: "100%",
                }}
                onLoad={isBigImageLoaded.onTrue}
            />
            <BoxBase
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    maxHeight: "inherit",
                    bgcolor: "rgba(0,0,0,0.6)",
                    backdropFilter: "blur(1px)",
                }}
            ></BoxBase>
            <BoxBase
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "100%",
                    maxWidth: PAGE_MAX_WIDTH,
                    mx: "auto",
                    px: 1,
                    gap: "24px",
                    textAlign: "center",
                    boxSizing: "border-box",
                    userSelect: "none",
                    pointerEvents: "none",
                }}
            >
                <BoxBase
                    sx={{
                        zIndex: 1,
                        mx: "auto",
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
                            mx: "auto",
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
                            boxShadow: "none",
                            "&:hover": {
                                color: "secondary.main",
                                boxShadow: "none",
                            },
                        }}
                        onClick={() => {
                            navigate("/shop");
                        }}
                    />
                </BoxBase>
            </BoxBase>
        </BoxBase>
    );
};

export default Branding;
