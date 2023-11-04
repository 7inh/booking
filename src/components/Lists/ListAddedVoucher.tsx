import { Box } from "@mui/material";
import { VoucherType } from "src/common/types";
import CardVoucherTicket from "src/components/Cards/CardVoucherTicket";

export interface ListAddedVoucherProps {
    vouchers: VoucherType[];
    onDelete?: (voucher: VoucherType) => void;
}

const ListAddedVoucher = (props: ListAddedVoucherProps) => {
    const { vouchers, onDelete } = props;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
            }}
        >
            {vouchers.map((voucher) => (
                <CardVoucherTicket
                    key={voucher.giftCode}
                    voucher={voucher}
                    onDelete={() => onDelete?.(voucher)}
                />
            ))}
        </Box>
    );
};

export default ListAddedVoucher;
