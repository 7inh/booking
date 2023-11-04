import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, CardMedia, Dialog, IconButton, Typography } from "@mui/material";
import { useMemo } from "react";
import { GiftIncreaseTypeItem } from "src/common/types";
import { calculateExpireTime, toTimeString } from "src/common/utils";
import { IconPlus } from "src/components/Icons/IconExternal";
import { useTranslationContext } from "src/contexts/TranslationContext";
import useTranslation from "src/hooks/utils/useTranslation";
import { v4 as uuidv4 } from "uuid";

export interface DialogUseGiftCodeSuccessProps {
    open: boolean;
    increaseMoney?: GiftIncreaseTypeItem[];
    remainNum: number;
    remainType: "months" | "days";
    onClose: () => void;
}

export const DialogUseGiftCodeSuccess = (props: DialogUseGiftCodeSuccessProps) => {
    const { locale } = useTranslationContext();
    const t = useTranslation();
    const { open, increaseMoney, remainNum, remainType, onClose } = props;
    const expireTimeFormat = calculateExpireTime({
        remainNum,
        remainType,
    });

    const renderIncreaseMoney = useMemo(() => {
        const getTypeText = (type: string) => {
            switch (type) {
                case "POINT":
                    return t("common.kcoin");
                case "TOKEN":
                    return t("common.storageTokens");
                case "BOT":
                    return t("common.bot");
            }
        };

        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                    width: "fit-content",
                    margin: "0 auto",
                    gap: 2,
                    pt: 2,
                }}
            >
                {increaseMoney?.map((item) => (
                    <Box display="flex" alignItems="center" key={uuidv4()}>
                        <IconPlus
                            sx={{
                                color: "#00A76E",
                                flexShrink: 0,
                            }}
                        />
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#000",
                                ml: "10px",
                            }}
                        >
                            {item.quantity} {getTypeText(item.type)}
                        </Typography>
                    </Box>
                ))}
            </Box>
        );
    }, [increaseMoney, t]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiDialog-paper": {
                    width: "100%",
                    maxWidth: "400px",
                    borderRadius: "15px",
                    p: "20px",
                },
            }}
        >
            <Box
                sx={{
                    position: "relative",
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", top: 0, right: 0 }}
                    size="small"
                >
                    <CloseRoundedIcon
                        sx={{
                            width: "34px",
                            height: "34px",
                            color: "#95A3B1",
                        }}
                        fontSize="small"
                    />
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "20px",
                    mt: "50px",
                }}
            >
                <CardMedia
                    component="img"
                    src="/svgs/useGiftCodeSuccess.svg"
                    sx={{
                        width: "100%",
                        maxWidth: "200px",
                        height: "auto",
                    }}
                />
                <Box
                    sx={{
                        textAlign: "center",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "24px",
                            fontWeight: "700",
                            color: "#16A309",
                            mb: "10px",
                        }}
                    >
                        {t("dialog.useGiftCodeSuccess.title")}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#000",
                        }}
                    >
                        {t("dialog.useGiftCodeSuccess.content")}
                    </Typography>
                    {renderIncreaseMoney}
                </Box>
                <Typography
                    sx={{
                        color: "#A1A1A1",
                        fontSize: "14px",
                        fontWeight: "500",
                    }}
                >
                    {t("dialog.useGiftCodeSuccess.expiryDateUntil")}{" "}
                    {toTimeString(locale, expireTimeFormat)}
                </Typography>
            </Box>
        </Dialog>
    );
};

export default DialogUseGiftCodeSuccess;
