import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import CryptoJS from "crypto-js";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isRequestSuccessful } from "src/common/utils";
import ConfirmDialogV2 from "src/components/Dialogs/ConfirmDialogV2";
import RHFTextField from "src/components/RHFs/RHFTextField";
import useResetPassword from "src/hooks/useResetPassword";
import { useBoolean } from "src/hooks/utils/useBoolean";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";

type FormValuesProps = {
    password: string;
};

const defaultValues: FormValuesProps = {
    password: "",
};

const EnterNewPasswordForm = () => {
    const navigate = useNavigate();
    const snackbar = useSnackBar();
    const t = useTranslation();
    const { handleError } = useHandleError();

    const [searchParams] = useSearchParams();
    const requestEmail = searchParams.get("email");

    const methods = useForm<FormValuesProps>({
        defaultValues,
    });
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const password = useBoolean();

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const { mutateAsync: resetPassword } = useResetPassword();

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            try {
                if (!data.password) return;
                const encryptedPassword = CryptoJS.SHA512(data.password).toString();
                const response: any = await resetPassword({
                    email: requestEmail || "",
                    password: encryptedPassword,
                });
                if (isRequestSuccessful(response) && response?.data?.success) {
                    snackbar({
                        message: t("success.resetPassword"),
                        severity: "success",
                    });
                    setOpenConfirmDialog(true);
                } else {
                    snackbar({
                        message: t("error.resetPassword"),
                        severity: "error",
                    });
                }
            } catch (error: any) {
                handleError(error);
            }
        },
        [resetPassword, requestEmail, snackbar, t, handleError]
    );

    return (
        <Box mt="40px" width="100%" maxWidth="400px">
            <ConfirmDialogV2
                open={openConfirmDialog}
                onClose={() => setOpenConfirmDialog(false)}
                onConfirm={() => navigate("/auth/login")}
                title={t("dialog.redirectToSignIn.title")}
                content={`${t("message.yourPasswordHasBeenReset")}. ${t(
                    "message.pleaseSignInWithYourNewPassword"
                )}.`}
                showCancel={false}
            />
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing="20px">
                    <RHFTextField
                        name="password"
                        label={t("auth.newPassword")}
                        required
                        type={password.value ? "text" : "password"}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={password.onToggle} edge="end">
                                        {password.value ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
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

export default EnterNewPasswordForm;
