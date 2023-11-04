import { Typography } from "@mui/material";
import useTranslation from "src/hooks/utils/useTranslation";

export interface EnterVerificationCodeLabelProps {
    label?: string;
}

const EnterVerificationCodeLabel = (props: EnterVerificationCodeLabelProps) => {
    const { label } = props;
    const t = useTranslation();

    return (
        <>
            <Typography
                sx={{
                    fontSize: "24px",
                    fontWeight: 700,
                    lineHeight: "36px",
                }}
            >
                {t("auth.enterCode")}
            </Typography>
            <Typography
                mt="16px"
                sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "22px",
                    color: "#212B36",
                }}
            >
                {label || t("auth.pleaseCheckYourEmail")}
            </Typography>
        </>
    );
};

export default EnterVerificationCodeLabel;
