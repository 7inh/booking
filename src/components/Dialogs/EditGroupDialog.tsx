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
import useUpdateOrganizeGroup from "src/hooks/useUpdateOrganizeGroup";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";

export interface UpdateOrganizeGroupDialogProps {
    organizeId: string;
    groupSelected: {
        groupName: string;
        description: string;
        groupId: string;
    };
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

type FormValuesProps = {
    name: string;
    description: string;
};

export default function EditGroupDialog({
    organizeId,
    groupSelected: group,
    open,
    onClose,
    onSuccess,
}: UpdateOrganizeGroupDialogProps) {
    const t = useTranslation();

    const methods = useForm<FormValuesProps>({
        defaultValues: {
            name: group.groupName,
            description: group.description,
        },
    });
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const snackbar = useSnackBar();
    const { handleError } = useHandleError();

    const { mutateAsync: updateGroup } = useUpdateOrganizeGroup();

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            try {
                const response: any = await updateGroup({
                    organizeId,
                    groupId: group.groupId,
                    description: data.description,
                    name: data.name,
                });
                if (isRequestSuccessful(response)) {
                    snackbar({
                        message: t("success.updateGroup"),
                        severity: "success",
                    });
                    onSuccess();
                    onClose();
                }
            } catch (error) {
                handleError(error);
            }
        },
        [group.groupId, handleError, onClose, onSuccess, organizeId, snackbar, t, updateGroup]
    );

    return (
        <Dialog open={open} onClose={() => onClose()}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <LoadingIcon open={isSubmitting} />

                <DialogTitle>{t("dialog.updateGroup.title")}</DialogTitle>
                <DialogContent>
                    <br />
                    <RHFTextField
                        required
                        name="name"
                        label="name"
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
}
