import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { isRequestSuccessful } from "src/common/utils";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import RHFTextField from "src/components/RHFs/RHFTextField";
import { useAccountContext } from "src/contexts/AccountContext";
import useInsertOrganize from "src/hooks/useInsertOrganize";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";

export interface CreateOrganizeDialogProps {
    open: boolean;
    onClose: () => void;
}

type FormValuesProps = {
    ownerToken: string;
    name: string;
    description: string;
    major: string;
};

const defaultValues = {
    ownerToken: "",
    name: "",
    description: "",
    major: "",
};

export default function CreateOrganizeDialog({ open, onClose }: CreateOrganizeDialogProps) {
    const {
        user: { userToken },
    } = useAccountContext();
    const methods = useForm<FormValuesProps>({
        defaultValues,
    });
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const t = useTranslation();
    const snackbar = useSnackBar();
    const { handleError } = useHandleError();

    const { mutateAsync: insertOrganize } = useInsertOrganize();

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            try {
                const response: any = await insertOrganize({
                    ownerToken: data.ownerToken || userToken,
                    description: data.description,
                    name: data.name,
                    major: data.major,
                });

                if (isRequestSuccessful(response)) {
                    snackbar({
                        message: t("success.createGroup"),
                        severity: "success",
                    });
                    onClose();
                }
            } catch (error) {
                handleError(error);
            }
        },
        [handleError, insertOrganize, onClose, snackbar, t, userToken]
    );

    return (
        <Dialog open={open} onClose={() => onClose()}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <LoadingIcon open={isSubmitting} />

                <DialogTitle
                    sx={{
                        bgcolor: "primary.main",
                        color: "white",
                    }}
                >
                    {t("dialog.createOrganization.title")}
                </DialogTitle>
                <DialogContent>
                    <br />
                    <RHFTextField
                        name="ownerToken"
                        label="ownerToken"
                        sx={{
                            mb: 2,
                        }}
                    />
                    <RHFTextField
                        required
                        name="name"
                        label={t("common.name")}
                        sx={{
                            mb: 2,
                        }}
                    />
                    <RHFTextField
                        name="description"
                        label={t("common.description")}
                        multiline
                        rows={4}
                    />
                    <RHFTextField
                        name="major"
                        label={t("common.major")}
                        sx={{
                            mt: 2,
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={onClose}>{t("common.cancel")}</Button>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                        {t("common.create")}
                    </Button>
                </DialogActions>
            </FormProvider>
        </Dialog>
    );
}
