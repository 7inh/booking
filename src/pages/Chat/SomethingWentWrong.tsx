import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { Box, Typography } from "@mui/material";
import useTranslation from "src/hooks/utils/useTranslation";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";

export interface SomethingWentWrongProps {
    onRetry?: () => void;
}

const SomethingWentWrong = ({ onRetry }: SomethingWentWrongProps) => {
    const t = useTranslation();

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
                my: "2px",
                borderRadius: "8px",
                cursor: "pointer",
                userSelect: "none",
            }}
            onClick={onRetry}
        >
            <InfoRoundedIcon
                sx={{
                    fontSize: "14px",
                    color: "primary.main",
                }}
            />
            <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: 400,
                    lineHeight: "18px",
                    color: "#FF7748",
                }}
            >
                {t("error.somethingWentWrongPleaseTryAgain")}
            </Typography>
            <ReplayRoundedIcon
                sx={{
                    fontSize: "14px",
                    color: "primary.main",
                }}
            />
        </Box>
    );
};

export default SomethingWentWrong;
