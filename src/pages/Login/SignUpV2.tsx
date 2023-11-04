import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import {
    Alert,
    Box,
    Collapse,
    Grid,
    IconButton,
    InputAdornment,
    Stack,
    Typography,
} from "@mui/material";
import CryptoJS from "crypto-js";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { isRequestSuccessful } from "src/common/utils";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import RHFAutocomplete from "src/components/RHFs/RHFAutocomplete";
import { RHFCheckbox } from "src/components/RHFs/RHFCheckBox";
import RHFTextField from "src/components/RHFs/RHFTextField";
import useGetCountry from "src/hooks/useGetCountry";
import useRequestVerify from "src/hooks/useRequestVerify";
import { useBoolean } from "src/hooks/utils/useBoolean";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import { replaceStringToLink } from "src/pages/Login/utils";
import FormProvider from "src/providers/FormProvider";

type FormValuesProps = {
    displayName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    language?: any;
    country?: any;
    zipcode?: string;
    acceptTerms?: boolean;
};

const defaultValues: FormValuesProps = {
    displayName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    language: "",
    country: "",
    zipcode: "",
    acceptTerms: false,
};

const SignUpV2 = () => {
    const navigate = useNavigate();
    const t = useTranslation();
    const snackbar = useSnackBar();
    const { handleError } = useHandleError();

    const methods = useForm<FormValuesProps>({
        defaultValues,
    });

    const {
        handleSubmit,
        watch,
        formState: { isSubmitting, isDirty },
    } = methods;

    const isAcceptTerms = watch("acceptTerms");

    const [errMessage, setErrMessage] = useState("");
    const [showOptional, setShowOptional] = useState(false);
    const showPassword = useBoolean(false);
    const showConfirmPassword = useBoolean(false);

    const { data: countries = [] } = useGetCountry({});

    const { mutateAsync: requestVerify } = useRequestVerify();

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            if (!isDirty) return;

            try {
                if (data.password !== data.confirmPassword) {
                    setErrMessage(t("error.passwordNotMatch"));
                    return;
                }

                const response: any = await requestVerify({
                    phoneNumber: data.phoneNumber,
                });

                if (isRequestSuccessful(response)) {
                    navigate(
                        {
                            pathname: "/auth/verify-account",
                        },
                        {
                            state: {
                                ...data,
                                password: CryptoJS.SHA512(data.password).toString(),
                                requestId: response?.data?.data?.id,
                                register: true,
                            },
                        }
                    );
                } else {
                    snackbar({
                        message: t("error.unKnownError"),
                        severity: "error",
                    });
                }
            } catch (error) {
                handleError(error);
            }
        },
        [isDirty, requestVerify, t, navigate, snackbar, handleError]
    );

    const renderHead = (
        <Stack spacing={2} sx={{ mb: 5 }}>
            <Typography variant="h4">{t("auth.getStart")}</Typography>

            <Stack direction="row" spacing={0.5}>
                <Typography variant="body2">{t("auth.alreadyHaveAnAccount")}</Typography>

                <Link
                    to="/auth/login"
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
                        {t("auth.signIn")}
                    </Typography>
                </Link>
            </Stack>
        </Stack>
    );

    const renderForm = (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
            }}
        >
            {errMessage ? <Alert severity="error">{errMessage}</Alert> : null}
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <RHFTextField
                        name="displayName"
                        fullWidth
                        required
                        id="firstName"
                        label={t("common.displayName")}
                        autoFocus
                        sx={{
                            "& input": {
                                textTransform: "capitalize",
                            },
                            "& fieldset": {
                                border: "1px solid rgba(145, 158, 171, 0.20)",
                                borderRadius: "8px",
                            },
                            "& label": {
                                color: "#919EAB",
                            },
                        }}
                        rules={{
                            required: {
                                value: true,
                                message: t("form.validation.displayNameIsRequired"),
                            },
                            pattern: {
                                value: /^[A-Za-zÀ-ỹ\s]+$/u,
                                message: t("form.validation.displayNameIsInvalid"),
                            },
                            minLength: {
                                value: 2,
                                message: t("form.validation.displayNameIsInvalid"),
                            },
                            maxLength: {
                                value: 50,
                                message: t("form.validation.displayNameIsInvalid"),
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <RHFTextField
                        fullWidth
                        required
                        id="email"
                        label={t("auth.email")}
                        name="email"
                        sx={{
                            "& fieldset": {
                                border: "1px solid rgba(145, 158, 171, 0.20)",
                                borderRadius: "8px",
                            },
                            "& label": {
                                color: "#919EAB",
                            },
                        }}
                        rules={{
                            required: {
                                value: true,
                                message: t("form.validation.emailIsRequired"),
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g,
                                message: t("form.validation.emailIsInvalid"),
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <RHFTextField
                        fullWidth
                        required
                        name="phoneNumber"
                        label={t("auth.phoneNumber")}
                        type="phoneNumber"
                        id="phoneNumber"
                        sx={{
                            "& fieldset": {
                                border: "1px solid rgba(145, 158, 171, 0.20)",
                                borderRadius: "8px",
                            },
                            "& label": {
                                color: "#919EAB",
                            },
                        }}
                        rules={{
                            required: {
                                value: true,
                                message: t("form.validation.phoneNumberIsRequired"),
                            },
                            pattern: {
                                value: /^(([+]*[(]{0,1}[0-9]{1,4}[)]{0,1})|0[3|5|7|8|9])[0-9]{9}$/g,
                                message: t("form.validation.phoneNumberIsInvalid"),
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <RHFTextField
                        fullWidth
                        required
                        name="password"
                        label={t("auth.password")}
                        type={showPassword.value ? "text" : "password"}
                        id="password"
                        sx={{
                            "& fieldset": {
                                border: "1px solid rgba(145, 158, 171, 0.20)",
                                borderRadius: "8px",
                            },
                            "& label": {
                                color: "#919EAB",
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={showPassword.onToggle} edge="end">
                                        {showPassword.value ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        rules={{
                            required: {
                                value: true,
                                message: t("form.validation.passwordIsRequired"),
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/g,
                                message: t("form.validation.password"),
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <RHFTextField
                        fullWidth
                        required
                        name="confirmPassword"
                        label={t("auth.confirmPassword")}
                        type={showConfirmPassword.value ? "text" : "password"}
                        id="password"
                        sx={{
                            "& fieldset": {
                                border: "1px solid rgba(145, 158, 171, 0.20)",
                                borderRadius: "8px",
                            },
                            "& label": {
                                color: "#919EAB",
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={showConfirmPassword.onToggle} edge="end">
                                        {showConfirmPassword.value ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        rules={{
                            validate: (value) => {
                                return (
                                    value === methods.getValues("password") ||
                                    t("form.validation.confirmNewPassword")
                                );
                            },
                        }}
                    />
                </Grid>
            </Grid>

            <Stack spacing={1.5}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        color: "primary.main",
                        width: "fit-content",
                    }}
                    onClick={() => setShowOptional((pre) => !pre)}
                >
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "22px",
                        }}
                    >
                        {t("common.optional2")}
                    </Typography>
                    <ExpandMoreRoundedIcon
                        sx={{
                            transform: !showOptional ? "rotate(-90deg)" : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                        }}
                    />
                </Box>
                <Collapse in={showOptional}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <RHFAutocomplete
                                fullWidth
                                name="language"
                                label={t("common.language")}
                                options={[
                                    {
                                        id: "English",
                                        value: "English",
                                    },
                                    {
                                        id: "Vietnamese",
                                        value: "Vietnamese",
                                    },
                                ]}
                                getOptionLabel={(option: any) => option.value || ""}
                                filterSelectedOptions
                                isOptionEqualToValue={(option, value) => option.id === value.id}
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RHFAutocomplete
                                fullWidth
                                label={t("common.country")}
                                name="country"
                                options={countries}
                                getOptionLabel={(option: any) => option.name || ""}
                                filterSelectedOptions
                                isOptionEqualToValue={(option, value) =>
                                    option.country_id === value.country_id
                                }
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RHFTextField
                                fullWidth
                                label="Zip / Postal code"
                                name="zipcode"
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
                        </Grid>
                    </Grid>
                </Collapse>
            </Stack>

            <RHFCheckbox
                name="acceptTerms"
                label={
                    <Box ml={1}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "22px",
                            }}
                        >
                            {replaceStringToLink({
                                str: t("auth.acceptTerms"),
                                replaceList: [
                                    {
                                        key: "terms",
                                        value: (
                                            <Link
                                                key="terms"
                                                to="https://kamimind.newai.vn/pages/dieu-khoan-su-dung.html"
                                                style={{
                                                    textDecoration: "none",
                                                    color: "#FF4B22",
                                                }}
                                                target="_blank"
                                            >
                                                {t("auth.terms")}
                                            </Link>
                                        ),
                                    },
                                    {
                                        key: "privacy",
                                        value: (
                                            <Link
                                                key="privacy"
                                                to="https://kamimind.newai.vn/pages/chinh-sach-bao-mat.html"
                                                style={{
                                                    textDecoration: "none",
                                                    color: "#FF4B22",
                                                }}
                                                target="_blank"
                                            >
                                                {t("auth.privacy")}
                                            </Link>
                                        ),
                                    },
                                ],
                            })}
                        </Typography>
                    </Box>
                }
                sx={{
                    "& .MuiTypography-root": {
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "22px",
                    },
                    "& .MuiCheckbox-root": {
                        padding: 0,
                    },
                }}
            />

            <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                disabled={!isAcceptTerms}
                sx={(theme) => ({
                    boxShadow: 0,
                    backgroundColor: "primary.main",
                    color: "#fff",
                    textTransform: "none",
                    borderRadius: "8px",
                    "&:hover": {
                        boxShadow: 0,
                        backgroundColor: theme.palette.primary.dark,
                    },
                })}
            >
                {t("auth.createAccount")}
            </LoadingButton>
        </Box>
    );

    return (
        <Stack>
            <LoadingIcon open={isSubmitting} zIndex={100000} />
            <FormProvider
                methods={methods}
                onSubmit={handleSubmit(onSubmit)}
                onChange={() => errMessage && setErrMessage("")}
            >
                {renderHead}
                {renderForm}
            </FormProvider>
        </Stack>
    );
};

export default SignUpV2;
