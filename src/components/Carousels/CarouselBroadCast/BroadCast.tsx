import { Box, BoxProps, Typography } from "@mui/material";
import useTranslation from "src/hooks/utils/useTranslation";

export interface BroadCastProps extends BoxProps {
    currentIdx: number;
}

const BroadCast = ({ sx, ...props }: BroadCastProps) => {
    const t = useTranslation();

    return (
        <Box
            sx={{
                backgroundImage: "url(/home_1.png)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "164px",
                width: "100%",
                borderRadius: "16px",
                overflow: "hidden",
                display: "flex",
                alignItems: "end",
                justifyContent: "start",
                position: "relative",
                ...sx,
            }}
            {...props}
        >
            <Box display="flex" flexDirection="column" gap={0.5} mx={2} my={2} zIndex={1}>
                <Typography
                    sx={{
                        textTransform: "uppercase",
                        color: "rgba(91, 154, 228, 1)",
                        fontWeight: 700,
                        fontSize: "12px",
                    }}
                >
                    {t("branding.kamiStore.featureApp")}
                </Typography>
                <Typography
                    sx={{
                        color: "white",
                        fontWeight: 700,
                        fontSize: "20px",
                    }}
                >
                    {t("branding.kamiStore.featureAppIntro")}
                </Typography>
                <Typography
                    sx={{
                        color: "white",
                        fontWeight: 400,
                        fontSize: "14px",
                    }}
                >
                    {t("branding.kamiStore.featureAppNavigation")}
                </Typography>
            </Box>
            <Box
                sx={{
                    top: "0",
                    position: "absolute",
                    background: "linear-gradient(180deg, rgba(0, 0, 0, 0) -1.23%, #000000 80%);",
                    width: "100%",
                    height: "164px",
                    borderRadius: "16px",
                }}
            ></Box>
        </Box>
    );
};

export default BroadCast;
