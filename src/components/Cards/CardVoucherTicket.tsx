import { Box, Typography } from "@mui/material";
import { VoucherType } from "src/common/types";
import { IconDelete } from "src/components/Icons/IconExternal";
import useTranslation from "src/hooks/utils/useTranslation";

export interface CardVoucherTicketProps {
    voucher: VoucherType;
    onDelete?: () => void;
}

const CardVoucherTicket = (props: CardVoucherTicketProps) => {
    const { voucher, onDelete } = props;

    const t = useTranslation();

    return (
        <Box
            sx={{
                height: "94px",
                position: "relative",
                svg: {
                    width: "100%",
                    position: "absolute",
                    top: -6,
                    left: 0,
                },
            }}
        >
            <Box
                sx={{
                    // height: "100px",
                    width: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    zIndex: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "stretch",
                }}
            >
                <Box
                    sx={{
                        flexGrow: 1,
                        ml: 2.5,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontWeight: 500,
                                color: "primary.main",
                            }}
                        >
                            {t("page.buyKpoint.voucher")}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "20px",
                                fontWeight: 500,
                                color: "#000",
                            }}
                        >
                            {voucher.giftCode}
                        </Typography>
                    </Box>
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: 400,
                            color: "#919EAB",
                        }}
                    >
                        {t("page.buyKpoint.accountIncrease")}{" "}
                        {voucher.increaseType
                            .map(
                                (item) =>
                                    "+" +
                                    `${item.quantity} ` +
                                    t("page.buyKpoint.voucherType." + item.type).toLocaleLowerCase()
                            )
                            .join(", ")}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        bgcolor: "#919EAB1F",
                        display: "flex",
                        alignItems: "center",
                        px: 1.5,
                        cursor: "pointer",
                        "&:hover": {
                            bgcolor: "#919EAB33",
                            ".icon-delete": {
                                color: "primary.main",
                            },
                        },
                    }}
                    onClick={onDelete}
                >
                    <IconDelete
                        className="icon-delete"
                        sx={{
                            width: "20px",
                            height: "20px",
                            color: "#919EAB",
                        }}
                    />
                </Box>
            </Box>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="467"
                height="106"
                viewBox="0 0 467 106"
                fill="none"
            >
                <path
                    d="M467 0H0V8C3.86599 8 7 11.134 7 15C7 18.866 3.86599 22 0 22V27C3.86599 27 7 30.134 7 34C7 37.866 3.86599 41 0 41V46C3.86599 46 7 49.134 7 53C7 56.866 3.86599 60 0 60V65C3.86599 65 7 68.134 7 72C7 75.866 3.86599 79 0 79V84C3.86599 84 7 87.134 7 91C7 94.866 3.86599 98 0 98V106H467V0Z"
                    fill="white"
                />
                <path
                    d="M0.5 7.5164V0.5H466.5V105.5H0.5V98.4836C4.40902 98.2263 7.5 94.9741 7.5 91C7.5 87.0259 4.40902 83.7737 0.5 83.5164V79.4836C4.40902 79.2263 7.5 75.9741 7.5 72C7.5 68.0259 4.40902 64.7737 0.5 64.5164V60.4836C4.40902 60.2263 7.5 56.9741 7.5 53C7.5 49.0259 4.40902 45.7737 0.5 45.5164V41.4836C4.40902 41.2263 7.5 37.9741 7.5 34C7.5 30.0259 4.40902 26.7737 0.5 26.5164V22.4836C4.40902 22.2263 7.5 18.9741 7.5 15C7.5 11.0259 4.40902 7.7737 0.5 7.5164Z"
                    stroke="#919EAB"
                    strokeOpacity="0.2"
                />
            </svg>
        </Box>
    );
};

export default CardVoucherTicket;
