import { Box, Chip } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { isRequestSuccessful } from "src/common/utils";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import RHFAutocomplete from "src/components/RHFs/RHFAutocomplete";
import useInsertMember from "src/hooks/useInsertMember";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";
import { v4 as uuidv4 } from "uuid";

export interface CreateOrganizeDialogProps {
    open: boolean;
    onClose: () => void;
    onCreateSuccess: () => void;
    organizationId: string;
}

type FormValuesProps = {
    emails: string[];
};

const defaultValues: FormValuesProps = {
    emails: [],
};

export default function AddUserIntoOrgDialog({
    open,
    organizationId,
    onClose,
    onCreateSuccess,
}: CreateOrganizeDialogProps) {
    const t = useTranslation();

    const methods = useForm<FormValuesProps>({
        defaultValues,
    });
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const snackbar = useSnackBar();
    const { handleError } = useHandleError();

    const { mutateAsync: insertMember } = useInsertMember();

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            try {
                if (data.emails.length === 0) {
                    snackbar({
                        message: t("message.pleasePressEnterAfterTypingTheEmail"),
                        severity: "warning",
                    });

                    return;
                }
                const response: any = await insertMember({
                    inviteOrganize: true,
                    organizeId: organizationId,
                    listInvite: data.emails,
                });
                if (isRequestSuccessful(response)) {
                    snackbar({
                        message: t("success.addUserToOrganization"),
                        severity: "success",
                    });
                    onCreateSuccess();
                    onClose();
                }
            } catch (error) {
                handleError(error);
            }
        },
        [handleError, insertMember, onClose, onCreateSuccess, organizationId, snackbar, t]
    );

    return (
        <Dialog open={open} onClose={() => onClose()} fullWidth>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <LoadingIcon open={isSubmitting} />

                <DialogTitle
                    sx={{
                        bgcolor: "primary.main",
                        color: "white",
                    }}
                >
                    {t("common.addUserToOrganization")}
                </DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            mt: 2,
                        }}
                    >
                        <RHFAutocomplete
                            required
                            multiple
                            id="tags-filled"
                            options={[]}
                            freeSolo
                            type="tags"
                            renderTags={(value: readonly string[], getTagProps: any) =>
                                value.map((option: string, index: number) => (
                                    <Chip
                                        key={uuidv4()}
                                        variant="outlined"
                                        label={option}
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }
                            name="emails"
                            label="Email Users"
                            helperText="Enter user email then press enter"
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={onClose}>{t("common.cancel")}</Button>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                        {t("common.addMember")}
                    </Button>
                </DialogActions>
            </FormProvider>
        </Dialog>
    );
}
