import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import RHFTextField from "src/components/RHFs/RHFTextField";
import useGetBotSource from "src/hooks/useGetBotSource";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useUpdateBotSource from "src/hooks/useUpdateBotSource";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";
import { isRequestSuccessful } from "src/common/utils";
import useHandleError from "src/hooks/utils/useHandleError";

export interface EditSourceDialogProps {
    botToken: string;
    open: boolean;
    sourceId: number;
    onClose: () => void;
}

type FormValuesProps = {
    title: string;
    description: string;
    note: string;
};

const defaultValues: FormValuesProps = {
    title: "",
    description: "",
    note: "",
};

export default function EditSourceDialogV2({
    botToken,
    open,
    sourceId,
    onClose,
}: EditSourceDialogProps) {
    const t = useTranslation();
    const snackbar = useSnackBar();
    const { handleError } = useHandleError();

    const methods = useForm<FormValuesProps>({
        defaultValues,
    });
    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const { data: sources } = useGetBotSource({
        botToken,
        enable: open,
        sourceId,
        onSuccess: (data) => {
            const [source] = data?.data?.data || [];
            if (source) {
                reset({
                    title: source.title,
                    description: source.description,
                    note: source.note,
                });
            }
        },
    });
    const source = sources.length > 0 ? sources[0] : undefined;

    const { mutateAsync: updateSource } = useUpdateBotSource({});

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            try {
                const response: any = await updateSource({
                    botToken,
                    id: sourceId,
                    source: source?.source || "",
                    title: data.title,
                    description: data.description,
                    note: data.note,
                });
                if (isRequestSuccessful(response)) {
                    snackbar({
                        message: t("success.editSource"),
                        severity: "success",
                    });
                } else {
                    snackbar({
                        message: t("error.editSource"),
                        severity: "error",
                    });
                }
                onClose();
            } catch (e) {
                handleError(e);
            }
        },
        [botToken, handleError, onClose, snackbar, source?.source, sourceId, t, updateSource]
    );

    return (
        <Dialog
            open={open}
            onClose={() => onClose()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <LoadingIcon open={isSubmitting || !source} />

            {source ? (
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle
                        sx={{
                            bgcolor: "primary.main",
                            color: "white",
                        }}
                    >
                        {`${t("common.edit")} ` + source.source}
                    </DialogTitle>
                    <DialogContent>
                        <RHFTextField
                            required
                            margin="normal"
                            fullWidth
                            id="title"
                            label={t("common.title")}
                            name="title"
                            size="small"
                        />
                        <RHFTextField
                            margin="normal"
                            fullWidth
                            id="description"
                            label={t("common.description")}
                            name="description"
                            autoComplete="description"
                            autoFocus
                            size="small"
                            multiline
                            rows={4}
                        />
                        <RHFTextField
                            margin="normal"
                            fullWidth
                            id="note"
                            label={t("common.note")}
                            name="note"
                            autoFocus
                            size="small"
                            multiline
                            rows={2}
                        />
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 2 }}>
                        <Button onClick={onClose}>{t("common.cancel")}</Button>
                        <Button type="submit" variant="contained" disabled={isSubmitting}>
                            {t("common.update")}
                        </Button>
                    </DialogActions>
                </FormProvider>
            ) : null}
        </Dialog>
    );
}
