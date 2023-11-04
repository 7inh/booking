import { Box } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isRequestSuccessful } from "src/common/utils";
import EnterVerificationCodeFormV2, {
    VerifyCodeFormValuesProps,
} from "src/components/Forms/EnterVerificationCodeFormV2";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import useRegister from "src/hooks/useRegister";
import useRequestVerify from "src/hooks/useRequestVerify";
import useVerifyPhone from "src/hooks/useVerifyPhone";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import EnterVerificationCodeLabel from "src/pages/Login/ForgotPassword/EnterVerificationCodeLabel";
import GoBackButton from "src/pages/Login/ForgotPassword/GoBackButton";

const getRequestId = (state: any) => {
    try {
        return state?.requestId || "";
    } catch (error) {
        return "";
    }
};

const VerifyAccountV2 = () => {
    const { state } = useLocation();
    const isRegister = useMemo(() => state?.register, [state?.register]);

    const t = useTranslation();
    const snackbar = useSnackBar();
    const navigate = useNavigate();
    const { handleError, errorDialog } = useHandleError();

    const [isLoading, setIsLoading] = useState(false);
    const [requestId, setRequestId] = useState<string>(getRequestId(state));

    const { mutateAsync: requestVerify } = useRequestVerify();
    const { mutateAsync: verifyAccount } = useVerifyPhone();
    const { mutateAsync: register } = useRegister();

    const handleResendCode = useCallback(async () => {
        setIsLoading(false);
        try {
            const response: any = await requestVerify({
                phoneNumber: state?.phoneNumber,
            });
            if (isRequestSuccessful(response)) {
                snackbar({
                    message: t("success.requestResendVerifyCode"),
                    severity: "success",
                });
                setRequestId(response?.data?.data?.id);
            } else {
                snackbar({
                    message: t("error.requestResendVerifyCode"),
                    severity: "error",
                });
            }
        } catch (error: any) {
            handleError(error);
        }
        setIsLoading(false);
    }, [handleError, requestVerify, snackbar, state?.phoneNumber, t]);

    const handleRegister = useCallback(async () => {
        if (!isRegister) {
            navigate("/");
            return;
        }

        try {
            const response: any = await register({
                email: state?.email,
                password: state?.password,
                displayName: state?.displayName,
                phoneNumber: state?.phoneNumber,
                language: state?.language.id,
                country: state?.country.country_id,
                zipcode: state?.zipcode,
            });

            if (isRequestSuccessful(response)) {
                snackbar({
                    message: t("success.registerAccount"),
                    severity: "success",
                });
                navigate("/");
            } else {
                snackbar({
                    message: t("error.unKnownError"),
                    severity: "error",
                });
            }
        } catch (error) {
            handleError(error);
        }
    }, [isRegister, navigate, register, state, snackbar, t, handleError]);

    const handleSubmit = useCallback(
        async (data: VerifyCodeFormValuesProps) => {
            setIsLoading(true);
            const { verifyCode } = data;
            const verifyToken = verifyCode.join("");
            try {
                const response: any = await verifyAccount({
                    ...(isRegister ? { id: requestId } : {}),
                    verifyToken,
                });
                if (isRequestSuccessful(response)) {
                    snackbar({
                        message: t("success.verifyAccount"),
                        severity: "success",
                    });
                    await handleRegister();
                } else {
                    snackbar({
                        message: t("error.verifyAccount"),
                        severity: "error",
                    });
                }
            } catch (error) {
                handleError(error);
            }
            setIsLoading(false);
        },
        [handleError, handleRegister, isRegister, requestId, snackbar, t, verifyAccount]
    );

    const renderGoBackButton = useMemo(() => <GoBackButton />, []);
    const renderVerifyCodeLabel = useMemo(
        () => <EnterVerificationCodeLabel label={t("auth.pleaseCheckYourPhone")} />,
        [t]
    );
    const renderVerifyCodeForm = useMemo(
        () => <EnterVerificationCodeFormV2 onSubmit={handleSubmit} onResend={handleResendCode} />,
        [handleResendCode, handleSubmit]
    );

    return (
        <Box mt="50px" width="100%" mb={25}>
            {errorDialog}
            <LoadingIcon open={isLoading} />
            {renderGoBackButton}
            <Box textAlign="center" display="flex" flexDirection="column" alignItems="center">
                {renderVerifyCodeLabel}
                {renderVerifyCodeForm}
            </Box>
        </Box>
    );
};

export default VerifyAccountV2;
