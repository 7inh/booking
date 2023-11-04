import {
    Box,
    BoxProps,
    Button,
    Card,
    Grid,
    Input,
    InputLabel,
    Stack,
    Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { isRequestSuccessful } from "src/common/utils";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import RHFTextField from "src/components/RHFs/RHFTextField";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useUpdateOrganizeGroup from "src/hooks/useUpdateOrganizeGroup";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";
import useHandleError from "src/hooks/utils/useHandleError";

type FormValuesProps = {
    groupName: string;
    description: string;
};

export interface ProfileGroupProps extends BoxProps {
    organizeId: string;
    groupId: string;
    groupName: string;
    description: string;
    avatar?: string;
    editable?: boolean;
    onSuccess?: () => void;
}

const ProfileGroup = (props: ProfileGroupProps) => {
    const {
        organizeId,
        groupId,
        groupName,
        description,
        avatar = "",
        onSuccess,
        editable,
        ...rest
    } = props;

    const methods = useForm<FormValuesProps>({
        defaultValues: {
            groupName,
            description,
        },
    });
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const t = useTranslation();
    const snackbar = useSnackBar();
    const { handleError } = useHandleError();

    const [avatarBob, setAvatarBob] = useState<string | null>(avatar);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const { mutateAsync: updateGroup } = useUpdateOrganizeGroup();

    const handleLoadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64Url = reader.result;
            if (typeof base64Url === "string") {
                setAvatarBob(base64Url);
                setAvatarFile(file);
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            try {
                const response: any = await updateGroup({
                    organizeId,
                    groupId,
                    description: data.description,
                    name: data.groupName,
                    ...(avatarFile ? { avatar: avatarFile } : {}),
                });
                if (isRequestSuccessful(response)) {
                    snackbar({
                        message: t("success.updateGroup"),
                        severity: "success",
                    });
                    onSuccess?.();
                } else {
                    snackbar({
                        message: t("error.updateGroup"),
                        severity: "error",
                    });
                }
            } catch (error) {
                handleError(error);
            }
        },
        [avatarFile, groupId, handleError, onSuccess, organizeId, snackbar, t, updateGroup]
    );

    return (
        <Box {...rest}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <LoadingIcon open={isSubmitting} />

                <Stack direction="row" gap={3} width="100%">
                    <Card
                        sx={{
                            width: "250px",
                            boxShadow:
                                "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "16px",
                        }}
                    >
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            mb={2}
                            width="174px"
                            gap={3}
                        >
                            <Box
                                sx={{
                                    height: "128px",
                                    width: "128px",
                                    backgroundImage: `url(${avatarBob || "/botot.jpg"})`,
                                    backgroundSize: "contain",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    borderRadius: "100%",
                                }}
                            >
                                {editable ? (
                                    <InputLabel
                                        htmlFor="update-avatar"
                                        sx={{
                                            height: "100%",
                                            width: "100%",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                height: "100%",
                                                width: "100%",
                                                backgroundColor: "rgba(0, 0, 0, 0.48)",
                                                borderRadius: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                opacity: avatarBob ? 0 : 1,
                                                "&:hover": {
                                                    cursor: "pointer",
                                                    opacity: 1,
                                                },
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: "34px",
                                                    height: "50px",
                                                    backgroundImage: "url(/camera.svg)",
                                                    backgroundSize: "contain",
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundPosition: "center",
                                                }}
                                            ></Box>

                                            <Typography
                                                sx={{
                                                    fontWeight: 400,
                                                    fontSize: "12px",
                                                    lineHeight: "18px",
                                                    color: "#FFFFFF",
                                                }}
                                            >
                                                {t("common.updatePhoto")}
                                            </Typography>
                                        </Box>
                                    </InputLabel>
                                ) : null}
                            </Box>
                            <Input
                                type="file"
                                id="update-avatar"
                                sx={{ display: "none" }}
                                onChange={handleLoadAvatar}
                                inputProps={{ accept: "image/*" }}
                            />
                        </Box>
                    </Card>

                    <Card
                        sx={{
                            flexGrow: 1,
                            p: 3,
                            borderRadius: "16px",
                            boxShadow:
                                "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
                        }}
                    >
                        <Grid container spacing={1} rowSpacing={1.5}>
                            <Grid item xs={12}>
                                <RHFTextField
                                    InputProps={{
                                        readOnly: !editable,
                                    }}
                                    size="small"
                                    required
                                    name="groupName"
                                    label="Group Name"
                                    sx={{
                                        "& fieldset": {
                                            border: "1px solid rgba(145, 158, 171, 0.20)",
                                            borderRadius: "8px",
                                        },
                                        "& label": {
                                            color: "#919EAB",
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <RHFTextField
                                    InputProps={{
                                        readOnly: !editable,
                                    }}
                                    size="small"
                                    sx={{
                                        mb: 2,
                                        "& fieldset": {
                                            border: "1px solid rgba(145, 158, 171, 0.20)",
                                            borderRadius: "8px",
                                        },
                                        "& label": {
                                            color: "#919EAB",
                                        },
                                    }}
                                    name="description"
                                    label={t("common.description")}
                                    multiline
                                    rows={3}
                                />
                            </Grid>
                        </Grid>
                        {editable ? (
                            <Stack gap={1} direction="row" justifyContent="end">
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{
                                        color: "white",
                                        boxShadow: "none",
                                        borderRadius: "8px",
                                        textTransform: "none",
                                    }}
                                >
                                    {t("common.update")}
                                </Button>
                            </Stack>
                        ) : null}
                    </Card>
                </Stack>
            </FormProvider>
        </Box>
    );
};

export default ProfileGroup;
