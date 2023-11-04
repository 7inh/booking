import { Box, Typography } from "@mui/material";
import CardGift from "src/components/Cards/CardGift";
import CardPackage from "src/components/Cards/CardPackage";
import CardVoucher from "src/components/Cards/CardVoucher";
import useTranslation from "src/hooks/utils/useTranslation";

const MySubscription = () => {
    const t = useTranslation();

    return (
        <Box mt={3}>
            <Typography
                sx={{
                    fontSize: "20px",
                    fontWeight: 700,
                    mb: "8px",
                }}
            >
                {t("page.accountManagement.package")}
            </Typography>
            <CardPackage
                plan={{
                    amount: 0,
                    bought: false,
                    numBot: 0,
                    numLimitToken: 0,
                    price: 0,
                    productId: "a",
                    productName: "a",
                }}
                showState
                onClick={() => {}}
            />
            <br />
            <Typography
                sx={{
                    fontSize: "20px",
                    fontWeight: 700,
                    mb: "8px",
                }}
            >
                {t("page.accountManagement.gift")}
            </Typography>
            <CardGift
                plan={{
                    amount: 0,
                    bought: false,
                    numBot: 0,
                    numLimitToken: 0,
                    price: 0,
                    productId: "a",
                    productName: "a",
                }}
            />
            <br />
            <CardVoucher
                voucher={{
                    giftCode: "a",
                    expireTime: "10/12/2023 12:34:56",
                    increaseType: [
                        {
                            type: "POINT",
                            quantity: 1,
                            exchangeType: "NUMBER",
                        },
                        {
                            type: "BOT",
                            quantity: 1,
                            exchangeType: "NUMBER",
                        },
                        {
                            type: "TOKEN",
                            quantity: 1,
                            exchangeType: "NUMBER",
                        },
                    ],
                    state: "ACTIVE",
                    type: "VOUCHER",
                }}
            />
            <br />
            <br />
        </Box>
    );
};

export default MySubscription;
