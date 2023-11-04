import { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import instance from "src/common/instances/instance";
import { isRequestSuccessful } from "src/common/utils";
import useVerifyInvite from "src/hooks/useVerifyInvite";
import useHandleError, { getErrorCode } from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";

const VerifyInvite = () => {
    const [searchParams] = useSearchParams();
    const { mutateAsync: verify } = useVerifyInvite();
    const snackbar = useSnackBar();
    const navigate = useNavigate();
    const t = useTranslation();
    const { handleError } = useHandleError();

    const groupId = searchParams.get("groupId");
    const verifyToken = searchParams.get("verifyToken");

    const goToLogin = useCallback(() => {
        if (groupId && verifyToken) {
            navigate({
                pathname: "/auth/login",
                search: "?" + searchParams.toString(),
            });
        } else {
            navigate("/auth/login");
        }
    }, [groupId, navigate, searchParams, verifyToken]);

    const verifyInvite = useCallback(
        async (groupId: string, verifyToken: string) => {
            try {
                const response: any = await verify({
                    verifyToken,
                    groupId,
                });
                if (isRequestSuccessful(response)) {
                    snackbar({
                        message: t("success.verifyInviteSuccess"),
                        severity: "success",
                    });
                    navigate("/");
                } else {
                    snackbar({
                        message: t("error.unKnownError"),
                        severity: "error",
                    });
                }
            } catch (error: any) {
                const errorCode = getErrorCode(error);
                if (errorCode === "INVALID_TOKEN" || errorCode === "INVALID_VERIFY_TOKEN") {
                    snackbar({
                        message: t("error.loginInfoNotMatch"),
                        severity: "error",
                    });
                } else {
                    handleError(error);
                }
                navigate("/");
            }
        },
        [handleError, navigate, snackbar, t, verify]
    );

    useEffect(() => {
        if (groupId && verifyToken) {
            const token = localStorage.getItem("token");
            if (token) {
                instance.defaults.headers["Authorization"] = `Bearer ${token}`;
                verifyInvite(groupId, verifyToken);
            } else {
                snackbar({
                    message: t("message.youMustSignInFirst"),
                    severity: "warning",
                });
                goToLogin();
            }
        } else {
            window.location.href = "/";
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <code>Verifying...</code>;
};

export default VerifyInvite;
