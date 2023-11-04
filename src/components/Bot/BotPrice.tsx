import { Box, BoxProps, Typography } from "@mui/material";
import ContainerRow from "src/components/Containers/ContainerRow";
import { IconKCoin, IconMessage } from "src/components/Icons/IconExternal";

export interface BotPriceProps extends BoxProps {
    price?: number;
}

const BotPrice = ({ price, ...props }: BotPriceProps) => {
    return (
        <Box
            sx={{
                bgcolor: "#3E8C6C",
                borderRadius: "8px",
                minWidth: "95px",
                height: "32px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
            {...props}
        >
            <Box
                sx={{
                    width: "38px",
                    height: "32px",
                    borderRadius: "8px",
                    bgcolor: "#64CD87",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box color="#3E8C6C" mt={0.6}>
                    <IconMessage />
                </Box>
            </Box>
            <ContainerRow gap={0.5} color="white" mx={0.75}>
                <Typography
                    sx={{
                        fontSize: "16px",
                        fontWeight: 700,
                        lineHeight: "22px",
                    }}
                >
                    {price}
                </Typography>
                <IconKCoin />
            </ContainerRow>
        </Box>
    );
};

export default BotPrice;
