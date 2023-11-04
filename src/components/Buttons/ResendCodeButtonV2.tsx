import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { formatTime } from "src/common/utils";
import useTranslation from "src/hooks/utils/useTranslation";

export interface ResendCodeButtonV2Props {
    onResend?: () => void;
}

const ResendCodeButtonV2 = (props: ResendCodeButtonV2Props) => {
    const { onResend } = props;

    const t = useTranslation();

    const [remainingTime, setRemainingTime] = useState(60);

    const isDisabled = remainingTime > 0;

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
                        onResend?.();
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

export default ResendCodeButtonV2;
