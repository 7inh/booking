import { Typography } from "@mui/material";
import useTranslation from "src/hooks/utils/useTranslation";

const EnterEmailLabel = () => {
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
                {t("auth.findYourAccount")}
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
                {t("auth.inputYourEmailToResetPassword")}
            </Typography>
        </>
    );
};

export default EnterEmailLabel;
