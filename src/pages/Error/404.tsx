import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
                        lineHeight: "48px",
                        color: "#212b36",
                    }}
                >
                    {t("pages.p404.title")}
                </Typography>
                <Box display="flex" gap={1}>
                    <Typography
                        sx={{
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#637381",
                        }}
                    >
                        {t("pages.p404.subTitle")}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: "400px",
                        height: "400px",
                        objectFit: "scale-down",
                        backgroundImage: "url('/404.svg'), url('/404_human.png')",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center, 70%",
                        backgroundSize: "contain, 30%",
                    }}
                ></Box>
                <ButtonBase onClick={() => navigate("/")} label={t("pages.p404.button")} />
            </Box>
        </Box>
    );
};

export default PageError404;
