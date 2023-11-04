import { Box, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { isRequestSuccessful } from "src/common/utils";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import { RHFSelect } from "src/components/RHFs/RHFSelect";
import useDeleteMemberRoles from "src/hooks/useDeleteMemberRoles";
import useGetMemberRoles from "src/hooks/useGetMemberRoles";
import useInsertMemberRoles from "src/hooks/useInsertMemberRoles";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";

export interface DialogUpdateUserRoleInGroupProps {
    organizeId: string;
    groupId: string;
    email: string;
    open: boolean;
    onClose: () => void;
}

type FormValuesProps = {
    role: string;
};

const defaultValues = {
    role: "",
};

const DialogUpdateUserRoleInGroup = ({
    organizeId,
    groupId,
    email,
    open,
    onClose,
}: DialogUpdateUserRoleInGroupProps) => {
    const t = useTranslation();

    const methods = useForm<FormValuesProps>({
        defaultValues,
    });
    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const snackbar = useSnackBar();
    const { handleError } = useHandleError();

    const {
        isFetching,
        data: userRoles,
        refetch,
    } = useGetMemberRoles({
        organizeId,
        groupId,
        email,
        onSuccess: (data) => {
            const [defaultValues] = data?.data?.data || [];
            reset({
                role: defaultValues?.groupRole,
            });
        },
    });

    const { mutateAsync: insertMemberRoles } = useInsertMemberRoles({});
    const { mutateAsync: deleteMemberRoles } = useDeleteMemberRoles({});

    const handleDeleteRoles = useCallback(async () => {
        try {
            const listDelete = userRoles?.map((item: any) => ({
                email,
                role: item.groupRole,
            }));

            const response: any = await deleteMemberRoles({
                deleteOrganize: false,
                organizeId,
                groupId,
                listDelete,
            });

            return isRequestSuccessful(response);
        } catch (error) {
            handleError(error);
        }

        return false;
    }, [deleteMemberRoles, email, groupId, handleError, organizeId, userRoles]);

    const handleInsertRoles = useCallback(
        async (data: FormValuesProps) => {
            try {
                const response: any = await insertMemberRoles({
                    addOrganize: false,
                    organizeId,
                    groupId,
                    listRoles: [
                        {
                            email,
                            role: data.role,
                        },
                    ],
                });

                return isRequestSuccessful(response);
            } catch (error) {
                handleError(error);
            }

            return false;
        },
        [email, groupId, handleError, insertMemberRoles, organizeId]
    );

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            if ((await handleDeleteRoles()) && (await handleInsertRoles(data))) {
                snackbar({
                    message: t("success.updateUserRole"),
                    severity: "success",
                });
                onClose();
                reset();
                refetch();
            } else {
                snackbar({
                    message: t("error.cannotUpdateUserRole"),
                    severity: "error",
                });
            }
        },
        [handleDeleteRoles, handleInsertRoles, onClose, refetch, reset, snackbar, t]
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
                    {t("dialog.updateRole.title")}
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
                        <RHFSelect required name="role" label="Role" loading={isFetching}>
                            {[
                                {
                                    id: "USER",
                                    value: "User",
                                },
                                {
                                    id: "CREATOR",
                                    value: "Creator",
                                },
                            ].map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.value}
                                </MenuItem>
                            ))}
                        </RHFSelect>
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

export default memo(DialogUpdateUserRoleInGroup);
