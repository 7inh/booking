import { Box, Collapse, Typography } from "@mui/material";
import { useMemo } from "react";
import { Transaction } from "src/common/types";
import { useBoolean } from "src/hooks/utils/useBoolean";
import useTranslation from "src/hooks/utils/useTranslation";
import HistoryTransactionItem from "src/pages/Account/HistoryTransaction/HistoryTransactionItem";
import { v4 as uuidv4 } from "uuid";

export interface HistoryTransactionGroupProps {
    date: string;
    transactions: Transaction[];
}

const HistoryTransactionGroup = (props: HistoryTransactionGroupProps) => {
    const { date, transactions } = props;

    const t = useTranslation();

    const open = useBoolean(true);

    const renderTitle = useMemo(() => {
        if (date === "today" || date === "yesterday") return t(`common.${date}`);
        return date;
    }, [date, t]);

    return (
        <Box
            sx={{
                border: "1px solid rgba(145, 158, 171, 0.20)",
            }}
            data-testid="HistoryTransactionGroup__root"
        >
            <Box
                sx={{
                    bgcolor: "rgba(145, 158, 171, 0.30)",
                    userSelect: "none",
                    cursor: "pointer",
                }}
                onClick={open.onToggle}
            >
                <Typography
                    sx={{
                        px: 2,
                        py: 0.7,
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#5D5D75",
                    }}
                >
                    {renderTitle}
                </Typography>
            </Box>
            <Collapse in={open.value}>
                {transactions.map((transaction, idx) => (
                    <HistoryTransactionItem
                        key={uuidv4()}
                        transaction={transaction}
                        shouldBorderBottom={idx !== transactions.length - 1}
                    />
                ))}
            </Collapse>
        </Box>
    );
};

export default HistoryTransactionGroup;
