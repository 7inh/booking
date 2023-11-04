import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PackageType, VoucherType } from "src/common/types";
import { getExpireDate, toCapitalize } from "src/common/utils";
import ButtonPrimary from "src/components/Buttons/ButtonPrimary";
import { ProductItem, ProductPrice } from "src/components/Cards/CardPackage";
import FormAddVoucher from "src/components/Forms/FormAddVoucher";
import ListAddedVoucher from "src/components/Lists/ListAddedVoucher";
import { useTranslationContext } from "src/contexts/TranslationContext";
import useTranslation from "src/hooks/utils/useTranslation";
import { replaceStringToLink } from "src/pages/Login/utils";

export interface DialogVoucherProps {
    open: boolean;
    plan: PackageType;
    onClose: () => void;
    onConfirm: (giftCodes: string[]) => void;
}

const DialogVoucher = (props: DialogVoucherProps) => {
    const { open, plan, onClose, onConfirm } = props;

    const { locale } = useTranslationContext();
    const t = useTranslation();

    const [vouchersAdded, setVouchersAdded] = useState<VoucherType[]>([]);

    const product = (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: "100%",
            }}
        >
            <ProductItem value={plan.numBot} unit={t("page.buyKpoint.numBot")} />
            <ProductItem value={plan.amount} unit={t("page.buyKpoint.point")} />
            <ProductItem
                value={plan.numLimitToken}
                unit={t("page.buyKpoint.wordsPerKnowledgeBase")}
            />
        </Box>
    );

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                style: { borderRadius: 16, width: "100%", maxWidth: 450, padding: 0 },
            }}
        >
            <DialogTitle
                sx={{
                    p: 2.25,
                    pb: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "20px",
                        fontWeight: 600,
                        textAlign: "left",
                        color: "#A1A1A1",
                    }}
                >
                    {t("dialog.buyPackageVoucher.title")}
                </Typography>
                <Box
                    sx={{
                        mr: "-10px",
                    }}
                >
                    <IconButton onClick={onClose} size="small">
                        <CloseRoundedIcon
                            sx={{
                                width: "34px",
                                height: "34px",
                                color: "#A1A1A1",
                            }}
                            fontSize="small"
                        />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent
                sx={{
                    p: 2.25,
                    pb: 0,
                    "::-webkit-scrollbar": {
                        width: "3px",
                    },
                    "::-webkit-scrollbar-track": {
                        background: "#f1f1f1",
                    },
                    "::-webkit-scrollbar-thumb": {
                        bgcolor: "primary.main",
                    },
                    "::-webkit-scrollbar-thumb:hover": {
                        background: "#555",
                    },
                }}
            >
                <Box
                    sx={{
                        border: "1px solid rgba(145, 158, 171, 0.20)",
                        borderRadius: "16px",
                    }}
                >
                    <Box
                        sx={{
                            borderBottom: "1px solid rgba(145, 158, 171, 0.20)",
                        }}
                    >
                        <Typography
                            sx={{
                                mx: "20px",
                                fontSize: "20px",
                                color: "black",
                                fontWeight: 600,
                                py: "10px",
                            }}
                        >
                            {toCapitalize(plan.productName)}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            mx: "30px",
                            my: "12px",
                        }}
                    >
                        {product}
                    </Box>
                </Box>
                <Box>
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: 300,
                            color: "#A1A1A1",
                            my: "10px",
                        }}
                    >
                        {t("page.buyKpoint.yourVoucherWillBeExpiredOn")}{" "}
                        <Typography
                            component="span"
                            sx={{
                                fontSize: "14px",
                                fontWeight: 500,
                                color: "#2A2A2A",
                                my: "10px",
                            }}
                        >
                            {getExpireDate(locale)}
                        </Typography>
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        sx={{
                            color: "#A1A1A1",
                            fontSize: "20px",
                            fontWeight: 600,
                            mb: "10px",
                            mt: "20px",
                        }}
                    >
                        {t("common.addYourVoucherCode")}
                    </Typography>
                </Box>
                <FormAddVoucher
                    addedVouchers={vouchersAdded}
                    onAddSuccess={(voucher) => setVouchersAdded([...vouchersAdded, voucher])}
                />
                <Box
                    sx={{
                        mt: "20px",
                    }}
                >
                    <ListAddedVoucher
                        vouchers={vouchersAdded}
                        onDelete={(voucher) => {
                            const newVouchersAdded = vouchersAdded.filter(
                                (item) => item.giftCode !== voucher.giftCode
                            );
                            setVouchersAdded(newVouchersAdded);
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        mt: "20px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        sx={{
                            color: "#A1A1A1",
                            fontSize: "20px",
                            fontWeight: 600,
                        }}
                    >
                        {t("common.totalPackage")}
                    </Typography>
                    <Box>
                        <ProductPrice value={plan.price} color="primary.main" />
                    </Box>
                </Box>
                <Divider
                    sx={{
                        my: "10px",
                    }}
                />
                <Box
                    sx={{
                        mt: "20px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        sx={{
                            color: "#A1A1A1",
                            fontSize: "20px",
                            fontWeight: 600,
                        }}
                    >
                        {t("common.totalPayment")}
                    </Typography>
                    <Box>
                        <ProductPrice value={plan.price} color="primary.main" unitOnly />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions
                sx={{
                    p: 2.25,
                }}
            >
                <Box>
                    <ButtonPrimary
                        label={t("dialog.buyPackageVoucher.confirmText")}
                        onClick={() => onConfirm(vouchersAdded.map((item) => item.giftCode))}
                    />
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: 400,
                            color: "#A1A1A1",
                            my: "10px",
                            textAlign: "center",
                        }}
                    >
                        {replaceStringToLink({
                            str: t("dialog.buyPackageVoucher.confirmSubText"),
                            replaceList: [
                                {
                                    key: "deliveryPolicy",
                                    value: (
                                        <Link
                                            to="https://newai.vn/pages/chinh-sach-giao-nhan.html"
                                            style={{
                                                textDecoration: "none",
                                                color: "#FF4B22",
                                            }}
                                            target="_blank"
                                        >
                                            {t("help.deliveryPolicy")}
                                        </Link>
                                    ),
                                },
                                {
                                    key: "paymentMethod",
                                    value: (
                                        <Link
                                            to="https://newai.vn/pages/phuong-thuc-thanh-toan.html"
                                            style={{
                                                textDecoration: "none",
                                                color: "#FF4B22",
                                            }}
                                            target="_blank"
                                        >
                                            {t("help.paymentMethod")}
                                        </Link>
                                    ),
                                },
                            ],
                        })}
                    </Typography>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default DialogVoucher;
