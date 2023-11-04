import { Box, Button } from "@mui/material";
import React, { ReactNode, ErrorInfo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useTranslation from "src/hooks/utils/useTranslation";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

const ErrorBoundary = ({ error, errorInfo }: Pick<ErrorBoundaryState, "error" | "errorInfo">) => {
    const navigate = useNavigate();
    const t = useTranslation();

    if (!error || !errorInfo) {
        return null;
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            height="100vh"
        >
            <pre>{t("error.somethingWentWrong")}</pre>
            <Button
                variant="outlined"
                onClick={() => {
                    navigate("/");
                    navigate(0);
                }}
            >
                {t("message.backToHome")}
            </Button>
        </Box>
    );
};

class MyErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state = { hasError: false, error: null, errorInfo: null };

    constructor(props: ErrorBoundaryProps) {
        super(props);
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({ hasError: true, error, errorInfo });
    }

    render() {
        const { hasError, errorInfo, error } = this.state;

        const { children } = this.props;

        if (hasError) {
            return <ErrorBoundary error={error} errorInfo={errorInfo} />;
        }

        return <>{children}</>;
    }
}

const ErrorBoundaryWrapper = () => {
    return (
        <MyErrorBoundary>
            <Outlet />
        </MyErrorBoundary>
    );
};

export default ErrorBoundaryWrapper;
