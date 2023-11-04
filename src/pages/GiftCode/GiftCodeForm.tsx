import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import { Box, IconButton, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { GiftIncreaseTypeItem } from "src/common/types";
import { isRequestSuccessful } from "src/common/utils";
import DialogUseGiftCodeSuccess from "src/components/Dialogs/DialogUseGiftCodeSuccess";
import RHFTextField from "src/components/RHFs/RHFTextField";
import useGiftCode from "src/hooks/useGiftCode";
import useHandleError from "src/hooks/utils/useHandleError";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";

type FormValuesProps = {
    giftCode: string;
};

const defaultValues: FormValuesProps = {
    giftCode: "",
};

const GiftCodeForm = () => {
    const t = useTranslation();
    const { handleError } = useHandleError();

    const methods = useForm<FormValuesProps>({
        defaultValues,
    });
    const {
        reset,
        handleSubmit,
        formState: { isDirty, isSubmitting },
    } = methods;

    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
    const [increaseMoney, setIncreaseMoney] = useState<GiftIncreaseTypeItem[]>([]);
    const [expireTime, setExpireTime] = useState<{
        remainNum: number;
        remainType: "months" | "days";
    } | null>(null);

    const { mutateAsync } = useGiftCode();

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            try {
                const response: any = await mutateAsync({
                    giftCode: data.giftCode,
                });
                if (isRequestSuccessful(response)) {
                    setOpenSuccessDialog(true);
                    setIncreaseMoney(response.data.data.increaseType);
                    setExpireTime({
                        remainNum: response.data.data.remainNum,
                        remainType: response.data.data.remainType,
                    });
                    reset();
                }
            } catch (error) {
                handleError(error);
            }
        },
        [handleError, mutateAsync, reset]
    );

    const renderSuccessDialog = useMemo(() => {
        if (!expireTime) return null;
        return (
            <DialogUseGiftCodeSuccess
                open={openSuccessDialog}
                increaseMoney={increaseMoney}
                remainNum={expireTime.remainNum}
                remainType={expireTime.remainType}
                onClose={() => setOpenSuccessDialog(false)}
            />
        );
    }, [expireTime, increaseMoney, openSuccessDialog]);

    return (
        <>
            {renderSuccessDialog}
            <Box
                sx={{
                    width: "100%",
                    textAlign: "center",
                    position: "relative",
                    "&:before": {
                        content: "''",
                        width: "168px",
                        height: "168px",
                        bgcolor: "#F6D35C",
                        position: "absolute",
                        top: "-5%",
                        left: "50%",
                        borderRadius: "50%",
                        filter: "blur(100px)",
                    },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: "500px",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "28px",
                            fontWeight: "700",
                        }}
                    >
                        {t("page.giftCode.redeemYourGiftCode")}
                    </Typography>
                    <FormProvider
                        methods={methods}
                        sx={{
                            width: "100%",
                        }}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <RHFTextField
                            size="small"
                            name="giftCode"
                            placeholder={t("page.giftCode.enterGiftCode")}
                            sx={{
                                bgcolor: "#FFFFFF",
                                borderRadius: "20px",
                                "& fieldset": {
                                    border: "1px solid rgba(145, 158, 171, 0.20)",
                                    borderRadius: "50px",
                                },
                                "& .MuiInputBase-root": {
                                    pr: 0.5,
                                },
                            }}
                            inputProps={{
                                style: {
                                    textAlign: "center",
                                },
                            }}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        sx={{
                                            p: 0,
                                        }}
                                        disabled={isSubmitting || !isDirty}
                                        color="primary"
                                        type="submit"
                                    >
                                        <ArrowCircleRightRoundedIcon fontSize="large" />
                                    </IconButton>
                                ),
                            }}
                        />
                    </FormProvider>
                </Box>
            </Box>
        </>
    );
};

export default GiftCodeForm;
