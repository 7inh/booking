import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { isRequestSuccessful } from "src/common/utils";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import RHFTextField from "src/components/RHFs/RHFTextField";
import RHFRating from "src/components/RHFs/RHFRating";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useUpdateReview from "src/hooks/useUpdateReview";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";
import useHandleError from "src/hooks/utils/useHandleError";

export interface DialogUpdateReviewProps {
    open: boolean;
    idReview: string;
    comment: string;
    star: number;
    onClose: () => void;
    onSuccess: () => void;
}

type FormValuesProps = {
    comment: string;
    star: number;
};

const DialogUpdateReview = ({
    idReview,
    open,
    comment,
    star,
    onClose,
    onSuccess,
}: DialogUpdateReviewProps) => {
    const t = useTranslation();

    const methods = useForm<FormValuesProps>({
        defaultValues: {
            comment,
            star,
        },
    });
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const snackbar = useSnackBar();
    const { handleError } = useHandleError();

    const { mutateAsync: updateReview } = useUpdateReview();

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            try {
                const response: any = await updateReview({
                    idReview,
                    comment: data.comment,
                    star: data.star,
                });

                if (isRequestSuccessful(response)) {
                    snackbar({
                        message: t("success.updateReview"),
                        severity: "success",
                    });
                    onClose();
                    onSuccess();
                } else {
                    snackbar({
                        message: t("error.canNotUpdateReview"),
                        severity: "error",
                    });
                }
            } catch (error) {
                handleError(error);
            }

            return false;
        },
        [handleError, idReview, onClose, onSuccess, snackbar, t, updateReview]
    );

    return (
        <Dialog
            open={open}
            onClose={() => onClose()}
            fullWidth
            PaperProps={{
                style: { borderRadius: 8 },
            }}
        >
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <LoadingIcon open={isSubmitting} />

                <DialogTitle
                    sx={{
                        bgcolor: "primary.main",
                        color: "white",
                    }}
                >
                    {t("dialog.updateReview.title")}
                </DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            mt: 2,
                        }}
                    >
                        <RHFRating name="star" />
                        <RHFTextField
                            required
                            rules={{
                                required: t("common.required"),
                            }}
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
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={onClose}>{t("common.cancel")}</Button>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                        {t("common.update")}
                    </Button>
                </DialogActions>
            </FormProvider>
        </Dialog>
    );
};

export default memo(DialogUpdateReview);
