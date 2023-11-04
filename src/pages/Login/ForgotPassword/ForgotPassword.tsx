import { Box } from "@mui/material";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import EnterEmailForm from "src/pages/Login/ForgotPassword/EnterEmailForm";
import EnterEmailLabel from "src/pages/Login/ForgotPassword/EnterEmailLabel";
import EnterNewPasswordForm from "src/pages/Login/ForgotPassword/EnterNewPasswordForm";
import EnterNewPasswordLabel from "src/pages/Login/ForgotPassword/EnterNewPasswordLabel";
import EnterVerificationCodeForm from "src/pages/Login/ForgotPassword/EnterVerificationCodeForm";
import EnterVerificationCodeLabel from "src/pages/Login/ForgotPassword/EnterVerificationCodeLabel";
import GoBackButton from "src/pages/Login/ForgotPassword/GoBackButton";

const ForgotPassword = () => {
    const [searchParams] = useSearchParams();
    const requestEmail = searchParams.get("email");
    const verifyToken = searchParams.get("verifyToken");

    const renderGoBackButton = useMemo(() => <GoBackButton />, []);
    const renderForgotPasswordLabel = useMemo(() => <EnterEmailLabel />, []);
    const renderVerifyCodeLabel = useMemo(() => <EnterVerificationCodeLabel />, []);
    const renderNewPasswordLabel = useMemo(() => <EnterNewPasswordLabel />, []);
    const renderForgotPasswordForm = useMemo(() => <EnterEmailForm />, []);
    const renderVerifyCodeForm = useMemo(() => <EnterVerificationCodeForm />, []);
    const renderNewPasswordForm = useMemo(() => <EnterNewPasswordForm />, []);

    return (
        <Box mt="50px" width="100%" mb={25}>
            {renderGoBackButton}
            <Box textAlign="center" display="flex" flexDirection="column" alignItems="center">
                {requestEmail
                    ? verifyToken
                        ? renderNewPasswordLabel
                        : renderVerifyCodeLabel
                    : renderForgotPasswordLabel}
                {requestEmail
                    ? verifyToken
                        ? renderNewPasswordForm
                        : renderVerifyCodeForm
                    : renderForgotPasswordForm}
            </Box>
        </Box>
    );
};

export default ForgotPassword;
