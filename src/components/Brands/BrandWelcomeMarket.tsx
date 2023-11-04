import { Box, BoxProps, Typography } from "@mui/material";
import useTranslation from "src/hooks/utils/useTranslation";

export interface BrandWelcomeProps extends BoxProps {}

const BrandWelcome = (props: BrandWelcomeProps) => {
    const t = useTranslation();

    return (
        <Box
            sx={{
                width: "100%",
                height: "264px",
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
            }}
            {...props}
        >
            <Box
                ml={4}
                my={2}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                gap={2}
            >
                <Box>
                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: "24px",
                        }}
                    >
                        {t("branding.kamiStore.welcomeToKamiMind")}
                    </Typography>
                    <Typography my={1}>{t("branding.kamiStore.welcomeToKamiMindIntro")}</Typography>
                </Box>
            </Box>
            <Box width="30%" my={2}>
                <Box
                    sx={{
                        backgroundImage: "url(/home_vector_1.svg)",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "contain",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mx: 4,
                    }}
                >
                    <img src="/home_bot.svg" alt="" />
                </Box>
            </Box>

            <Box
                sx={{
                    top: "0",
                    position: "absolute",
                    background:
                        "linear-gradient(135deg, rgba(90, 255, 156, 0.49) 0%, #5A8DFF 100%)",
                    width: "100%",
                    height: "264px",
                    opacity: "0.2",
                    borderRadius: "16px",
                }}
            ></Box>
        </Box>
    );
};

export default BrandWelcome;
