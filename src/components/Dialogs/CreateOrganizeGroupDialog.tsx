import { Avatar, Box, Input, InputLabel } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { isRequestSuccessful } from "src/common/utils";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import RHFTextField from "src/components/RHFs/RHFTextField";
import useInsertOrganizeGroup from "src/hooks/useInsertOrganizeGroup";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";

export interface CreateOrganizeDialogProps {
    organizeId: string;
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

type FormValuesProps = {
    name: string;
    description: string;
};

const defaultValues = {
    name: "",
    description: "",
};

export default function CreateOrganizeGroupDialog({
    organizeId,
    open,
    onClose,
    onSuccess,
}: CreateOrganizeDialogProps) {
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

    const [avatarBob, setAvatarBob] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const { mutateAsync: insertOrganizeGroup } = useInsertOrganizeGroup();

    const handleLoadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64Url = reader.result;
            if (typeof base64Url === "string") {
                setAvatarBob(base64Url);
                setFile(file);
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            try {
                const response: any = await insertOrganizeGroup({
                    organizeId,
                    description: data.description,
                    name: data.name,
                    ...(file && { avatar: file }),
                });

                if (isRequestSuccessful(response)) {
                    snackbar({
                        message: t("success.createGroup"),
                        severity: "success",
                    });
                    onClose();
                    onSuccess();
                }
            } catch (error) {
                handleError(error);
            }
        },
        [file, handleError, insertOrganizeGroup, onClose, onSuccess, organizeId, snackbar, t]
    );

    return (
        <Dialog
            open={open}
            onClose={() => onClose()}
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
                    {t("dialog.createGroup.title")}
                </DialogTitle>
                <DialogContent>
                    <br />
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        mb={2}
                    >
                        <Avatar
                            sx={{
                                height: "120px",
                                width: "120px",
                            }}
                            src={avatarBob || "/botot.jpg"}
                            imgProps={{ style: { objectFit: "contain" } }}
                        />
                        <Input
                            type="file"
                            id="update-avatar"
                            sx={{ display: "none" }}
                            onChange={handleLoadAvatar}
                            inputProps={{ accept: "image/*" }}
                        />
                        <InputLabel htmlFor="update-avatar">
                            <Button component="span">{t("common.selectAvatar")}</Button>
                        </InputLabel>
                    </Box>
                    <RHFTextField
                        required
                        name="name"
                        label="name"
                        sx={{
                            mb: 2,
                        }}
                    />
                    <RHFTextField name="description" label="description" multiline rows={4} />
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
