import { Box, BoxProps, Typography } from "@mui/material";
import useTranslation from "src/hooks/utils/useTranslation";

export interface BrandOfferProps extends BoxProps {}

const Bubble = () => {
    return (
        <>
            <Box
                sx={{
                    width: "100px",
                    height: "100px",
                    bgcolor: "#64CD87",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "-20%",
                    filter: "blur(30px)",
                }}
            ></Box>
            <Box
                sx={{
                    width: "70px",
                    height: "70px",
                    bgcolor: "#F6D35C",
                    borderRadius: "50%",
                    position: "absolute",
                    left: "20%",
                    filter: "blur(30px)",
                }}
            ></Box>
            <Box
                sx={{
                    width: "70px",
                    height: "70px",
                    bgcolor: "#D5EADE",
                    borderRadius: "50%",
                    position: "absolute",
                    left: "70%",
                    top: "30%",
                    filter: "blur(30px)",
                }}
            ></Box>
            <Box
                sx={{
                    width: "50px",
                    height: "50px",
                    bgcolor: "#64CD87",
                    borderRadius: "50%",
                    position: "absolute",
                    left: "40%",
                    top: "-20%",
                    filter: "blur(30px)",
                }}
            ></Box>
            <Box
                sx={{
                    width: "70px",
                    height: "70px",
                    bgcolor: "#5D8F89",
                    borderRadius: "50%",
                    position: "absolute",
                    left: "40%",
                    top: "50%",
                    filter: "blur(30px)",
                }}
            ></Box>
        </>
    );
};

const BrandOffer = ({ sx, ...props }: BrandOfferProps) => {
    const t = useTranslation();

    return (
        <Box
            sx={{
                ...sx,
                position: "relative",
                overflow: "hidden",
                bgcolor: "#3E8C6C",
                borderRadius: "16px",
            }}
            {...props}
        >
            <Bubble />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                }}
            >
                <Box
                    sx={{
                        color: "white",
                        zIndex: 1,
                        textAlign: "center",
                        mx: 1,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: 700,
                        }}
                    >
                        {t("branding.kamiStore.firstUser")}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "20px",
                            fontWeight: 700,
                            letterSpacing: "-0.75px",
                        }}
                    >
                        {t("branding.kamiStore.firstUserIntro")}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default BrandOffer;
