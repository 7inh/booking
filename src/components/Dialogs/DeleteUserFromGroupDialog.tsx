import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import { Fragment, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { isRequestSuccessful } from "src/common/utils";
import ConfirmDialogV2 from "src/components/Dialogs/ConfirmDialogV2";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import RHFAutocomplete from "src/components/RHFs/RHFAutocomplete";
import useGetOrganizeMember from "src/hooks/useGetOrganizeMember";
import useRemoveUserFromOrgOrGroup from "src/hooks/useRemoveUserFromOrgOrGroup";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";
import { v4 as uuidv4 } from "uuid";

export interface DeleteUserFromGroupDialogProps {
    organizeId: string;
    groupId: string;
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

type FormValuesProps = {
    email: string[];
};

const defaultValues = {
    email: [],
};

export default function DeleteUserFromGroupDialog({
    organizeId,
    groupId,
    open,
    onClose,
    onSuccess,
}: DeleteUserFromGroupDialogProps) {
    const methods = useForm<FormValuesProps>({
        defaultValues,
    });
    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const snackbar = useSnackBar();
    const t = useTranslation();
    const { handleError } = useHandleError();

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const { data: members, isFetching } = useGetOrganizeMember({
        organizeId,
        groupId,
    });
    const { mutateAsync: removeUser } = useRemoveUserFromOrgOrGroup({});

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            try {
                const listDelete = data.email.map((item: any) => item.email);
                const response: any = await removeUser({
                    organizeId,
                    deleteOrganize: false,
                    groupId,
                    listDelete,
                });

                if (isRequestSuccessful(response)) {
                    snackbar({
                        message: t("success.deleteUserFromGroup"),
                        severity: "success",
                    });
                    onClose();
                    onSuccess();
                }
            } catch (error) {
                handleError(error);
            }
        },
        [groupId, handleError, onClose, onSuccess, organizeId, removeUser, snackbar, t]
    );

    return (
        <>
            <LoadingIcon open={isSubmitting} />
            <Dialog
                open={open}
                onClose={() => onClose()}
                fullWidth
                PaperProps={{
                    style: { borderRadius: 8 },
                }}
            >
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle
                        sx={{
                            bgcolor: "primary.main",
                            color: "white",
                        }}
                    >
                        {t("dialog.deleteMemberFromGroup.title")}
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
                            <RHFAutocomplete
                                loading={isFetching}
                                required
                                size="small"
                                name="email"
                                label="Email User"
                                multiple
                                options={members}
                                getOptionLabel={(option: any) => option.userName || ""}
                                filterSelectedOptions
                                isOptionEqualToValue={(option, value) =>
                                    option.email === value.email
                                }
                                renderOption={(props: any, option) => (
                                    <Fragment key={uuidv4()}>
                                        <Box
                                            {...props}
                                            px={1}
                                            pb={1}
                                            display="flex"
                                            flexDirection="column"
                                        >
                                            <Typography variant="body1" width="100%">
                                                {option.userName}
                                            </Typography>
                                            <Typography variant="caption" width="100%">
                                                {option.email}
                                            </Typography>
                                        </Box>
                                    </Fragment>
                                )}
                            />
                        </Box>
                    </DialogContent>

                    <ConfirmDialogV2
                        open={openConfirmDialog}
                        onClose={() => {
                            onClose();
                            setOpenConfirmDialog(false);
                            reset();
                        }}
                        onConfirm={() => {
                            handleSubmit(onSubmit)();
                            setOpenConfirmDialog(false);
                            reset();
                        }}
                        title={t("dialog.deleteMember.title")}
                        content={t("dialog.deleteMember.content")}
                    />
                    <DialogActions sx={{ px: 3, pb: 2 }}>
                        <Button
                            onClick={() => {
                                onClose();
                                reset();
                            }}
                        >
                            {t("common.cancel")}
                        </Button>
                        <Button
                            onClick={() => setOpenConfirmDialog(true)}
                            variant="contained"
                            disabled={isSubmitting}
                        >
                            {t("common.delete")}
                        </Button>
                    </DialogActions>
                </FormProvider>
            </Dialog>
        </>
    );
}
