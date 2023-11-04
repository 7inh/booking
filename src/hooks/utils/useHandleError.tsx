import { useCallback, useMemo, useState } from "react";
import DialogMaximumVerify from "src/components/Dialogs/DialogMaximumVerify";
import { useBoolean } from "src/hooks/utils/useBoolean";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";

export const getErrorCode = (error: any) => {
    try {
        return error?.response?.data?.data?.code;
    } catch (error) {
        return null;
    }
};

const errorDialogMap = {
    MAXIMUM_FAILED: DialogMaximumVerify,
};

const useHandleError = () => {
    const t = useTranslation();
    const snackbar = useSnackBar();

    const openDialog = useBoolean(false);
    const [currentErrorCode, setCurrentErrorCode] = useState<string | null>(null);

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
            if (errorCode === "MAXIMUM_FAILED") {
                setCurrentErrorCode(errorCode);
                openDialog.onTrue();
                return;
            }
            handleShowSnackBar(errorCode);
        },
        [handleShowSnackBar, openDialog, snackbar, t]
    );

    const errorDialog = useMemo(() => {
        if (!currentErrorCode || !(currentErrorCode in errorDialogMap)) return null;

        const ErrorDialog = errorDialogMap[currentErrorCode as keyof typeof errorDialogMap];

        return <ErrorDialog open={openDialog.value} onClose={() => openDialog.onFalse()} />;
    }, [currentErrorCode, openDialog]);

    return {
        handleError,
        errorDialog,
    };
};

export default useHandleError;
