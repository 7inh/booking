import { Box, BoxProps, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SvgColor from "src/components/SvgColor/SvgColor";
import useTranslation from "src/hooks/utils/useTranslation";

export interface BrandOfferProps extends BoxProps {}

const Bubble = () => {
    return (
        <>
            <Box
                sx={{
                    width: "50px",
                    height: "50px",
                    bgcolor: "#FCBB19",
                    borderRadius: "50%",
                    position: "absolute",
                    left: "3%",
                    top: "-3%",
                    filter: "blur(15px)",
                }}
            ></Box>
            <Box
                sx={{
                    width: "50px",
                    height: "50px",
                    bgcolor: "#FE7055",
                    borderRadius: "50%",
                    position: "absolute",
                    left: "12%",
                    top: "17%",
                    filter: "blur(20px)",
                }}
            ></Box>
            <Box
                sx={{
                    width: "40px",
                    height: "60px",
                    bgcolor: "#FFB93E",
                    borderRadius: "50%",
                    position: "absolute",
                    left: "70%",
                    top: "35%",
                    filter: "blur(20px)",
                }}
            ></Box>
            <Box
                sx={{
                    width: "50px",
                    height: "50px",
                    bgcolor: "#FFB93E",
                    borderRadius: "50%",
                    position: "absolute",
                    left: "25%",
                    top: "-15%",
                    filter: "blur(20px)",
                }}
            ></Box>
            <Box
                sx={{
                    width: "30px",
                    height: "50px",
                    bgcolor: "#FFFFFF",
                    borderRadius: "50%",
                    position: "absolute",
                    left: "65%",
                    top: "35%",
                    filter: "blur(20px)",
                }}
            ></Box>
        </>
    );
};

const IconTwinkle = () => {
    return (
        <>
            <SvgColor
                sx={{
                    width: "150px",
                    height: "150px",
                    color: "#FFF2CF",
                    position: "absolute",
                    left: "55%",
                    top: "25%",
                }}
                src={"/icons/6angle.svg"}
            />
            <SvgColor
                sx={{
                    width: "25px",
                    height: "25px",
                    color: "#FFB93E",
                    position: "absolute",
                    left: "75%",
                    top: "10%",
                }}
                src={"/icons/twinkle.svg"}
            />
            <SvgColor
                sx={{
                    width: "20px",
                    height: "20px",
                    color: "#FDCA55",
                    position: "absolute",
                    left: "5%",
                    top: "70%",
                }}
                src={"/icons/twinkle.svg"}
            />
            <SvgColor
                sx={{
                    width: "20px",
                    height: "20px",
                    color: "#FFF2CF",
                    position: "absolute",
                    left: "87%",
                    top: "45%",
                }}
                src={"/icons/twinkle.svg"}
            />
            <SvgColor
                sx={{
                    width: "10px",
                    height: "10px",
                    color: "#FFF2CF",
                    position: "absolute",
                    left: "17%",
                    top: "10%",
                }}
                src={"/icons/x.svg"}
            />
        </>
    );
};

const BrandGiftCode = ({ sx, ...props }: BrandOfferProps) => {
    const t = useTranslation();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                ...sx,
                position: "relative",
                overflow: "hidden",
                bgcolor: "#FFEBB5",
                borderRadius: "16px",
            }}
            {...props}
        >
            <Bubble />
            <IconTwinkle />
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
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "24px",
                            fontWeight: 700,
                            color: "#1D4A4F",
                            lineHeight: 1.5,
                        }}
                    >
                        {t("branding.kamiStore.enterGiftCodeTitle")}
                    </Typography>
                    <Box
                        sx={{
                            bgcolor: "#FFFFFF",
                            borderRadius: "30px",
                            textAlign: "center",
                            verticalAlign: "middle",
                            zIndex: 1,
                            cursor: "pointer",
                            width: "fit-content",
                        }}
                        onClick={() => navigate("/gift-code")}
                    >
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontWeight: 600,
                                color: "#1D4A4F",
                                p: "4px 30px",
                            }}
                        >
                            {t("branding.kamiStore.enterGiftCode")}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default BrandGiftCode;
