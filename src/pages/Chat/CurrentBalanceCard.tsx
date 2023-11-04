import { Box, Typography } from "@mui/material";
import { IconKCoin } from "src/components/Icons/IconExternal";
import { useAccountContext } from "src/contexts/AccountContext";
import useGetUserWallet from "src/hooks/useGetUserWallet";
import useTranslation from "src/hooks/utils/useTranslation";

export interface CurrentBalanceCardProps {}

const CurrentBalanceCard = () => {
    const t = useTranslation();
    const { detail } = useAccountContext();

    const { data: userWallet } = useGetUserWallet({
        walletId: detail?.walletId || "",
    });
    const availableMoney = userWallet?.availableMoney || 0;

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                p: "10px 6px",
                pl: "10px",
            }}
        >
            <Typography
                sx={{
                    fontSize: "18px",
                    fontWeight: 500,
                }}
            >
                {t("common.yourCurrentBalance")}:
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "start",
                    ml: "10px",
                    color: "primary.main",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "25px",
                        fontWeight: "600",
                        lineHeight: "1",
                    }}
                >
                    {availableMoney}
                </Typography>
                <IconKCoin />
            </Box>
        </Box>
    );
};

export default CurrentBalanceCard;
