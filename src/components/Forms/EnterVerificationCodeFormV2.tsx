import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import ResendCodeButtonV2 from "src/components/Buttons/ResendCodeButtonV2";
import RHFVerifyCode from "src/components/RHFs/RHFVerifyCode";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";

export type VerifyCodeFormValuesProps = {
    verifyCode: string[];
};

const defaultValues: VerifyCodeFormValuesProps = {
    verifyCode: [],
};

export interface EnterVerificationCodeFormV2Props {
    onSubmit: (data: VerifyCodeFormValuesProps) => void;
    onResend?: () => void;
}

const EnterVerificationCodeFormV2 = (props: EnterVerificationCodeFormV2Props) => {
    const { onResend, onSubmit } = props;

    const t = useTranslation();

    const methods = useForm<VerifyCodeFormValuesProps>({
        defaultValues,
    });
    const {
        watch,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const verifyCodeArray = watch("verifyCode");
    const verifyCodeValue = useMemo(() => verifyCodeArray?.join(""), [verifyCodeArray]);

    const renderResendButton = useMemo(
        () => <ResendCodeButtonV2 onResend={onResend} />,
        [onResend]
    );

    return (
        <Box mt="40px" width="100%" maxWidth="400px">
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing="20px">
                    <RHFVerifyCode
                        fullWidth
                        name="verifyCode"
                        label="Verification Code"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                            maxLength: 6,
                        }}
                        sx={{
                            "& fieldset": {
                                border: "1px solid rgba(145, 158, 171, 0.20)",
                                borderRadius: "8px",
                            },
                            "& label": {
                                color: "#919EAB",
                            },
                        }}
                    />
                    {renderResendButton}
                    <LoadingButton
                        variant="contained"
                        type="submit"
                        loading={isSubmitting}
                        disabled={
                            isSubmitting ||
                            !verifyCodeValue?.length ||
                            (verifyCodeValue?.length || 0) < 6
                        }
                        fullWidth
                        sx={{
                            py: 1.5,
                            borderRadius: "8px",
                            boxShadow: "none",
                            textTransform: "none",
                            "&:hover": {
                                boxShadow: "none",
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "15px",
                                fontWeight: 700,
                                lineHeight: "26px",
                                color: "#fff",
                            }}
                        >
                            {t("common.confirm")}
                        </Typography>
                    </LoadingButton>
                </Stack>
            </FormProvider>
        </Box>
    );
};

export default EnterVerificationCodeFormV2;
