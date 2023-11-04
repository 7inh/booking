import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, Input, InputLabel, Stack, Typography } from "@mui/material";
import { Fragment, useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Bot } from "src/common/types";
import { isRequestSuccessful } from "src/common/utils";
import RHFAutocompleteTags from "src/components/Autocompletes/RHFAutocompleteTags";
import BotAvatar from "src/components/Bot/BotAvatar";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import RHFAutocomplete from "src/components/RHFs/RHFAutocomplete";
import RHFTextField from "src/components/RHFs/RHFTextField";
import { useAccountContext } from "src/contexts/AccountContext";
import useGetBotMinMaxPrice from "src/hooks/useGetBotMinMaxPrice";
import usePublishBot from "src/hooks/usePublishBot";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";
import { BotPublishParams } from "src/services/types";
import { v4 as uuidv4 } from "uuid";

export interface PublishFormProps {
    botProfile: Bot;
    publishTo?: "kami-store" | "workspace";
    onPublishSuccess?: () => void;
}

interface FormValuesProps extends BotPublishParams {
    publishToAddress?: {
        groupId: string;
        name: string;
    } | null;
}

const PublishForm = ({
    botProfile,
    publishTo = "kami-store",
    onPublishSuccess,
}: PublishFormProps) => {
    const { id: botToken = "" } = useParams();

    const t = useTranslation();
    const snackBar = useSnackBar();
    const { handleError } = useHandleError();

    const { user } = useAccountContext();

    const methods = useForm<FormValuesProps>({
        defaultValues: {
            botToken,
            tags: botProfile.tags,
            description: botProfile.description,
            manual: "",
            note: "",
            publishToAddress: null,
            price: 0,
        },
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [previewImagesFiles, setPreviewImagesFiles] = useState<File[]>([]);

    const { data } = useGetBotMinMaxPrice({
        botToken,
    });

    const { mutateAsync: publishBot } = usePublishBot();

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            try {
                const { publishToAddress, ...rest } = data;
                const isPublishOrg = publishTo === "workspace";
                const response: any = await publishBot({
                    ...rest,
                    isPublishOrg,
                    ...(isPublishOrg
                        ? {
                              extends: {
                                  organizeId: botProfile?.organizeId || "",
                                  ...(publishToAddress?.groupId !== botProfile?.organizeId
                                      ? { groupId: publishToAddress?.groupId }
                                      : {}),
                              },
                          }
                        : {
                              images: previewImagesFiles,
                          }),
                });
                if (isRequestSuccessful(response)) {
                    snackBar({
                        severity: "success",
                        message: t("success.publishBot"),
                    });
                    onPublishSuccess?.();
                } else {
                    snackBar({
                        severity: "error",
                        message: t("error.publishBot"),
                    });
                }
            } catch (error) {
                handleError(error);
            }
        },
        [
            botProfile?.organizeId,
            handleError,
            onPublishSuccess,
            previewImagesFiles,
            publishBot,
            publishTo,
            snackBar,
            t,
        ]
    );

    const handleUploadPreviewImages = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files) {
                const images = Array.from(files).map((file) => URL.createObjectURL(file));
                const imagesFiles = Array.from(files);
                if (previewImages.length + images.length > 4) {
                    snackBar({
                        severity: "warning",
                        message: t("error.maxPreviewImages", {
                            maxImages: 4,
                        }),
                    });
                }
                setPreviewImages((prevImages) => [...prevImages, ...images].splice(0, 4));
                setPreviewImagesFiles((prevImages) => [...prevImages, ...imagesFiles].splice(0, 4));
            }
        },
        [previewImages.length, snackBar, t]
    );

    const allowPublishGroups = useMemo(() => {
        const orgRole = user.orgRoles?.find(
            (item) => item.organizationId === botProfile.organizeId
        );
        const allowPublishGroups = orgRole?.groupInfo || [];

        if (orgRole?.roles.includes("ADMIN")) return allowPublishGroups;

        return allowPublishGroups.filter((group) => group.roles.includes("CREATOR"));
    }, [botProfile.organizeId, user.orgRoles]);

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <LoadingIcon open={isSubmitting} />
            <Grid container spacing={2} gridAutoRows="1fr">
                <Grid item xs={12} md={3.5}>
                    <Box
                        sx={{
                            borderRadius: "16px",
                            boxShadow:
                                "0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <Box mx="auto">
                            <BotAvatar
                                botName={botProfile.botName}
                                chatColor={botProfile.chatColor}
                                src={botProfile.avatar || ""}
                                size="170px"
                            />
                        </Box>
                        <Box mx="auto" mt={2} textAlign="center">
                            <Typography
                                sx={{
                                    fontSize: "20px",
                                    color: "#212B36",
                                    fontWeight: 600,
                                }}
                            >
                                {botProfile.botName}
                            </Typography>
                            <Typography
                                sx={{
                                    color: "#A1A1A1",
                                    fontSize: "14px",
                                }}
                            >
                                {botProfile.version}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={8.5}>
                    <Stack
                        sx={{
                            borderRadius: "16px",
                            boxShadow:
                                "0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)",
                            height: "100%",
                            px: 3,
                            py: 3,
                            boxSizing: "border-box",
                        }}
                        spacing={2}
                    >
                        {publishTo === "workspace" ? (
                            <RHFAutocomplete
                                required
                                size="small"
                                name="publishToAddress"
                                label={t("common.group")}
                                options={[
                                    {
                                        groupId: botProfile.organizeId,
                                        name: t("common.general"),
                                    },
                                    ...allowPublishGroups,
                                ]}
                                getOptionLabel={(option: any) => option.name}
                                isOptionEqualToValue={(option, value) =>
                                    option.groupId === value.groupId
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
                                                {option.name}
                                            </Typography>
                                        </Box>
                                    </Fragment>
                                )}
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
                        ) : null}
                        <RHFAutocompleteTags />
                        <RHFTextField
                            required
                            rules={{
                                required: t("form.publishBot.descriptionRequired"),
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
                            label={t("form.publishBot.description")}
                            multiline
                            minRows={3}
                            maxRows={10}
                        />
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
                            name="manual"
                            label={t("form.publishBot.manual")}
                            multiline
                            minRows={3}
                            maxRows={10}
                        />
                        <RHFTextField
                            multiline
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
                            name="note"
                            minRows={3}
                            maxRows={10}
                            label={t("form.publishBot.note")}
                        />
                        <Box>
                            <Typography
                                sx={{
                                    mb: 1,
                                }}
                            >
                                {t("form.publishBot.previewImg")}
                            </Typography>
                            <Stack direction="row" flexWrap="wrap" rowGap={1} columnGap={1}>
                                {previewImages.map((image) => (
                                    <Box
                                        key={image}
                                        sx={{
                                            width: "150px",
                                            aspectRatio: "9/16",
                                            border: "1px solid rgba(145, 158, 171, 0.20)",
                                            borderRadius: "8px",
                                            display: "flex",
                                            position: "relative",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: "0",
                                                right: "0",
                                                zIndex: 1,
                                                cursor: "pointer",
                                                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                                                color: "#fff",
                                                borderRadius: "50%",
                                                bgcolor: "rgba(0, 0, 0, 0.5)",
                                                width: "24px",
                                                height: "24px",
                                            }}
                                            onClick={() => {
                                                setPreviewImages((prevImages) =>
                                                    prevImages.filter((img) => img !== image)
                                                );
                                            }}
                                        >
                                            <CloseRoundedIcon />
                                        </Box>
                                        <img
                                            src={image}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                borderRadius: "8px",
                                            }}
                                        />
                                    </Box>
                                ))}
                                {previewImages.length < 4 ? (
                                    <InputLabel htmlFor="upload-preview-images">
                                        <Box
                                            sx={{
                                                width: "150px",
                                                aspectRatio: "9/16",
                                                border: "1px solid rgba(145, 158, 171, 0.20)",
                                                borderRadius: "8px",
                                                display: "flex",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <AddCircleOutlineRoundedIcon
                                                sx={{
                                                    margin: "auto",
                                                }}
                                                fontSize="large"
                                            />
                                        </Box>
                                    </InputLabel>
                                ) : null}
                            </Stack>
                            <Input
                                type="file"
                                id="upload-preview-images"
                                sx={{ display: "none" }}
                                onChange={handleUploadPreviewImages}
                                componentsProps={{
                                    input: {
                                        multiple: true,
                                        accept: "image/*",
                                    },
                                }}
                            />
                        </Box>
                        <RHFTextField
                            required
                            size="small"
                            type="number"
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
                            InputProps={{
                                inputProps: {
                                    min: data?.min || 0,
                                    max: data?.max,
                                    step: 0.1,
                                },
                            }}
                            name="price"
                            label={t("form.publishBot.price")}
                            helperText={t("form.publishBot.priceHelper", {
                                minPrice: data?.min || "-",
                                maxPrice: data?.max || "+",
                            })}
                        />
                        <Box width="100%" display="flex">
                            <LoadingButton
                                variant="contained"
                                fullWidth
                                type="submit"
                                sx={{
                                    borderRadius: "8px",
                                    width: "fit-content",
                                    boxShadow: "none",
                                    textTransform: "none",
                                    "&:hover": {
                                        boxShadow: "none",
                                    },
                                    ml: "auto",
                                }}
                            >
                                {t("form.publishBot.submit")}
                            </LoadingButton>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
            <br />
        </FormProvider>
    );
};

export default PublishForm;
