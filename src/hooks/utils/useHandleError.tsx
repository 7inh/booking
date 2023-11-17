import { useCallback } from "react";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";

export const getErrorCode = (error: any) => {
    try {
        return error?.response?.data?.data?.code;
    } catch (error) {
        return null;
    }
};

const useHandleError = () => {
    const t = useTranslation();
    const snackbar = useSnackBar();

    const handleShowSnackBar = useCallback(
        (errorCode: string) => {
            snackbar({
                message: t(`errorHandler.${errorCode}`),
                severity: "error",
            });
        },
        [snackbar, t]
    );

    const handleError = useCallback(
        (error: any) => {
            const errorCode = getErrorCode(error);
            if (!errorCode) {
                snackbar({
                    message: t("error.unKnownError"),
                    severity: "error",
                });
                return;
            }
            handleShowSnackBar(errorCode);
        },
        [handleShowSnackBar, snackbar, t]
    );

    return {
        handleError,
    };
};

export default useHandleError;
