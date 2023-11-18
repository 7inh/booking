import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BoxCenter from "src/components/Boxs/BoxCenter";
import ButtonBase from "src/components/Buttons/ButtonBase";
import useTranslation from "src/hooks/utils/useTranslation";

const PageError404 = () => {
    const t = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = t("pages.p404.title");
    }, [t]);

    return (
        <Box
            width="100vw"
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Box maxWidth="600px" width="100%">
                <Typography
                    sx={{
                        fontWeight: 700,
                        fontSize: "30px",
                        color: "#212b36",
                        textAlign: "center",
                    }}
                >
                    {t("pages.p404.title")}
                </Typography>
                <Typography
                    sx={{
                        fontWeight: 400,
                        fontSize: "16px",
                        color: "#637381",
                        textAlign: "center",
                    }}
                >
                    {t("pages.p404.subTitle")}
                </Typography>
                <br />
                <BoxCenter>
                    <Box
                        sx={{
                            width: "400px",
                            height: "400px",
                            objectFit: "scale-down",
                            backgroundImage: "url('/images/404.png')",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "contain",
                        }}
                    ></Box>
                </BoxCenter>
                <br />
                <BoxCenter>
                    <ButtonBase onClick={() => navigate("/")} label={t("pages.p404.button")} />
                </BoxCenter>
            </Box>
        </Box>
    );
};

export default PageError404;
