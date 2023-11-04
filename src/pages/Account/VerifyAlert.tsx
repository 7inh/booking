import { Box, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isRequestSuccessful } from "src/common/utils";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import useRequestVerify from "src/hooks/useRequestVerify";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";

const VerifyAlert = () => {
    const t = useTranslation();
    const snackbar = useSnackBar();
    const navigate = useNavigate();
    const { handleError } = useHandleError();

    const [isLoading, setIsLoading] = useState(false);

    const { mutateAsync: requestVerify } = useRequestVerify();

    const handleRequestVerifyAccount = useCallback(async () => {
        setIsLoading(true);
        try {
            const response: any = await requestVerify({});
            if (isRequestSuccessful(response)) {
                snackbar({
                    message: t("success.requestVerifyAccount"),
                    severity: "success",
                });
                navigate(
                    {
                        pathname: "/auth/verify-account",
                    },
                    {
                        state: {
                            requestId: response?.data?.data?.id,
                        },
                    }
                );
            } else {
                snackbar({
                    message: t("error.requestVerifyAccount"),
                    severity: "error",
                });
            }
        } catch (error) {
            handleError(error);
        }
        setIsLoading(false);
    }, [handleError, navigate, requestVerify, snackbar, t]);

    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: "rgba(0, 0, 0, 0.05)",
                borderRadius: "8px",
            }}
        >
            <LoadingIcon open={isLoading} />
            <Box p={2}>
                <Typography
                    sx={{
                        fontSize: "14px",
                        color: "#212B36",
                    }}
                >
                    {t("auth.yourAccountNotVerified")}
                </Typography>
                <Typography
                    sx={{
                        fontSize: "14px",
                        color: "primary.main",
                        textDecoration: "underline",
                        cursor: "pointer",
                    }}
                    onClick={handleRequestVerifyAccount}
                >
                    {t("auth.verifyNow")}
                </Typography>
            </Box>
        </Box>
    );
};

export default VerifyAlert;
