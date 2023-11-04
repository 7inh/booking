import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Stack, Typography } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { isRequestSuccessful } from "src/common/utils";
import RHFVerifyCode from "src/components/RHFs/RHFVerifyCode";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useVerifyResetPassword from "src/hooks/useVerifyResetPassword";
import useTranslation from "src/hooks/utils/useTranslation";
import ResendCodeButton from "src/pages/Login/ForgotPassword/ResendCodeButton";
import FormProvider from "src/providers/FormProvider";
import useHandleError from "src/hooks/utils/useHandleError";
import { v4 as uuidv4 } from "uuid";

type FormValuesProps = {
    verifyCode: string[];
};

const defaultValues: FormValuesProps = {
    verifyCode: [],
};

const EnterVerificationCodeForm = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const requestEmail = searchParams.get("email");

    const snackbar = useSnackBar();
    const t = useTranslation();
    const { handleError } = useHandleError();

    const methods = useForm<FormValuesProps>({
        defaultValues,
    });
    const {
        watch,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const verifyCodeArray = watch("verifyCode");
    const verifyCodeValue = useMemo(() => verifyCodeArray?.join(""), [verifyCodeArray]);

    const { mutateAsync: verifyResetPassword } = useVerifyResetPassword();

    const onSubmitVerifyCode = useCallback(
        async (data: FormValuesProps) => {
            try {
                const response: any = await verifyResetPassword({
                    email: requestEmail || "",
                    verifyToken: data.verifyCode?.join("") || "",
                });
                if (isRequestSuccessful(response) && response?.data?.success) {
                    snackbar({
                        message: t("success.verifyCode"),
                        severity: "success",
                    });
                    setSearchParams({
                        email: requestEmail || "",
                        verifyToken: uuidv4(),
                    });
                } else {
                    snackbar({
                        message: t("error.verifyCode"),
                        severity: "error",
                    });
                }
            } catch (error: any) {
                handleError(error);
            }
        },
        [handleError, requestEmail, setSearchParams, snackbar, t, verifyResetPassword]
    );

    const renderResendButton = useMemo(() => <ResendCodeButton />, []);

    return (
        <Box mt="40px" width="100%" maxWidth="400px">
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitVerifyCode)}>
                <Stack spacing="20px">
                    <RHFVerifyCode
                        fullWidth
                        name="verifyCode"
                        label="Verification Code"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                            maxLength: 6,
                        }}
                        sx={{
                            "& fieldset": {
                                border: "1px solid rgba(145, 158, 171, 0.20)",
                                borderRadius: "8px",
                            },
                            "& label": {
                                color: "#919EAB",
                            },
                        }}
                    />
                    {renderResendButton}
                    <LoadingButton
                        variant="contained"
                        type="submit"
                        loading={isSubmitting}
                        disabled={
                            isSubmitting ||
                            !verifyCodeValue?.length ||
                            (verifyCodeValue?.length || 0) < 6
                        }
                        fullWidth
                        sx={{
                            py: 1.5,
                            borderRadius: "8px",
                            boxShadow: "none",
                            textTransform: "none",
                            "&:hover": {
                                boxShadow: "none",
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "15px",
                                fontWeight: 700,
                                lineHeight: "26px",
                                color: "#fff",
                            }}
                        >
                            {t("common.confirm")}
                        </Typography>
                    </LoadingButton>
                </Stack>
            </FormProvider>
        </Box>
    );
};

export default EnterVerificationCodeForm;
