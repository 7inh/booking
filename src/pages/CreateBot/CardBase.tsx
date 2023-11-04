import { sourceCard as sxSourceCard } from "src/components/Buttons/sx";
import { Box, BoxProps } from "@mui/material";

export interface CardBaseProps extends BoxProps {
    children: React.ReactNode;
    status?: "success" | "error" | "pending";
}

const CardBase = (props: CardBaseProps) => {
    const { children, status, ...rest } = props;

    return (
        <Box
            sx={{
                ...sxSourceCard,
                border: status && status !== "pending" ? "1px solid" : "none",
                borderColor:
                    status === "success" ? "success.main" : status === "error" ? "red" : "grey.300",
            }}
            {...rest}
        >
            {children}
        </Box>
    );
};

export default CardBase;
