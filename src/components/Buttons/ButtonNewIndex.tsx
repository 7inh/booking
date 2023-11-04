import {
    Box,
    BoxProps,
    Button,
    Input,
    InputLabel,
    Menu,
    MenuItem,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { isRequestSuccessful } from "src/common/utils";
import CreateButton from "src/components/Buttons/CreateButton";
import DialogBase from "src/components/Dialogs/DialogBase";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import { useUnsavedChangesContext } from "src/contexts/UnsavedChangesContext";
import useCalculatePriceAfterChangeBotType from "src/hooks/useCalculatePriceAfterChangeBotType";
import useIndexRawTextV2 from "src/hooks/useIndexRawTextV2";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import CardBase from "src/pages/CreateBot/CardBase";
import RawCard from "src/pages/CreateBot/RawCard";
import SourceCard from "src/pages/CreateBot/SourceCard";
import { v4 as uuidv4 } from "uuid";

export interface ButtonNewIndexProps extends BoxProps {
    botToken?: string;
    botType?: string;
    shouldSubmit?: boolean;
    showSubmitButton?: boolean;
    onChangeSourceLength?: (length: number) => void;
    onIndexerSuccess?: () => void;
}

const ButtonNewIndex = (props: ButtonNewIndexProps) => {
    const {
        botToken = "",
        botType = "",
        onChangeSourceLength,
        shouldSubmit,
        showSubmitButton,
        onIndexerSuccess,
        ...rest
    } = props;

    const location = useLocation();
    const snackbar = useSnackBar();
    const t = useTranslation();
    const { handleError } = useHandleError();
    const { shouldBlock, setShouldBlock } = useUnsavedChangesContext();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [sources, setSources] = useState<
        {
            id: string;
            index: number;
            raw: string;
            type: "file" | "raw";
            status?: "pending" | "success" | "error";
        }[]
    >([]);
    const [files, setFiles] = useState<{
        [key: string]: {
            file: File;
            lastModified: string;
            name: string;
            size: number;
            type: string;
        };
    }>({});
    const [shouldStartIndexer, setShouldStartIndexer] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openRemindChangeBotPriceDialog, setOpenRemindChangeBotPriceDialog] = useState(false);

    const { mutateAsync: calcPrice } = useCalculatePriceAfterChangeBotType({});
    const { mutateAsync: indexRawText } = useIndexRawTextV2();
    const [botPriceChange, setBotPriceChange] = useState<{
        currentPrice: number;
        changePrice: number;
    } | null>(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAddSource = useCallback((type: "raw" | "file", key: string) => {
        handleClose();
        setSources((prev) => [
            ...prev,
            {
                id: key,
                index: prev.length,
                raw: "",
                type,
            },
        ]);
    }, []);

    const handleLoadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const newFiles = Array.from(e.target.files);

        const updatedFiles = newFiles.reduce(
            (prev, file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64Url = reader.result;
                    if (typeof base64Url === "string") {
                        const key = uuidv4();
                        prev[key] = {
                            file,
                            lastModified: file.lastModified.toString(),
                            name: file.name,
                            size: file.size,
                            type: file.type,
                        };
                        handleAddSource("file", key);
                        const form = document.querySelector(
                            "form#upload-file-form"
                        ) as HTMLFormElement;
                        form.reset();
                    }
                };

                reader.readAsDataURL(file);

                return prev;
            },
            { ...files }
        );

        setFiles(updatedFiles);
    };

    const handleIndexRaw = useCallback(
        async (title: string, raw: string, index: number, id: string) => {
            try {
                if (!raw) {
                    snackbar({
                        message: t("error.rawContentEmpty"),
                        severity: "warning",
                    });
                    return;
                }

                const response: any = await indexRawText({
                    documents: [
                        {
                            botToken,
                            title,
                            isRaw: true,
                            raw,
                        },
                    ],
                });
                if (isRequestSuccessful(response)) {
                    snackbar({
                        message: t("success.uploadKnowledgeBase"),
                        severity: "success",
                    });

                    setSources((prev) => prev.filter((source) => source.id !== id));
                } else {
                    snackbar({
                        message: t("error.uploadKnowledgeBase"),
                        severity: "warning",
                    });
                    setSources((prev) =>
                        prev.map((source) => {
                            if (source.index === index) {
                                return {
                                    ...source,
                                    status: "error",
                                };
                            }
                            return source;
                        })
                    );
                }
            } catch (error) {
                handleError(error);
                setSources((prev) =>
                    prev.map((source) => {
                        if (source.index === index) {
                            return {
                                ...source,
                                status: "error",
                            };
                        }
                        return source;
                    })
                );
            }
        },
        [botToken, handleError, indexRawText, snackbar, t]
    );

    const handleIndexFile = useCallback(
        async (index: number) => {
            try {
                const form = document.querySelector(
                    `form#source-card-${sources[index].id}`
                ) as HTMLFormElement;

                form?.requestSubmit();
            } catch (error) {
                handleError(error);
                setSources((prev) =>
                    prev.map((source) => {
                        if (source.index === index) {
                            return {
                                ...source,
                                status: "error",
                            };
                        }
                        return source;
                    })
                );
            }
        },
        [handleError, sources]
    );

    const handleIndexFileAndRaw = useCallback(async () => {
        setIsLoading(true);
        for (const indexer of sources) {
            if (indexer.type === "raw") {
                const title =
                    (
                        document
                            .getElementById(indexer.id)
                            ?.querySelector("textarea#title") as HTMLInputElement
                    )?.value || "";
                const raw =
                    (
                        document
                            .getElementById(indexer.id)
                            ?.querySelector("textarea#content") as HTMLTextAreaElement
                    )?.value || "";
                await handleIndexRaw(title, raw, indexer.index, indexer.id);
            } else {
                await handleIndexFile(indexer.index);
            }
        }
        setIsLoading(false);
    }, [handleIndexFile, handleIndexRaw, sources]);

    const handleRemindChangeBotPrice = useCallback(async () => {
        try {
            const response: any = await calcPrice({
                botType: "doc",
                botToken,
            });
            if (isRequestSuccessful(response)) {
                setBotPriceChange({
                    currentPrice: response?.data?.data.currentPrice,
                    changePrice: response?.data?.data.changePrice,
                });
                setOpenRemindChangeBotPriceDialog(true);
            } else {
                snackbar({
                    message: t("error.unKnownError"),
                    severity: "error",
                });
            }
        } catch (error) {
            handleError(error);
        }
    }, [botToken, calcPrice, handleError, snackbar, t]);

    const renderInputSourceList = useMemo(() => {
        return (
            <Stack width="100%" gap={1.5}>
                {sources.map((source) => {
                    if (source.type === "raw")
                        return (
                            <CardBase key={source.id} id={source.id} status={source.status}>
                                <RawCard
                                    onDelete={() => {
                                        setSources((prev) =>
                                            prev.filter((_source) => _source.id !== source.id)
                                        );
                                    }}
                                />
                            </CardBase>
                        );

                    const { file, name, lastModified, size, type } = files[source.id];

                    return (
                        <CardBase key={source.id} status={source.status}>
                            <SourceCard
                                formId={`source-card-${source.id}`}
                                botToken={botToken}
                                file={file}
                                fileName={name}
                                lastModified={lastModified}
                                size={size}
                                type={type}
                                onDelete={() => {
                                    setSources((prev) =>
                                        prev.filter((_source) => _source.id !== source.id)
                                    );
                                    setFiles((prev) => {
                                        const newFiles = { ...prev };
                                        delete newFiles[source.id];
                                        return newFiles;
                                    });
                                }}
                                onError={() => {
                                    setSources((prev) =>
                                        prev.map((_source) => {
                                            if (_source.id === source.id) {
                                                return {
                                                    ..._source,
                                                    status: "error",
                                                };
                                            }
                                            return _source;
                                        })
                                    );
                                }}
                            />
                        </CardBase>
                    );
                })}
            </Stack>
        );
    }, [botToken, files, sources]);

    const renderRemindChangeBotPriceDialog = useMemo(() => {
        if (!botPriceChange) return null;
        return (
            <DialogBase
                open={openRemindChangeBotPriceDialog}
                onClose={() => setOpenRemindChangeBotPriceDialog(false)}
                title={t("dialog.remindBotPriceChange.title")}
                content={t("dialog.remindBotPriceChange.content", {
                    currentPrice: botPriceChange.currentPrice,
                    changePrice: botPriceChange.changePrice,
                })}
                confirmText={t("dialog.remindBotPriceChange.confirmText")}
                onConfirm={() => {
                    setOpenRemindChangeBotPriceDialog(false);
                    setShouldStartIndexer(true);
                }}
            />
        );
    }, [botPriceChange, openRemindChangeBotPriceDialog, t]);

    useEffect(() => {
        if (!botToken) return;

        if (shouldStartIndexer || shouldSubmit) {
            handleIndexFileAndRaw();
            setShouldStartIndexer(false);
        }
    }, [botToken, handleIndexFileAndRaw, shouldStartIndexer, shouldSubmit]);

    useEffect(() => {
        onChangeSourceLength?.(sources.length);
        setShouldBlock(sources.length > 0);
    }, [onChangeSourceLength, setShouldBlock, sources]);

    useEffect(() => {
        if (botToken && sources.length === 0 && !shouldBlock) {
            onIndexerSuccess?.();
        }
    }, [botToken, shouldBlock, onIndexerSuccess, sources]);

    useEffect(() => {
        return () => {
            setSources([]);
        };
    }, [location.search]);

    return (
        <Box
            sx={{
                display: props.hidden ? "none" : "flex",
                flexDirection: "column",
                alignItems: "center",
                flexGrow: 1,
                mx: "8px",
            }}
            {...rest}
        >
            <LoadingIcon open={isLoading} />
            {renderRemindChangeBotPriceDialog}
            {renderInputSourceList}
            <Stack spacing={1} my={1}>
                <CreateButton
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                    label={t("common.addKnowledgeBase")}
                    sx={{
                        width: "213px",
                    }}
                />
                {showSubmitButton && sources.length > 0 ? (
                    <Button
                        sx={{
                            width: "213px",
                            borderRadius: "8px",
                        }}
                        disabled={isLoading}
                        variant="outlined"
                        onClick={() => {
                            if (botType !== "doc") {
                                handleRemindChangeBotPrice();
                            } else {
                                setShouldStartIndexer(true);
                            }
                        }}
                    >
                        {t("common.submit")}
                    </Button>
                ) : null}
            </Stack>
            <form id="upload-file-form">
                <Input
                    type="file"
                    id="upload-file"
                    componentsProps={{
                        input: {
                            multiple: true,
                            accept: ".pdf,.txt,.docx,.md,.pptx,.ppt,.csv",
                        },
                    }}
                    sx={{ display: "none" }}
                    onChange={handleLoadFiles}
                />
            </form>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    "& .MuiPaper-root": {
                        width: "213px",
                        marginTop: "4px",
                    },
                }}
            >
                <InputLabel htmlFor="upload-file">
                    <Tooltip
                        title={
                            <Typography
                                sx={{
                                    fontStyle: "italic",
                                    fontSize: "12px",
                                }}
                            >
                                (.pdf, .txt, .docx, .md, .pptx, .ppt, .csv)
                            </Typography>
                        }
                        placement="right"
                    >
                        <MenuItem>
                            <Typography
                                sx={{
                                    color: "black",
                                }}
                            >
                                {t("common.indexFile")}
                            </Typography>
                        </MenuItem>
                    </Tooltip>
                </InputLabel>
                <MenuItem onClick={() => handleAddSource("raw", uuidv4())}>
                    {t("common.indexRaw")}
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default memo(ButtonNewIndex);
