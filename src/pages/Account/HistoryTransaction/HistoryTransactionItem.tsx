import { Box, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { Transaction } from "src/common/types";
import { getOperatorSymbol, toTimeString } from "src/common/utils";
import { useTranslationContext } from "src/contexts/TranslationContext";
import useTranslation from "src/hooks/utils/useTranslation";
import { addDotToNumber } from "src/pages/BuyKcoin/utils";

export interface HistoryTransactionItemProps {
    transaction: Transaction;
    shouldBorderBottom?: boolean;
}

const HistoryTransactionItem = (props: HistoryTransactionItemProps) => {
    const {
        transaction: { title, expireTime, type, price, detail },
        shouldBorderBottom = true,
    } = props;

    const { locale } = useTranslationContext();
    const t = useTranslation();

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "stretch",
                borderBottom: shouldBorderBottom ? "1px solid rgba(145, 158, 171, 0.20)" : "none",
                p: 2,
            }}
            data-testid="HistoryTransactionItem__root"
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        gap: "8px",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "18px",
                            fontWeight: 400,
                            color: "#0B151F",
                        }}
                    >
                        {t(`page.accountManagement.historyTransaction.${type}`)}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "20px",
                            fontWeight: 700,
                            color: "primary.main",
                            textTransform: type === "PACKAGE" ? "capitalize" : "none",
                        }}
                    >
                        {title}
                    </Typography>
                </Box>
                <Typography
                    sx={{
                        fontSize: "14px",
                        fontWeight: 300,
                        color: "#95A3B1",
                    }}
                    data-testid="HistoryTransactionItem__expireTime"
                >
                    {expireTime
                        ? t("page.buyKpoint.yourVoucherWillBeExpiredOn") +
                          " " +
                          toTimeString(
                              locale,
                              DateTime.fromFormat(expireTime, "dd/MM/yyyy HH:mm:ss")
                          )
                        : t("message.transactionExpired")}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        gap: "8px",
                        justifyContent: "flex-end",
                    }}
                    data-testid="HistoryTransactionItem__price"
                >
                    <Typography
                        sx={{
                            color: "black",
                            fontSize: "25px",
                            fontWeight: 500,
                            lineHeight: 1,
                        }}
                    >
                        {price ? addDotToNumber(price.toString(), ",") : 0}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#A1A1A1",
                        }}
                    >
                        VND
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        sx={{
                            textAlign: "right",
                            color: "#95A3B1",
                            fontSize: "14px",
                            fontWeight: 300,
                        }}
                        data-testid="HistoryTransactionItem__detail"
                    >
                        {t("page.buyKpoint.accountIncrease")}:{" "}
                        {detail
                            .map(
                                (item) =>
                                    `${getOperatorSymbol(item.amount)}${item.amount} ` +
                                    t("page.buyKpoint.voucherType." + item.type)
                            )
                            .join(", ")}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default HistoryTransactionItem;
