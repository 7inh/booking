import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, Box, IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import CryptoJS from "crypto-js";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { extractResponseToLoginData, setExpireTime } from "src/common/internals";
import { clearAllStorage, isRequestSuccessful } from "src/common/utils";
import { RHFCheckbox } from "src/components/RHFs/RHFCheckBox";
import RHFTextField from "src/components/RHFs/RHFTextField";
import { useAccountContext } from "src/contexts/AccountContext";
import useVerifyToken from "src/hooks/useVerifyToken";
import { useBoolean } from "src/hooks/utils/useBoolean";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";
import loginWithFirebase from "src/services/auth/loginWithFirebase";

type FormValuesProps = {
    email: string;
    password: string;
    rememberMe: boolean;
};

const defaultValues = {
    email: "",
    password: "",
    rememberMe: false,
};

const LoginV3 = () => {
    const [searchParams] = useSearchParams();

    const { logIn } = useAccountContext();

    const methods = useForm<FormValuesProps>({
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const [errMessage, setErrMessage] = useState("");

    const snackbar = useSnackBar();
    const password = useBoolean();
    const navigate = useNavigate();
    const t = useTranslation();
    const { handleError } = useHandleError();

    const { mutateAsync: verifyToken } = useVerifyToken();

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            try {
                clearAllStorage();
                const { email, password } = data;
                const encryptedPassword = CryptoJS.SHA512(password).toString();

                try {
                    const authResponse: any = await loginWithFirebase(email, encryptedPassword);
                    const response: any = await verifyToken({
                        token: authResponse?.user?.accessToken,
                    });

                    if (isRequestSuccessful(response)) {
                        snackbar({
                            message: t("common.loginSuccess"),
                            severity: "success",
                        });
                        setExpireTime(data.rememberMe);
                        logIn(extractResponseToLoginData(response));

                        if (searchParams.get("verifyToken") && searchParams.get("groupId")) {
                            navigate({
                                pathname: "/verify-invite",
                                search: "?" + searchParams.toString(),
                            });
                        } else {
                            const isUser = response.data.data?.userRoles === "USER";
                            const isCreator = response.data.data?.userRoles === "CREATOR";
                            if (isCreator || isUser) navigate("/chat");
                            else navigate("/");
                        }
                    } else {
                        setErrMessage(t("error.internalServerError"));
                    }
                } catch (error: any) {
                    if (
                        error.code === "auth/wrong-password" ||
                        error.code === "auth/user-not-found" ||
                        error.code === "auth/invalid-email" ||
                        error.code === "auth/invalid-login-credentials"
                    ) {
                        setErrMessage(t("error.invalidEmailOrPassword"));
                    } else if (error.code === "auth/too-many-requests") {
                        setErrMessage(t("error.tooManyRequest"));
                    } else {
                        setErrMessage(t("error.unKnownError"));
                    }
                }
            } catch (error) {
                handleError(error);
            }
        },
        [handleError, logIn, navigate, searchParams, snackbar, t, verifyToken]
    );

    const renderHead = (
        <Stack spacing={2} sx={{ mb: 5 }}>
            <Typography variant="h4">{t("auth.signInToKamiMind")}</Typography>

            <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography
                    sx={{
                        fontSize: "14px",
                        color: "#212B36",
                        fontWeight: 300,
                    }}
                >
                    {t("auth.newUser")}
                </Typography>

                <Link
                    to="/auth/signup"
                    style={{
                        textDecoration: "none",
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            alignSelf: "flex-end",
                            textDecoration: "none",
                            color: "#FF4B22",
                        }}
                    >
                        {t("auth.createAccount")}
                    </Typography>
                </Link>
            </Stack>
        </Stack>
    );

    const renderForm = (
        <Stack spacing={2.5} width="100%">
            {errMessage ? <Alert severity="error">{errMessage}</Alert> : null}

            <RHFTextField
                fullWidth
                required
                name="email"
                label={t("auth.email")}
                InputLabelProps={{ shrink: true }}
                rules={{
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: t("error.invalidEmail"),
                    },
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

            <RHFTextField
                fullWidth
                name="password"
                label={t("auth.password")}
                required
                type={password.value ? "text" : "password"}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={password.onToggle} edge="end">
                                {password.value ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                        </InputAdornment>
                    ),
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

            <Box display="flex" justifyContent="space-between" alignItems="center">
                <RHFCheckbox
                    name="rememberMe"
                    label={
                        <Typography
                            sx={{
                                color: "#212B36",
                                cursor: "pointer",
                                fontSize: "14px",
                                fontWeight: 300,
                            }}
                        >
                            {t("auth.rememberMe")}
                        </Typography>
                    }
                />
                <Box></Box>

                <Box>
                    <Typography
                        sx={{
                            alignSelf: "flex-end",
                            color: "#212B36",
                            cursor: "pointer",
                            fontSize: "14px",
                            textDecoration: "underline",
                            fontWeight: 300,
                        }}
                        onClick={() => navigate("/auth/forgot-password")}
                    >
                        {t("auth.forgotPassword")}?
                    </Typography>
                </Box>
            </Box>

            <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={(theme) => ({
                    boxShadow: 0,
                    backgroundColor: theme.palette.primary.main,
                    color: "#fff",
                    textTransform: "none",
                    borderRadius: "8px",
                    p: 1.45,
                    "&:hover": {
                        boxShadow: 0,
                        backgroundColor: theme.palette.primary.dark,
                    },
                })}
            >
                <Typography
                    sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                    }}
                >
                    {t("auth.signIn")}
                </Typography>
            </LoadingButton>
        </Stack>
    );

    return (
        <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
            onChange={() => errMessage && setErrMessage("")}
            sx={{
                width: "100%",
            }}
        >
            {renderHead}
            {renderForm}
        </FormProvider>
    );
};

export default LoginV3;
