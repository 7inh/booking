import { Box, Typography } from "@mui/material";
import { IconKCoin, IconMessageV2 } from "src/components/Icons/IconExternal";

export interface BotPriceV3Props {
    price?: number;
    isSmall?: boolean;
}

const BotPriceV3 = (props: BotPriceV3Props) => {
    const { price, isSmall } = props;

    return (
        <Box
            sx={{
                color: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <IconMessageV2
                sx={{
                    width: isSmall ? "16px" : "20px",
                    height: isSmall ? "16px" : "20px",
                    mr: 0.7,
                }}
            />
            <Box
                sx={{
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "center",
                }}
            >
                <Typography
                    sx={{
                        fontSize: isSmall ? "14px" : "18px",
                        fontWeight: 500,
                        lineHeight: 0.92,
                        mx: 0.2,
                    }}
                >
                    {price}
                </Typography>
                <IconKCoin
                    sx={{
                        width: isSmall ? "12px" : "15px",
                        height: isSmall ? "12px" : "15px",
                    }}
                />
            </Box>
        </Box>
    );
};

export default BotPriceV3;
