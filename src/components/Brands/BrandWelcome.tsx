import { Box, BoxProps, Typography } from "@mui/material";
import useTranslation from "src/hooks/utils/useTranslation";

export interface BrandWelcomeProps extends BoxProps {}

const BrandWelcome = () => {
    const t = useTranslation();

    return (
        <Box
            sx={{
                width: "100%",
                height: "264px",
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
                bgcolor: "linear-gradient(135deg, #FF4B22 0%, #FCFF5A 100%)",
            }}
        >
            <Box
                width="40%"
                sx={{
                    p: 2,
                    pb: 0,
                    boxSizing: "border-box",
                }}
            >
                <Box
                    sx={{
                        backgroundImage: "url(/branding_1.svg)",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "contain",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                ></Box>
            </Box>
            <Box display="flex" justifyContent="start" gap={2} alignItems="center" flexGrow={1}>
                <Box textAlign="center">
                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: "30px",
                            color: "#004B50",
                            lineHeight: 1,
                        }}
                    >
                        {t("branding.kamiStore.welcomeToKamiMind")}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "16px",
                            color: "#004B50",
                            fontWeight: 200,
                        }}
                    >
                        {t("branding.kamiStore.welcomeToKamiMindIntro")}
                    </Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    top: "0",
                    position: "absolute",
                    background: "linear-gradient(135deg, #FF4B22 0%, #FCFF5A 100%)",
                    width: "100%",
                    height: "264px",
                    opacity: "0.2",
                    borderRadius: "16px",
                    zIndex: -1,
                }}
            ></Box>
        </Box>
    );
};

export default BrandWelcome;
