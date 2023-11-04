import { Box, BoxProps, Button, Typography } from "@mui/material";
import ReviewsRoundedIcon from "@mui/icons-material/ReviewsRounded";
import { useForm } from "react-hook-form";
import FormProvider from "src/providers/FormProvider";
import RHFRating from "src/components/RHFs/RHFRating";
import RHFTextField from "src/components/RHFs/RHFTextField";
import useInsertReview from "src/hooks/useInsertReview";
import { useCallback } from "react";
import { isRequestSuccessful } from "src/common/utils";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import useHandleError from "src/hooks/utils/useHandleError";

export interface StartYourReviewProps extends BoxProps {
    botToken: string;
    onReviewSubmittedSuccess?: () => void;
}

type FormValuesProps = {
    comment: string;
    star: number;
};

const StartYourReview = ({ botToken, onReviewSubmittedSuccess, ...rest }: StartYourReviewProps) => {
    const snackbar = useSnackBar();
    const t = useTranslation();
    const { handleError } = useHandleError();

    const methods = useForm<FormValuesProps>({
        defaultValues: {
            comment: "",
            star: 0,
        },
    });

    const {
        handleSubmit,
        reset,
        formState: { isSubmitting, isDirty },
    } = methods;

    const { mutateAsync: insertReview } = useInsertReview();

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            try {
                const response: any = await insertReview({
                    botToken,
                    comment: data.comment,
                    star: data.star,
                });

                if (isRequestSuccessful(response)) {
                    snackbar({
                        message: t("success.submitReview"),
                        severity: "success",
                    });
                    onReviewSubmittedSuccess?.();
                    reset();
                } else {
                    snackbar({
                        message: t("error.submitReview"),
                        severity: "error",
                    });
                }
            } catch (error) {
                handleError(error);
            }
        },
        [botToken, handleError, insertReview, onReviewSubmittedSuccess, reset, snackbar, t]
    );

    return (
        <Box {...rest}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1.5,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "22px",
                            fontWeight: 600,
                            color: "#1B1A57",
                        }}
                    >
                        {t("page.kamiStore.startReview")}
                    </Typography>

                    <RHFRating name="star" />
                    <Button
                        variant="outlined"
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "5px",
                            py: 0,
                            mx: 0,
                            height: "37px",
                            borderRadius: "8px",
                        }}
                        disabled={!isDirty || isSubmitting}
                        type="submit"
                    >
                        <ReviewsRoundedIcon fontSize="small" />
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontWeight: 400,
                                textTransform: "none",
                            }}
                        >
                            {t("page.kamiStore.submitReview")}
                        </Typography>
                    </Button>
                </Box>
                <RHFTextField
                    required
                    fullWidth
                    multiline
                    minRows={4}
                    size="small"
                    name="comment"
                    label={t("common.comment")}
                    sx={{
                        "& fieldset": {
                            border: "1px solid rgba(145, 158, 171, 0.20)",
                            borderRadius: "8px",
                        },
                        "& label.MuiInputLabel-shrink": {
                            color: "#3E8C6C",
                        },
                    }}
                />
            </FormProvider>
        </Box>
    );
};

export default StartYourReview;
