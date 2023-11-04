import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, BoxProps, Grid, IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import {
    formatDateTime,
    getFileExtension,
    getShortFileType,
    isRequestSuccessful,
} from "src/common/utils";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import RHFTextField from "src/components/RHFs/RHFTextField";
import useGetCountTokens from "src/hooks/useGetCoutTokens";
import useIndexFileV2 from "src/hooks/useIndexFileV2";
import useHandleError, { getErrorCode } from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import FormProvider from "src/providers/FormProvider";

type FormValuesProps = {
    title: string;
    description?: string;
    note?: string;
};

const defaultValues: FormValuesProps = {
    title: "",
    description: "",
    note: "",
};

export interface SourceCardProps extends BoxProps {
    formId?: string;
    botToken: string;
    file: File;
    fileName?: string;
    lastModified?: string;
    size?: number;
    type?: string;
    isSelected?: boolean;
    onDelete?: () => void;
    onError?: () => void;
}

const SourceCard = (props: SourceCardProps) => {
    const {
        formId,
        botToken,
        file,
        fileName = "",
        lastModified,
        size,
        type,
        isSelected = false,
        onDelete,
        onError,
        ...rest
    } = props;

    const t = useTranslation();
    const snackbar = useSnackBar();
    const { handleError } = useHandleError();

    const methods = useForm<FormValuesProps>({
        defaultValues,
    });
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [error, setError] = useState<any | null>(null);
    const [countError, setCountError] = useState<string | null>(null);
    const open = Boolean(anchorEl);

    const { data: countTokensNumber } = useGetCountTokens({
        file,
        fileName,
        onError: (error) => {
            const errorMessage = error?.response?.data?.message;
            const errorCode = getErrorCode(error) || "CHUNK_DATA_FAILED";
            if (errorMessage.includes("File type") && errorMessage.includes("is not supported")) {
                snackbar({
                    message: t("error.fileTypeNotSupport"),
                    severity: "error",
                });
            } else if (errorMessage.includes("utf-8") && errorMessage.includes("can't decode")) {
                snackbar({
                    message: t("error.fileEncodingNotSupport"),
                    severity: "error",
                });
            } else {
                snackbar({
                    message: t(`errorHandler.${errorCode}`),
                    severity: "error",
                });
            }

            onError?.();
            setError(errorCode);
            setCountError(t("error.cannotCountToken"));
        },
    });

    const { indexFile } = useIndexFileV2();

    const renderRowData = useCallback((label: string, value: string) => {
        return (
            <Grid container spacing={0.5}>
                <Grid item xs={5}>
                    <Typography
                        sx={{
                            fontSize: 14,
                            fontWeight: 700,
                            lineHeight: "22px",
                        }}
                    >
                        {label}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography
                        sx={{
                            color: "#878787",
                            fontSize: 14,
                            fontWeight: 400,
                            lineHeight: "22px",
                            wordBreak: "break-word",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "3",
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {value}
                    </Typography>
                </Grid>
            </Grid>
        );
    }, []);

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            if (!file || !botToken) return;

            try {
                const response: any = await indexFile({
                    botToken,
                    source: file.name,
                    title: data.title,
                    description: data.description,
                    note: data.note,
                    file,
                });

                if (isRequestSuccessful(response)) {
                    snackbar({
                        message: t("success.uploadKnowledgeBase"),
                        severity: "success",
                    });
                    onDelete?.();
                } else {
                    snackbar({
                        message: t("error.uploadKnowledgeBase"),
                        severity: "warning",
                    });
                    onError?.();
                }
            } catch (error) {
                handleError(error);
                onError?.();
                setError(getErrorCode(error));
            }
        },
        [botToken, file, handleError, indexFile, onDelete, onError, snackbar, t]
    );

    return (
        <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                width: "100%",
            }}
            id={formId}
        >
            <LoadingIcon open={isSubmitting} />
            <Box
                sx={{
                    display: "grid",
                    gridAutoFlow: "column",
                    alignItems: "start",
                    gridTemplateColumns: "280px 1fr",
                    gridTemplateRows: "1fr",
                    gap: 1,
                }}
                {...rest}
            >
                <Box height="100%">
                    <Box
                        sx={{
                            border: "1px solid",
                            borderColor: isSelected ? "#00B8D9" : "rgba(145, 158, 171, 0.20)",
                            borderRadius: "8px",
                            position: "relative",
                            // height: "100%",
                        }}
                    >
                        <Stack
                            sx={{
                                padding: "16px 14px",
                            }}
                        >
                            {renderRowData(t("common.fileName"), fileName || "...")}
                            {renderRowData(
                                t("common.lastModified"),
                                lastModified
                                    ? formatDateTime(new Date(parseInt(lastModified)))
                                    : "..."
                            )}
                            {renderRowData(t("common.size"), size ? size + " KB" : "...")}
                            {renderRowData(
                                t("common.type"),
                                type ? getFileExtension(fileName) || getShortFileType(type) : "..."
                            )}
                            {renderRowData(
                                t("common.numberToken"),
                                countTokensNumber > 0
                                    ? countTokensNumber.toString()
                                    : countError || t("common.countTokensNumber")
                            )}
                        </Stack>

                        <IconButton
                            onClick={(event) => setAnchorEl(event.currentTarget)}
                            sx={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                                zIndex: 1,
                            }}
                        >
                            <MoreVertIcon />
                        </IconButton>

                        <Box
                            m={1}
                            mt={0}
                            color="primary.main"
                            sx={{
                                display: error ? "flex" : "none",
                                alignItems: "center",
                                gap: "2px",
                            }}
                        >
                            <InfoRoundedIcon />
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    fontWeight: 400,
                                    lineHeight: "18px",
                                    color: "#FF7748",
                                }}
                            >
                                {t(`errorHandler.${error}`)}
                            </Typography>
                        </Box>
                    </Box>
                    <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                        <MenuItem
                            onClick={() => {
                                setAnchorEl(null);
                                handleSubmit(onSubmit)();
                            }}
                        >
                            {t("common.upload")}
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setAnchorEl(null);
                                onDelete?.();
                            }}
                        >
                            <Typography color="error">{t("common.deleteSource")}</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
                <Box>
                    <Stack spacing={1}>
                        <RHFTextField
                            rules={{
                                required: t("common.required"),
                            }}
                            sx={{
                                m: 0,
                                "& fieldset": {
                                    borderColor: "rgba(145, 158, 171, 0.20)",
                                },
                                "& label": {
                                    color: "#919EAB",
                                },
                            }}
                            required
                            margin="normal"
                            fullWidth
                            id="title"
                            label={t("common.title")}
                            name="title"
                            autoFocus
                            size="small"
                        />
                        <RHFTextField
                            sx={{
                                m: 0,
                                "& fieldset": {
                                    borderColor: "rgba(145, 158, 171, 0.20)",
                                },
                                "& label": {
                                    color: "#919EAB",
                                },
                            }}
                            margin="normal"
                            fullWidth
                            id="description"
                            label={t("common.description")}
                            name="description"
                            autoComplete="description"
                            autoFocus
                            size="small"
                            multiline
                            rows={4}
                        />
                        <RHFTextField
                            sx={{
                                m: 0,
                                "& fieldset": {
                                    borderColor: "rgba(145, 158, 171, 0.20)",
                                },
                                "& label": {
                                    color: "#919EAB",
                                },
                            }}
                            margin="normal"
                            fullWidth
                            id="note"
                            label={t("common.note")}
                            name="note"
                            autoFocus
                            size="small"
                            multiline
                            rows={2}
                        />
                    </Stack>
                </Box>
            </Box>
        </FormProvider>
    );
};

export default SourceCard;
