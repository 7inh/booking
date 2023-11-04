import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Fragment, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { groupAndJoinItemsByKey, isRequestSuccessful } from "src/common/utils";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import RHFAutocomplete from "src/components/RHFs/RHFAutocomplete";
import useGetOrganizeMember from "src/hooks/useGetOrganizeMember";
import useInsertMember from "src/hooks/useInsertMember";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";
import { v4 as uuidv4 } from "uuid";

export interface CreateOrganizeDialogProps {
    organizeId: string;
    groupId: string;
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

type FormValuesProps = {
    email: any[];
};

const defaultValues = {
    email: [],
};

export default function AddUserIntoGroupDialog({
    open,
    onClose,
    onSuccess,
    organizeId,
    groupId,
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

    const { data: membersRaw } = useGetOrganizeMember({
        organizeId,
    });
    const { mutateAsync: insertMember } = useInsertMember();

    const notJoinMember = useMemo(() => {
        const members = groupAndJoinItemsByKey<any>(membersRaw, "email", ["groupId"], "group");
        return members.filter((item: any) => item.groupId !== groupId);
    }, [groupId, membersRaw]);

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            try {
                const listInvite = data.email.map((item: any) => item.email);
                const response: any = await insertMember({
                    inviteOrganize: false,
                    organizeId,
                    groupId,
                    listInvite,
                });
                if (isRequestSuccessful(response)) {
                    snackbar({
                        message: t("success.addUserToGroup"),
                        severity: "success",
                    });
                    onSuccess?.();
                }
            } catch (error) {
                handleError(error);
            }
        },
        [groupId, handleError, insertMember, onSuccess, organizeId, snackbar, t]
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
                    {t("dialog.addUserToGroup.title")}
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
                            required
                            size="small"
                            name="email"
                            label="Email User"
                            type="tags"
                            multiple
                            options={notJoinMember}
                            getOptionLabel={(option: any) => option.userName || ""}
                            filterSelectedOptions
                            isOptionEqualToValue={(option, value) => option.email === value.email}
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
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={onClose}>{t("common.cancel")}</Button>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                        {t("common.add")}
                    </Button>
                </DialogActions>
            </FormProvider>
        </Dialog>
    );
}
