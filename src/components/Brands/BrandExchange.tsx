import { Box, BoxProps, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useTranslation from "src/hooks/utils/useTranslation";

export interface BrandExchangeProps extends BoxProps {}

const CoinStack = () => {
    return (
        <>
            <Box
                sx={{
                    width: "100px",
                    height: "80px",
                    top: "3%",
                    left: "2%",
                    backgroundImage: "url(/icons/coin1.svg)",
                    backgroundRepeat: "no-repeat",
                    position: "absolute",
                }}
            ></Box>
            <Box
                sx={{
                    width: "70px",
                    height: "70px",
                    top: 0,
                    right: "1%",
                    backgroundImage: "url(/icons/coin2.svg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    position: "absolute",
                }}
            ></Box>
            <Box
                sx={{
                    width: "90px",
                    height: "100px",
                    bottom: 0,
                    left: "1%",
                    backgroundImage: "url(/icons/coin3.svg)",
                    backgroundPosition: "bottom",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    position: "absolute",
                }}
            ></Box>
            <Box
                sx={{
                    width: "45px",
                    height: "45px",
                    top: "35%",
                    left: "70%",
                    backgroundImage: "url(/icons/coin4.svg)",
                    backgroundPosition: "bottom",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    position: "absolute",
                }}
            ></Box>
            <Box
                sx={{
                    width: "80px",
                    height: "60px",
                    bottom: 0,
                    left: "60%",
                    backgroundImage: "url(/icons/coin5.svg)",
                    backgroundPosition: "bottom",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    position: "absolute",
                }}
            ></Box>
        </>
    );
};

const Bubble = () => {
    return (
        <>
            <Box
                sx={{
                    width: "100px",
                    height: "100px",
                    bgcolor: "#F6D35C",
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
                    bgcolor: "#FFFFFF",
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
                    bgcolor: "#EBA596",
                    borderRadius: "50%",
                    position: "absolute",
                    left: "40%",
                    top: "-20%",
                    filter: "blur(30px)",
                }}
            ></Box>
            <Box
                sx={{
                    width: "50px",
                    height: "50px",
                    bgcolor: "#5D8F89",
                    borderRadius: "50%",
                    position: "absolute",
                    left: "40%",
                    top: "50%",
                    filter: "blur(40px)",
                }}
            ></Box>
        </>
    );
};

const BrandExchange = ({ sx, ...props }: BrandExchangeProps) => {
    const t = useTranslation();

    const navigate = useNavigate();

    return (
        <Box
            sx={{
                ...sx,
                bgcolor: "#E6BE7D",
                borderRadius: "16px",
                position: "relative",
                overflow: "hidden",
            }}
            {...props}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    gap: "8px",
                    zIndex: 1,
                    mx: 1,
                }}
            >
                <Box
                    sx={{
                        color: "white",
                        zIndex: 1,
                        textAlign: "center",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#212B36",
                        }}
                    >
                        {t("branding.kamiStore.buyKpoint")}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        bgcolor: "#FFFFFF",
                        borderRadius: "4px",
                        textAlign: "center",
                        verticalAlign: "middle",
                        zIndex: 1,
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/buy-point")}
                >
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                            letterSpacing: "-0.25px",
                            color: "#1D4A4F",
                            padding: "4px 16px",
                        }}
                    >
                        {t("common.buyNow")}
                    </Typography>
                </Box>
            </Box>
            <Bubble />
            <CoinStack />
        </Box>
    );
};

export default BrandExchange;
