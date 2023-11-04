import { Box, Typography } from "@mui/material";
import { IconKCoin, IconMessageV2 } from "src/components/Icons/IconExternal";

export interface BotPriceV2Props {
    price?: number;
    isSmall?: boolean;
}

const BotPriceV2 = (props: BotPriceV2Props) => {
    const { price, isSmall } = props;

    return (
        <Box
            sx={{
                bgcolor: "rgba(201, 208, 215, 0.40)",
                color: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: isSmall ? "7px 5px" : "10px 6px",
                pl: "10px",
                borderRadius: {
                    xs: "16px",
                    sm: "16px 0px 0px 16px",
                },
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
                    color: "black",
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

export default BotPriceV2;
