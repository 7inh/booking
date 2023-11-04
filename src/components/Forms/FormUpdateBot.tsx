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
    TextField,
    Typography,
} from "@mui/material";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Bot } from "src/common/types";
import { isRequestSuccessful, randomColor } from "src/common/utils";
import RHFAutocompleteLLM from "src/components/Autocompletes/RHFAutocompleteLLM";
import RHFAutocompleteTags from "src/components/Autocompletes/RHFAutocompleteTags";
import RHFAutocompleteVoice from "src/components/Autocompletes/RHFAutocompleteVoice";
import BotAvatar from "src/components/Bot/BotAvatar";
import BotPriceV3 from "src/components/Bot/BotPriceV3";
import DangerZone from "src/components/Forms/DangerZone";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import { RHFSelect } from "src/components/RHFs/RHFSelect";
import RHFSwitch from "src/components/RHFs/RHFSwitch";
import RHFTextField from "src/components/RHFs/RHFTextField";
import { useUnsavedChangesContext } from "src/contexts/UnsavedChangesContext";
import useUpdateBotProfile from "src/hooks/useUpdateBotProfile";
import useUploadAvatarBot from "src/hooks/useUploadAvatarBot";
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
    onlyContext: boolean;
    startMessage: string;
    llm: {
        modelName: string;
        price: number;
    } | null;
};

export interface FormUpdateBotProps extends BoxProps {
    botProfile: Bot;
    voices: any[];
    languageModels: any[];
    onUpdateSuccess?: () => void;
}

const FormUpdateBot = ({
    botProfile,
    voices = [],
    languageModels = [],
    onUpdateSuccess,
    ...rest
}: FormUpdateBotProps) => {
    const isClone = useMemo(
        () => botProfile.level === 3 || botProfile.level === 2,
        [botProfile.level]
    );

    const t = useTranslation();
    const snackbar = useSnackBar();
    const { handleError } = useHandleError();
    const { shouldBlock, setShouldBlock } = useUnsavedChangesContext();

    const methods = useForm<FormValuesProps>({
        defaultValues: {
            botName: botProfile.botName,
            description: isClone ? botProfile.publishDescription : botProfile.description,
            facts: botProfile.facts?.[0],
            tags: botProfile.tags || [],
            language: botProfile.language?.toLocaleLowerCase() || "vietnamese",
            voiceId: voices.find((item) => item.id === botProfile.voiceId),
            onlyContext: !botProfile.onlyContext,
            startMessage: botProfile.startMessage,
            llm: languageModels.find((item) => item.modelName === botProfile.llm),
        },
    });
    const {
        handleSubmit,
        watch,
        getValues,
        reset,
        formState: { isSubmitting, isDirty },
    } = methods;

    const priceObj = watch("llm");
    const price = useMemo(() => {
        const initialPrice = getValues("llm");
        if (
            initialPrice?.modelName === botProfile.llm &&
            botProfile.price !== initialPrice?.price
        ) {
            return botProfile.price;
        }

        return priceObj?.price || 0 || botProfile.price;
    }, [botProfile.llm, botProfile.price, getValues, priceObj?.price]);
    const botName = watch("botName") || "";

    const [currentContentLength, setCurrentContentLength] = useState(0);
    const [avatarBob, setAvatarBob] = useState<string | null>(botProfile.avatar);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [isDirtyAutoComplete, setIsDirtyAutoComplete] = useState(false);

    const avatarBgColor = useMemo(
        () => botProfile.chatColor || randomColor(),
        [botProfile.chatColor]
    );

    const { mutateAsync: updateBot } = useUpdateBotProfile({});
    const { mutateAsync: updateBotAvatar } = useUploadAvatarBot({});

    const handleUpdateAvatar = useCallback(
        async (botToken: string) => {
            if (!avatarFile) return;

            try {
                await updateBotAvatar({
                    botToken,
                    avatar: avatarFile,
                });
            } catch (error) {
                handleError(error);
            }
        },
        [avatarFile, handleError, updateBotAvatar]
    );

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
        reset({}, { keepValues: false });
        setIsDirtyAutoComplete(false);
        setAvatarBob(botProfile.avatar);
        setAvatarFile(null);
    }, [botProfile.avatar, reset]);

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            try {
                const response: any = await updateBot({
                    botToken: botProfile.id,
                    botName: data.botName,
                    description: data.description,
                    voiceId: data.voiceId.id,
                    tags: data.tags,
                    language: data.language,
                    onlyContext: !data.onlyContext,
                    startMessage: data.startMessage,
                    chatColor: avatarBgColor,
                    ...(data.llm ? { llm: data.llm.modelName } : {}),
                    ...(botProfile.level === 1 ? { facts: [data.facts] } : {}),
                });
                if (isRequestSuccessful(response)) {
                    const botToken = response.data.data.botToken;
                    await handleUpdateAvatar(botToken);

                    snackbar({
                        message: t("success.updateBot"),
                        severity: "success",
                    });
                    onUpdateSuccess?.();
                    clearDirty();
                }
            } catch (error) {
                handleError(error);
            }
        },
        [
            avatarBgColor,
            botProfile.id,
            botProfile.level,
            clearDirty,
            handleError,
            handleUpdateAvatar,
            onUpdateSuccess,
            snackbar,
            t,
            updateBot,
        ]
    );

    const shouldBlockNavigation = useMemo(() => {
        return isDirty || isDirtyAutoComplete || avatarBob !== botProfile.avatar;
    }, [avatarBob, botProfile.avatar, isDirty, isDirtyAutoComplete]);

    useEffect(() => {
        if (shouldBlock !== shouldBlockNavigation) setShouldBlock(shouldBlockNavigation);
    }, [setShouldBlock, shouldBlock, shouldBlockNavigation]);

    return (
        <Box {...rest}>
            <LoadingIcon open={isSubmitting} />

            <Box
                gap={3}
                sx={{
                    display: "grid",
                }}
            >
                <FormProvider
                    methods={methods}
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "300px 1fr",
                        gap: "24px",
                    }}
                >
                    <Card
                        sx={{
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
                        >
                            <InputLabel htmlFor="update-avatar">
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
                                                "&:hover": !isClone
                                                    ? {
                                                          cursor: "pointer",
                                                          opacity: 1,
                                                      }
                                                    : {},
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
                            </InputLabel>
                            <Input
                                type="file"
                                id="update-avatar"
                                sx={{ display: "none" }}
                                onChange={handleLoadAvatar}
                                inputProps={{ accept: "image/*" }}
                                disabled={isClone}
                            />
                            <BotPriceV3 price={price} />
                            {botProfile.level === 1 ? (
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
                            ) : null}
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
                            <Grid item xs={6}>
                                <RHFTextField
                                    rules={{
                                        required: t("form.error.botNameRequired"),
                                        validate: (value) => {
                                            if (!value.trim()) {
                                                return t("form.error.botNameIsInvalid");
                                            }
                                        },
                                    }}
                                    size="small"
                                    required
                                    name="botName"
                                    disabled={isClone}
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
                            <Grid item xs={6}>
                                <RHFAutocompleteVoice
                                    disabled={isClone}
                                    onChange={() => setIsDirtyAutoComplete(true)}
                                />
                            </Grid>
                            <Grid item xs={6}>
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
                                    disabled={isClone}
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
                            <Grid item xs={6}>
                                <RHFAutocompleteTags
                                    disabled={isClone}
                                    onChange={() => setIsDirtyAutoComplete(true)}
                                />
                            </Grid>
                            {botProfile.level === 1 ? (
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
                            ) : null}
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
                                    disabled={isClone}
                                    InputLabelProps={{ shrink: true }}
                                    name="description"
                                    label={t("common.description")}
                                    placeholder={t("form.placeHolder.description")}
                                    helperText={t("form.helperText.description")}
                                    multiline
                                    minRows={3}
                                    maxRows={10}
                                />
                            </Grid>
                            {botProfile.level === 1 ? (
                                <>
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
                                        <RHFAutocompleteLLM
                                            botToken={botProfile.id}
                                            onChange={() => setIsDirtyAutoComplete(true)}
                                        />
                                    </Grid>
                                </>
                            ) : null}
                            {isClone ? (
                                <>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
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
                                            disabled={isClone}
                                            InputLabelProps={{ shrink: true }}
                                            label={t("common.manual")}
                                            value={botProfile.publishManual}
                                            multiline
                                            minRows={3}
                                            maxRows={10}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
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
                                            disabled={isClone}
                                            InputLabelProps={{ shrink: true }}
                                            label={t("common.note")}
                                            value={botProfile.publishNote}
                                            multiline
                                            minRows={3}
                                            maxRows={10}
                                        />
                                    </Grid>
                                </>
                            ) : null}
                        </Grid>
                        {!isClone ? (
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
                                    disabled={!shouldBlockNavigation}
                                >
                                    {t("common.update")}
                                </Button>
                            </Stack>
                        ) : null}
                    </Card>
                </FormProvider>
                {botProfile.level === 1 || botProfile.level === 3 ? (
                    <DangerZone botToken={botProfile.id} botName={botProfile.botName} />
                ) : null}
            </Box>
            <br />
        </Box>
    );
};

export default memo(FormUpdateBot);
