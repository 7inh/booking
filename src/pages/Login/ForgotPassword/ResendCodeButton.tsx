import { Box, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { formatTime, isRequestSuccessful } from "src/common/utils";
import useForgotPassword from "src/hooks/useForgotPassword";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";

const ResendCodeButton = () => {
    const [searchParams] = useSearchParams();
    const requestEmail = searchParams.get("email");

    const snackbar = useSnackBar();
    const t = useTranslation();
    const { handleError } = useHandleError();

    const [remainingTime, setRemainingTime] = useState(60);

    const { mutateAsync: forgotPassword } = useForgotPassword();

    const isDisabled = remainingTime > 0;

    const handleResendCode = useCallback(async () => {
        try {
            const response: any = await forgotPassword({
                email: requestEmail || "",
            });
            if (isRequestSuccessful(response) && response?.data?.success) {
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
        }
    }, [forgotPassword, handleError, requestEmail, snackbar, t]);

    useEffect(() => {
        if (remainingTime <= 0) return;

        const intervalId = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [remainingTime]);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "start",
            }}
        >
            <Box
                sx={{
                    color: isDisabled ? "#919EAB" : "#2F80ED",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    display: "flex",
                    gap: "4px",
                }}
                onClick={() => {
                    if (!isDisabled) {
                        handleResendCode();
                        setRemainingTime(60);
                    }
                }}
            >
                <Typography>{t("auth.resendCode")}</Typography>
                {isDisabled ? <Typography>({formatTime(remainingTime)})</Typography> : null}
            </Box>
        </Box>
    );
};

export default ResendCodeButton;
