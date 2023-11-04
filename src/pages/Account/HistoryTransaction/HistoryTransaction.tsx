import { Box } from "@mui/material";
import { memo, useMemo } from "react";
import { groupTransactionByCreateTime } from "src/common/utils";
import { useTranslationContext } from "src/contexts/TranslationContext";
import useGetHistoryTransaction from "src/hooks/useGetHistoryTransaction";
import HistoryTransactionGroup from "src/pages/Account/HistoryTransaction/HistoryTransactionGroup";
import TransactionEmpty from "src/pages/Account/HistoryTransaction/TransactionEmpty";

export interface HistoryTransactionProps {
    walletId: string;
}

const HistoryTransaction = ({ walletId }: HistoryTransactionProps) => {
    const { locale } = useTranslationContext();
    const { data = [], isFetched } = useGetHistoryTransaction({ walletId });
    const [listDate, transactionsByDate] = useMemo(() => {
        const transactionsByDate = groupTransactionByCreateTime(data, locale);
        const listDate = Object.keys(transactionsByDate).sort(
            (a, b) => new Date(b).getTime() - new Date(a).getTime()
        );

        return [listDate, transactionsByDate];
    }, [data, locale]);

    return (
        <>
            <Box mt={4} />
            {listDate.map((date) => (
                <HistoryTransactionGroup
                    key={date}
                    date={date}
                    transactions={transactionsByDate[date]}
                />
            ))}
            {listDate.length === 0 && isFetched ? <TransactionEmpty /> : null}
            <Box pb={4} />
        </>
    );
};

export default memo(HistoryTransaction);
