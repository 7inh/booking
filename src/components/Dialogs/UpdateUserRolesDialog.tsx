import { Box, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { memo, useCallback, useMemo } from "react";
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

export interface CreateOrganizeDialogProps {
    organizeId: string;
    open: boolean;
    selectedRow: any;
    onClose: () => void;
}

type FormValuesProps = {
    group: string;
    role: string;
};

const defaultValues = {
    group: "",
    role: "",
};

const UpdateUserRolesDialog = ({
    organizeId,
    open,
    onClose,
    selectedRow,
}: CreateOrganizeDialogProps) => {
    const {
        email,
        group,
    }: {
        group: any[];
        email: string;
    } = selectedRow || {
        group: [],
        email: "",
    };

    const t = useTranslation();

    const methods = useForm<FormValuesProps>({
        defaultValues,
    });
    const {
        reset,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const snackbar = useSnackBar();
    const { handleError } = useHandleError();

    const { isFetching, data: userRoles } = useGetMemberRoles({
        organizeId,
        email,
    });

    const { mutateAsync: insertMemberRoles } = useInsertMemberRoles({});
    const { mutateAsync: deleteMemberRoles } = useDeleteMemberRoles({});

    const joinedGroup = useMemo(() => group?.filter((item: any) => item.verified), [group]);

    const handleDeleteRoles = useCallback(
        async (data: FormValuesProps) => {
            try {
                const listDelete = userRoles
                    ?.filter((item: any) => item.groupId === data.group)
                    ?.map((item: any) => ({
                        email,
                        role: item.groupRole,
                    }));

                const response: any = await deleteMemberRoles({
                    deleteOrganize: false,
                    organizeId,
                    groupId: data.group,
                    listDelete,
                });

                return isRequestSuccessful(response);
            } catch (error) {
                handleError(error);
            }

            return false;
        },
        [deleteMemberRoles, email, handleError, organizeId, userRoles]
    );

    const handleInsertRoles = useCallback(
        async (data: FormValuesProps) => {
            try {
                const response: any = await insertMemberRoles({
                    addOrganize: false,
                    organizeId,
                    groupId: data.group,
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
        [email, handleError, insertMemberRoles, organizeId]
    );

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            if ((await handleDeleteRoles(data)) && (await handleInsertRoles(data))) {
                snackbar({
                    message: t("success.updateUserRole"),
                    severity: "success",
                });
                onClose();
                reset();
            } else {
                snackbar({
                    message: t("error.cannotUpdateUserRole"),
                    severity: "error",
                });
            }
        },
        [handleDeleteRoles, handleInsertRoles, onClose, reset, snackbar, t]
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
                    Update User Roles
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
                        <RHFSelect
                            loading={isFetching}
                            required
                            name="group"
                            label={t("common.group")}
                            onChange={(value) => {
                                const groupId = value.target.value;
                                const role = userRoles?.find(
                                    (item: any) => item.groupId === groupId
                                )?.groupRole;

                                if (role) setValue("role", role);
                            }}
                        >
                            {joinedGroup.map((item) => (
                                <MenuItem key={item.groupId} value={item.groupId}>
                                    {item.isMain ? t("common.general") : item.groupName}
                                </MenuItem>
                            ))}
                        </RHFSelect>
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

export default memo(UpdateUserRolesDialog);
