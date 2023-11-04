import { Box, BoxProps, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useTranslation from "src/hooks/utils/useTranslation";

export interface BrandExchangeProps extends BoxProps {
    spaceBetween?: string;
    padding?: string;
}

const CoinStack = () => {
    return (
        <>
            <Box
                sx={{
                    width: "20px",
                    height: "20px",
                    top: 0,
                    left: "60%",
                    backgroundImage: "url(/icons/coin2.svg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    position: "absolute",
                    filter: "blur(0.7px)",
                }}
            ></Box>
            <Box
                sx={{
                    width: "30px",
                    height: "50px",
                    bottom: "10%",
                    left: "12%",
                    backgroundImage: "url(/icons/coin4.svg)",
                    backgroundPosition: "bottom",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    position: "absolute",
                }}
            ></Box>
            <Box
                sx={{
                    width: "30px",
                    height: "30px",
                    bottom: 0,
                    left: "80%",
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

const BrandExchangeV2 = ({
    sx,
    spaceBetween = "8px",
    padding = "0px",
    ...props
}: BrandExchangeProps) => {
    const t = useTranslation();

    const navigate = useNavigate();

    return (
        <Box
            sx={{
                bgcolor: "rgba(255, 183, 0, 0.26)",
                borderRadius: "16px",
                position: "relative",
                overflow: "hidden",
                ...sx,
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
                    gap: spaceBetween,
                    zIndex: 1,
                    mx: 1,
                    padding: padding,
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
                        {t("branding.chat.buyKpoint")}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        borderRadius: "4px",
                        textAlign: "center",
                        verticalAlign: "middle",
                        zIndex: 1,
                        cursor: "pointer",
                        bgcolor: "primary.main",
                    }}
                    onClick={() => navigate("/buy-point")}
                >
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                            letterSpacing: "-0.25px",
                            color: "white",
                            padding: "4px 16px",
                        }}
                    >
                        {t("common.buyNow")}
                    </Typography>
                </Box>
            </Box>
            <CoinStack />
        </Box>
    );
};

export default BrandExchangeV2;
