import {
    Box,
    BoxProps,
    Button,
    Card,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Stack,
    Typography,
} from "@mui/material";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { isRequestSuccessful, randomColor } from "src/common/utils";
import RHFAutocompleteLLM from "src/components/Autocompletes/RHFAutocompleteLLM";
import RHFAutocompleteTags from "src/components/Autocompletes/RHFAutocompleteTags";
import RHFAutocompleteVoice from "src/components/Autocompletes/RHFAutocompleteVoice";
import BotAvatar from "src/components/Bot/BotAvatar";
import BotPriceV3 from "src/components/Bot/BotPriceV3";
import AccountNotVerifiedDialog from "src/components/Dialogs/AccountNotVerifiedDialog";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import RHFAutocomplete from "src/components/RHFs/RHFAutocomplete";
import { RHFSelect } from "src/components/RHFs/RHFSelect";
import RHFSwitch from "src/components/RHFs/RHFSwitch";
import RHFTextField from "src/components/RHFs/RHFTextField";
import { useTranslationContext } from "src/contexts/TranslationContext";
import { useUnsavedChangesContext } from "src/contexts/UnsavedChangesContext";
import useRegisterBot from "src/hooks/useRegisterBot";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";

type FormValuesProps = {
    botName: string;
    description: string;
    voiceId: any | null;
    facts: string;
    tags: string[];
    language: string;
    onlyContext?: boolean;
    group: any | null;
    startMessage: string;
    llm: any | null;
};

const defaultValues: FormValuesProps = {
    botName: "",
    description: "",
    voiceId: null,
    facts: "",
    tags: [],
    language: "vietnamese",
    onlyContext: true,
    group: null,
    startMessage: "",
    llm: null,
};

export interface CreateBotFormProps extends BoxProps {
    organizeId?: string;
    groupId?: string;
    groups?: any[];
    onCreateSuccess?: (botToken?: string) => void;
    showActions?: boolean;
    shouldSubmit?: boolean;
    showGroupField?: boolean;
}

const FormCreateBot = ({
    organizeId = "",
    groupId: defaultGroupId = "",
    groups = [],
    onCreateSuccess,
    showActions,
    shouldSubmit = false,
    showGroupField = false,
    ...rest
}: CreateBotFormProps) => {
    const { locale } = useTranslationContext();
    const t = useTranslation();
    const snackbar = useSnackBar();
    const { handleError } = useHandleError();
    const { shouldBlock: _shouldBlock, setShouldBlock } = useUnsavedChangesContext();

    const methods = useForm<FormValuesProps>({
        defaultValues: {
            ...defaultValues,
            ...(showGroupField && groups.length ? { group: groups[0] } : {}),
            startMessage: t("form.default.startMessage"),
        },
    });
    const {
        reset,
        handleSubmit,
        trigger,
        watch,
        setValue,
        formState: { isSubmitting, isDirty },
    } = methods;

    const price = watch("llm")?.price || 0;
    const botName = watch("botName");

    const [openAccountNotVerifiedDialog, setOpenAccountNotVerifiedDialog] = useState(false);
    const [avatarBob, setAvatarBob] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [isDirtyAutoComplete, setIsDirtyAutoComplete] = useState(false);
    const [currentContentLength, setCurrentContentLength] = useState(0);

    const avatarBgColor = useMemo(() => randomColor(), []);
    const shouldBlock = useMemo(
        () => isDirty || isDirtyAutoComplete || avatarFile !== null,
        [avatarFile, isDirty, isDirtyAutoComplete]
    );

    const { mutateAsync: registerBot } = useRegisterBot();

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

    const clearDirty = useCallback(() => {
        setIsDirtyAutoComplete(false);
        setAvatarFile(null);
        reset({}, { keepValues: true });
    }, [reset]);

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            try {
                const groupId = data.group?.groupId || defaultGroupId;
                const response: any = await registerBot({
                    ...(organizeId ? { organizeId } : {}),
                    ...(groupId !== organizeId ? { groupId } : {}),
                    botName: data.botName,
                    description: data.description,
                    voiceId: data.voiceId.id,
                    facts: [data.facts],
                    tags: data.tags,
                    language: data.language,
                    onlyContext: !data.onlyContext,
                    startMessage: data.startMessage,
                    ...(data.llm ? { llm: data.llm.modelName } : {}),
                    ...(avatarFile
                        ? { avatar: avatarFile }
                        : {
                              chatColor: avatarBgColor,
                          }),
                });
                if (isRequestSuccessful(response)) {
                    snackbar({
                        message: t("success.createBot"),
                        severity: "success",
                    });
                    clearDirty();
                    setShouldBlock(false);
                    const botToken = response.data.data.botToken;
                    onCreateSuccess?.(botToken);
                } else {
                    snackbar({
                        message: t("error.createBot"),
                        severity: "warning",
                    });
                }
            } catch (error: any) {
                if (error.response?.data?.data?.code === "UNVERIFIED_USER") {
                    setOpenAccountNotVerifiedDialog(true);
                    return;
                }

                handleError(error);
            }
        },
        [
            avatarBgColor,
            avatarFile,
            clearDirty,
            defaultGroupId,
            handleError,
            onCreateSuccess,
            organizeId,
            registerBot,
            setShouldBlock,
            snackbar,
            t,
        ]
    );

    const renderAccountNotVerifiedDialog = useMemo(
        () => (
            <AccountNotVerifiedDialog
                open={openAccountNotVerifiedDialog}
                onClose={() => setOpenAccountNotVerifiedDialog(false)}
            />
        ),
        [openAccountNotVerifiedDialog]
    );

    useEffect(() => {
        if (shouldSubmit) {
            trigger().then((isValid) => {
                if (isValid) {
                    handleSubmit(onSubmit)();
                }
            });
        }
    }, [handleSubmit, onSubmit, shouldSubmit, trigger]);

    useEffect(() => {
        setValue("startMessage", t("form.default.startMessage"));
    }, [locale, setValue, t]);

    useEffect(() => {
        if (shouldBlock !== _shouldBlock) setShouldBlock(shouldBlock);
    }, [_shouldBlock, setShouldBlock, shouldBlock]);

    return (
        <Box {...rest}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <LoadingIcon open={isSubmitting} />
                {renderAccountNotVerifiedDialog}
                <Stack direction={{ sm: "row", xs: "column" }} gap={3} width="100%">
                    <Card
                        sx={{
                            width: {
                                xs: "100%",
                                sm: "300px",
                            },
                            boxShadow:
                                "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "16px",
                            flexShrink: 0,
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
                            p={{ xs: 2.5, sm: 0 }}
                        >
                            <InputLabel htmlFor="update-avatar">
                                <Box>
                                    <Box
                                        sx={{
                                            height: "128px",
                                            width: "128px",
                                            borderRadius: "100%",
                                            position: "relative",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                height: "100%",
                                                width: "100%",
                                                zIndex: 1,
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
                                                    opacity: 0,
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
                                        </Box>
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                            }}
                                        >
                                            <BotAvatar
                                                botName={botName}
                                                chatColor={avatarBgColor}
                                                src={avatarBob || ""}
                                                size="128px"
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </InputLabel>
                            <Typography
                                textAlign="center"
                                sx={{
                                    fontWeight: 400,
                                    fontSize: "12px",
                                    lineHeight: "18px",
                                    color: "#919EAB",
                                }}
                            >
                                {t("form.allowBotAvatarTypeAndSize")}
                            </Typography>
                            <Input
                                type="file"
                                id="update-avatar"
                                sx={{ display: "none" }}
                                onChange={handleLoadAvatar}
                                inputProps={{ accept: "image/*" }}
                            />
                            <BotPriceV3 price={price} />
                            <RHFSwitch
                                name="onlyContext"
                                size="small"
                                label={
                                    <Box mr={1.5}>
                                        <Typography
                                            sx={{
                                                fontSize: "14px",
                                                fontWeight: 400,
                                                lineHeight: "22px",
                                            }}
                                        >
                                            {t("form.onlyContext")}
                                        </Typography>
                                    </Box>
                                }
                                labelPlacement="start"
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
                            {showGroupField ? (
                                <>
                                    <Grid item xs={12} sm={6}>
                                        <RHFAutocomplete
                                            size="small"
                                            name="group"
                                            label="Select Group"
                                            helperText={t("form.helperText.group")}
                                            options={groups}
                                            getOptionLabel={(option: any) => option.groupName}
                                            isOptionEqualToValue={(option, value) =>
                                                option.groupId === value.groupId
                                            }
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
                                    <Grid item xs={12} sm={6}></Grid>
                                </>
                            ) : null}
                            <Grid item xs={12} sm={6}>
                                <RHFTextField
                                    rules={{
                                        required: t("form.error.botNameRequired"),
                                        validate: (value) => {
                                            if (!value.trim()) {
                                                return t("form.error.botNameIsInvalid");
                                            }
                                        },
                                    }}
                                    onChange={() => {
                                        if (methods.formState.errors.botName) {
                                            methods.clearErrors("botName");
                                        }
                                    }}
                                    size="small"
                                    required
                                    name="botName"
                                    label={t("common.botName")}
                                    helperText={t("form.helperText.botName")}
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
                            <Grid item xs={12} sm={6}>
                                <RHFAutocompleteVoice
                                    onChange={() => setIsDirtyAutoComplete(true)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RHFSelect
                                    size="small"
                                    name="language"
                                    label={t("common.language")}
                                    helperText={t("form.helperText.language")}
                                    sx={{
                                        "& fieldset": {
                                            border: "1px solid rgba(145, 158, 171, 0.20)",
                                            borderRadius: "8px",
                                        },
                                        "& label": {
                                            color: "#919EAB",
                                        },
                                    }}
                                >
                                    {[
                                        {
                                            id: "vietnamese",
                                            value: "Vietnamese",
                                        },
                                        {
                                            id: "english",
                                            value: "English",
                                        },
                                    ].map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.value}
                                        </MenuItem>
                                    ))}
                                </RHFSelect>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RHFAutocompleteTags
                                    onChange={() => setIsDirtyAutoComplete(true)}
                                />
                            </Grid>
                            <Grid item xs={12} position="relative">
                                <RHFTextField
                                    fullWidth
                                    size="small"
                                    label={t("common.facts")}
                                    helperText={t("form.helperText.facts")}
                                    placeholder={t("form.placeHolder.facts")}
                                    name="facts"
                                    minRows={3}
                                    maxRows={10}
                                    multiline
                                    sx={{
                                        "& fieldset": {
                                            border: "1px solid rgba(145, 158, 171, 0.20)",
                                            borderRadius: "8px",
                                        },
                                        "& label": {
                                            color: "#919EAB",
                                        },
                                    }}
                                    inputProps={{
                                        maxLength: 1000,
                                    }}
                                    onChange={(e) => {
                                        setCurrentContentLength(e.target.value.length);
                                    }}
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        position: "absolute",
                                        bottom: 5,
                                        right: 0,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "text.disabled",
                                            fontSize: "12px",
                                        }}
                                    >
                                        {currentContentLength}/1000
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <RHFTextField
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
                                    placeholder={t("form.placeHolder.description")}
                                    helperText={t("form.helperText.description")}
                                    multiline
                                    minRows={3}
                                    maxRows={10}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <RHFTextField
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
                                    name="startMessage"
                                    label={t("common.startMessage")}
                                    placeholder={t("form.placeHolder.startMessage")}
                                    helperText={t("form.helperText.startMessage")}
                                    multiline
                                    rows={3}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <RHFAutocompleteLLM onChange={() => setIsDirtyAutoComplete(true)} />
                            </Grid>
                        </Grid>
                        {showActions ? (
                            <Stack
                                gap={1}
                                direction="row"
                                justifyContent={{ sm: "end", xs: "center" }}
                                pt={{ xs: 1.5, md: 0 }}
                            >
                                <Button
                                    variant="outlined"
                                    sx={{
                                        boxShadow: "none",
                                        borderRadius: "8px",
                                        textTransform: "none",
                                    }}
                                    onClick={() => reset()}
                                >
                                    {t("common.reset")}
                                </Button>

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
                                    {t("common.create")}
                                </Button>
                            </Stack>
                        ) : null}
                    </Card>
                </Stack>
            </FormProvider>
        </Box>
    );
};

export default memo(FormCreateBot);
