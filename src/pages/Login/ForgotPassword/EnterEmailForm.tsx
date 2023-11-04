import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Stack, Typography } from "@mui/material";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { isRequestSuccessful } from "src/common/utils";
import RHFTextField from "src/components/RHFs/RHFTextField";
import useForgotPassword from "src/hooks/useForgotPassword";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";

type FormValuesProps = {
    email: string;
};

const defaultValues: FormValuesProps = {
    email: "",
};

const EnterEmailForm = () => {
    const setSearchParams = useSearchParams()[1];

    const snackbar = useSnackBar();
    const t = useTranslation();
    const { handleError } = useHandleError();

    const methods = useForm<FormValuesProps>({
        defaultValues,
    });
    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const { mutateAsync: forgotPassword } = useForgotPassword();

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            try {
                if (!data.email) return;
                const response: any = await forgotPassword({
                    email: data.email,
                });
                if (isRequestSuccessful(response) && response?.data?.success) {
                    setSearchParams({ email: data.email });
                    snackbar({
                        message: t("success.requestForgotPassword"),
                        severity: "success",
                    });
                } else {
                    snackbar({
                        message: t("error.requestForgotPassword"),
                        severity: "error",
                    });
                }
            } catch (error: any) {
                handleError(error);
                reset();
            }
        },
        [forgotPassword, handleError, reset, setSearchParams, snackbar, t]
    );

    return (
        <Box mt="40px" width="100%" maxWidth="400px">
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing="20px">
                    <RHFTextField
                        fullWidth
                        required
                        name="email"
                        label="Email Address"
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
                    <LoadingButton
                        variant="contained"
                        type="submit"
                        loading={isSubmitting}
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
                                color: "#FFFFFF",
                            }}
                        >
                            {t("auth.sendCode")}
                        </Typography>
                    </LoadingButton>
                </Stack>
            </FormProvider>
        </Box>
    );
};

export default EnterEmailForm;
