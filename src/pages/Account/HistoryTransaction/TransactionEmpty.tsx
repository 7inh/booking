import { Box, CardMedia, Typography } from "@mui/material";
import useTranslation from "src/hooks/utils/useTranslation";

const TransactionEmpty = () => {
    const t = useTranslation();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    textAlign: "center",
                    mb: 4,
                }}
            >
                <Typography
                    sx={{
                        fontSize: "20px",
                        fontWeight: 600,
                    }}
                >
                    {t("message.transactionEmpty")}
                </Typography>
            </Box>
            <CardMedia
                component="img"
                src="/svgs/transaction-empty.svg"
                sx={{
                    width: "100%",
                    maxWidth: "400px",
                    height: "auto",
                    mx: "auto",
                }}
            />
        </Box>
    );
};

export default TransactionEmpty;
