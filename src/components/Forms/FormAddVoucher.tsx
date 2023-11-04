import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { CircularProgress, IconButton, InputAdornment } from "@mui/material";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { VoucherType } from "src/common/types";
import { isRequestSuccessful } from "src/common/utils";
import RHFTextField from "src/components/RHFs/RHFTextField";
import useGetGiftInfo from "src/hooks/useGetGiftInfo";
import useHandleError, { getErrorCode } from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";

type FormValuesProps = {
    giftCode: string;
};

const defaultValues: FormValuesProps = {
    giftCode: "",
};

export interface FormAddVoucherProps {
    addedVouchers?: VoucherType[];
    onAddSuccess?: (voucher: VoucherType) => void;
}

const FormAddVoucher = (props: FormAddVoucherProps) => {
    const { addedVouchers, onAddSuccess } = props;

    const t = useTranslation();
    const snackbar = useSnackBar();
    const { handleError } = useHandleError();

    const methods = useForm<FormValuesProps>({
        defaultValues,
    });

    const {
        handleSubmit,
        reset,
        formState: { isDirty, isLoading },
    } = methods;

    const { mutateAsync: getInfo } = useGetGiftInfo();

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            try {
                const response: any = await getInfo({
                    giftCode: data.giftCode,
                    caseCheck: "VOUCHER",
                });

                if (isRequestSuccessful(response)) {
                    reset();

                    const newVoucher: VoucherType = response.data.data;

                    if (
                        addedVouchers?.find((voucher) => voucher.giftCode === newVoucher.giftCode)
                    ) {
                        snackbar({
                            message: t("error.voucherAdded"),
                            severity: "warning",
                        });
                        return;
                    }

                    onAddSuccess?.(newVoucher);
                } else {
                    snackbar({
                        message: t("error.unKnownError"),
                        severity: "error",
                    });
                }
            } catch (error) {
                const errorCode = getErrorCode(error);
                if (errorCode === "INVALID_GIFTCODE") {
                    snackbar({
                        message: t("error.voucherInvalid"),
                        severity: "error",
                    });
                    return;
                }
                handleError(error);
            }
        },
        [addedVouchers, getInfo, handleError, onAddSuccess, reset, snackbar, t]
    );

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField
                fullWidth
                size="small"
                name="giftCode"
                sx={{
                    fieldset: {
                        border: "1px solid rgba(145, 158, 171, 0.20)",
                        borderRadius: "16px",
                    },
                    input: {
                        fontSize: "18px",
                        fontWeight: 500,
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {!isLoading ? (
                                <IconButton
                                    edge="end"
                                    color="primary"
                                    type="submit"
                                    disabled={!isDirty}
                                >
                                    <ArrowCircleRightOutlinedIcon />
                                </IconButton>
                            ) : (
                                <CircularProgress size={24} />
                            )}
                        </InputAdornment>
                    ),
                }}
            />
        </FormProvider>
    );
};

export default FormAddVoucher;
