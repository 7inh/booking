import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Grid, IconButton, InputAdornment } from "@mui/material";
import CryptoJS from "crypto-js";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { isRequestSuccessful } from "src/common/utils";
import RHFTextField from "src/components/RHFs/RHFTextField";
import { useAccountContext } from "src/contexts/AccountContext";
import useChangePassword from "src/hooks/useChangePassword";
import { useBoolean } from "src/hooks/utils/useBoolean";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";

export interface ChangePasswordFormProps {}

type FormValuesProps = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

const defaultValues: FormValuesProps = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
};

const ChangePasswordForm = () => {
    const snackbar = useSnackBar();
    const t = useTranslation();
    const { handleError } = useHandleError();

    const { logOut } = useAccountContext();

    const methods = useForm<FormValuesProps>({
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting, isDirty },
    } = methods;

    const { currentPassword, newPassword, confirmPassword } = methods.watch();
    const isFilledAll = currentPassword && newPassword && confirmPassword;

    const eyeCurrentPassword = useBoolean();
    const eyeNewPassword = useBoolean();
    const eyeConfirmPassword = useBoolean();

    const { mutateAsync: changePassword } = useChangePassword({});

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            if (!isDirty) return;

            try {
                const response: any = await changePassword({
                    oldPassword: CryptoJS.SHA512(data.currentPassword).toString(),
                    password: CryptoJS.SHA512(data.newPassword).toString(),
                });

                if (isRequestSuccessful(response)) {
                    snackbar({
                        message: t("success.changePassword"),
                        severity: "success",
                    });
                    logOut();
                } else {
                    snackbar({
                        message: t("error.canNotChangePassword"),
                        severity: "error",
                    });
                }
            } catch (error: any) {
                handleError(error);
            }
        },
        [changePassword, handleError, isDirty, logOut, snackbar, t]
    );

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <RHFTextField
                        fullWidth
                        size="small"
                        name="currentPassword"
                        label={t("common.currentPassword")}
                        sx={{
                            "& fieldset": {
                                border: "1px solid rgba(145, 158, 171, 0.20)",
                                borderRadius: "8px",
                            },
                            "& label.MuiInputLabel-shrink": { color: "primary.main" },
                        }}
                        type={eyeCurrentPassword.value ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={eyeCurrentPassword.onToggle} edge="end">
                                        {eyeCurrentPassword.value ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <RHFTextField
                        rules={{
                            validate: (value) => {
                                return (
                                    value !== methods.getValues("currentPassword") ||
                                    t("form.validation.newPasswordMustBeDifferent")
                                );
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/g,
                                message: t("form.validation.password"),
                            },
                        }}
                        fullWidth
                        size="small"
                        name="newPassword"
                        label={t("common.newPassword")}
                        helperText={t("form.helperText.newPassWord")}
                        sx={{
                            "& fieldset": {
                                border: "1px solid rgba(145, 158, 171, 0.20)",
                                borderRadius: "8px",
                            },
                            "& label.MuiInputLabel-shrink": { color: "primary.main" },
                        }}
                        type={eyeNewPassword.value ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={eyeNewPassword.onToggle} edge="end">
                                        {eyeNewPassword.value ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <RHFTextField
                        fullWidth
                        rules={{
                            validate: (value) => {
                                return (
                                    value === methods.getValues("newPassword") ||
                                    t("form.validation.confirmNewPassword")
                                );
                            },
                        }}
                        size="small"
                        name="confirmPassword"
                        label={t("common.confirmNewPassword")}
                        sx={{
                            "& fieldset": {
                                border: "1px solid rgba(145, 158, 171, 0.20)",
                                borderRadius: "8px",
                            },
                            "& label.MuiInputLabel-shrink": { color: "primary.main" },
                        }}
                        type={eyeConfirmPassword.value ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={eyeConfirmPassword.onToggle} edge="end">
                                        {eyeConfirmPassword.value ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>

            <br />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <LoadingButton
                    loading={isSubmitting}
                    disabled={!isFilledAll}
                    type="submit"
                    variant="contained"
                    sx={{
                        boxShadow: "none",
                        borderRadius: "8px",
                        textTransform: "none",
                    }}
                >
                    {t("common.update")}
                </LoadingButton>
            </Box>
        </FormProvider>
    );
};

export default ChangePasswordForm;
