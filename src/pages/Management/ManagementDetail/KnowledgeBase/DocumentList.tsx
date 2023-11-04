import { Box, BoxProps, Button, LinearProgress, Pagination, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BotDocument } from "src/common/types";
import { isRequestSuccessful } from "src/common/utils";
import CircularProgress from "src/components/CircularProgress/CircularProgress";
import ConfirmDialogV2 from "src/components/Dialogs/ConfirmDialogV2";
import IconCommon from "src/components/Icons/IconCommon";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import { useBotManagementContext } from "src/contexts/BotManagementContext";
import useDeleteBotDocument from "src/hooks/useDeleteBotDocument";
import useGetBotDocumentV2 from "src/hooks/useGetBotDocumentV2";
import useInsertDocumentV2 from "src/hooks/useInsertDocumentV2";
import useUpdateDocument from "src/hooks/useUpdateDocument";
import useHandleError from "src/hooks/utils/useHandleError";
import usePrevious from "src/hooks/utils/usePrevious";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import DocumentCard from "src/pages/Management/ManagementDetail/KnowledgeBase/DocumentCard";
import { v4 as uuidv4 } from "uuid";

export interface DocumentListProps extends BoxProps {
    onDeleteLastDocument?: () => void;
}

const DocumentList = ({ onDeleteLastDocument, ...props }: DocumentListProps) => {
    const { id: botToken = "" } = useParams();

    const snackbar = useSnackBar();
    const t = useTranslation();
    const { handleError } = useHandleError();

    const {
        currentSelectedSourceId,
        isProcessing,
        setIsProcessing,
        searchText,
        currentSelectedSourceState,
        isFilterErrorDocument,
        documentProcessValue,
    } = useBotManagementContext();

    const [firstAccess, setFirstAccess] = useState(true);
    const [page, setPage] = useState(1);
    const [localDocuments, setLocalDocuments] = useState<BotDocument[]>([]);
    const [dirtyDocumentIds, setDirtyDocumentIds] = useState<string[]>([]);
    const [insertingDocument, setInsertingDocument] = useState<BotDocument | null>(null);
    const [documentsToBeInserted, setDocumentsToBeInserted] = useState<BotDocument[]>([]);
    const [isDeleteDocumentDialogOpen, setIsDeleteDocumentDialogOpen] = useState(false);
    const [documentIdToBeDelete, setDocumentIdToBeDelete] = useState<string>("");
    const previousSelectedSourceState = usePrevious(currentSelectedSourceState);
    const [{ filterKeys, filterValues }, setFilter] = useState<{
        filterKeys: string[];
        filterValues: string[];
    }>({
        filterKeys: [],
        filterValues: [],
    });

    const inputRef = useRef<{ [key: string]: HTMLDivElement }>({});

    const {
        refetch: refetchDocument,
        data: documents,
        total: documentNumber,
        isFetched: isFetchedDocument,
        isFetching: isFetchingDocument,
    } = useGetBotDocumentV2({
        botToken,
        sourceId: currentSelectedSourceId,
        filterKeys,
        filterValues,
        page,
        onSuccess: () => {
            if (insertingDocument) {
                const toBeRemoveLocalDocumentIdx = localDocuments.findIndex(
                    (localDocument) => insertingDocument.idDocument === localDocument.idDocument
                );
                if (toBeRemoveLocalDocumentIdx !== -1) {
                    const newLocalDocuments = [...localDocuments];
                    newLocalDocuments?.forEach((localDocument, index) => {
                        if (
                            index > toBeRemoveLocalDocumentIdx &&
                            localDocument.priority >= insertingDocument.priority
                        ) {
                            localDocument.priority += 1;
                        }
                    });
                    newLocalDocuments.splice(toBeRemoveLocalDocumentIdx, 1);
                    setLocalDocuments(newLocalDocuments);
                }
            }
            setIsProcessing(false);
            setFirstAccess(false);
        },
    });

    const { mutateAsync: insert } = useInsertDocumentV2();
    const { mutateAsync: update } = useUpdateDocument({});
    const { mutateAsync: deleteDocument } = useDeleteBotDocument({});

    const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleInsertDocument = useCallback(
        async (documentId: string, priority: number, content: string) => {
            setIsProcessing(true);
            try {
                const response: any = await insert({
                    documents: [
                        {
                            botToken,
                            sourceId: currentSelectedSourceId,
                            raw: content,
                            isRaw: false,
                            priority: priority + 1,
                        },
                    ],
                });
                if (isRequestSuccessful(response)) {
                    snackbar({
                        message: t("success.insertDocument"),
                        severity: "success",
                    });

                    refetchDocument();
                    setInsertingDocument(
                        localDocuments.find((document) => document.idDocument === documentId) ||
                            null
                    );
                } else {
                    setIsProcessing(false);
                    snackbar({
                        message: t("error.insertDocument"),
                        severity: "error",
                    });
                }
            } catch (error: any) {
                setIsProcessing(false);
                handleError(error);
            }
        },
        [
            botToken,
            currentSelectedSourceId,
            handleError,
            insert,
            localDocuments,
            refetchDocument,
            setIsProcessing,
            snackbar,
            t,
        ]
    );

    const handleUpdateDocument = useCallback(
        async (documentToBeUpdate: BotDocument, content: string) => {
            setIsProcessing(true);
            try {
                const response: any = await update({
                    documents: [{ botToken, ...documentToBeUpdate, raw: content }],
                });
                if (isRequestSuccessful(response)) {
                    snackbar({
                        message: t("success.updateDocument"),
                        severity: "success",
                    });
                    setDirtyDocumentIds((dirtyDocumentIds) => {
                        const newDirtyDocumentIds = [...dirtyDocumentIds];
                        const index = newDirtyDocumentIds.findIndex(
                            (id) => id === documentToBeUpdate.idDocument
                        );
                        if (index !== -1) {
                            newDirtyDocumentIds.splice(index, 1);
                        }
                        return newDirtyDocumentIds;
                    });

                    refetchDocument();
                } else {
                    snackbar({
                        message: t("error.updateDocument"),
                        severity: "error",
                    });
                }
            } catch (error) {
                handleError(error);
            }
        },
        [botToken, handleError, refetchDocument, setIsProcessing, snackbar, t, update]
    );

    const handleDeleteDocument = useCallback(
        async (documentId: string) => {
            setIsProcessing(true);
            try {
                const response: any = await deleteDocument({
                    botToken,
                    idDocument: documentId,
                });

                if (isRequestSuccessful(response)) {
                    snackbar({
                        message: t("success.deleteDocument"),
                        severity: "success",
                    });
                    if (localDocuments.length + documents.length === 1 && page > 1) {
                        setPage(page - 1);
                    }
                    refetchDocument();
                    if (documents.length + localDocuments.length === 1) {
                        onDeleteLastDocument?.();
                    }

                    return;
                } else {
                    snackbar({
                        message: t("error.deleteDocument"),
                        severity: "error",
                    });
                }
            } catch (error) {
                handleError(error);
            }
            setIsProcessing(false);
        },
        [
            botToken,
            deleteDocument,
            documents.length,
            handleError,
            localDocuments.length,
            onDeleteLastDocument,
            page,
            refetchDocument,
            setIsProcessing,
            snackbar,
            t,
        ]
    );

    const handleDeleteLocalDocument = useCallback(
        (documentId: string) => {
            const newLocalDocuments = localDocuments.filter(
                (localDocument) => localDocument.idDocument !== documentId
            );
            setLocalDocuments(newLocalDocuments);
            if (documents.length + localDocuments.length === 1) {
                onDeleteLastDocument?.();
            }
        },
        [documents.length, localDocuments, onDeleteLastDocument]
    );

    const handleAddDocument = useCallback(
        (priority: number) => {
            const newDocs: BotDocument = {
                idDocument: uuidv4(),
                raw: "",
                summary: "",
                sourceId: currentSelectedSourceId,
                priority: priority,
                local: true,
                state: "LOCAL",
            };

            localDocuments.push(newDocs);
            setLocalDocuments([...localDocuments]);
        },
        [currentSelectedSourceId, localDocuments]
    );

    const handleUpdateAllDocument = useCallback(async () => {
        try {
            const documentsToBeUpdate: any[] = [
                ...documents.filter((document) => dirtyDocumentIds.includes(document.idDocument)),
            ];

            if (documentsToBeUpdate.length === 0) return true;

            documentsToBeUpdate?.forEach((document) => {
                document.raw =
                    inputRef.current[document.idDocument].querySelector("textarea")?.value || "";
                document.botToken = botToken;
            });

            const response: any = await update({
                documents: documentsToBeUpdate,
            });
            if (isRequestSuccessful(response)) {
                snackbar({
                    message: t("success.updateDocument"),
                    severity: "success",
                });
                setDirtyDocumentIds((dirtyDocumentIds) => {
                    const newDirtyDocumentIds = [...dirtyDocumentIds];
                    const documentIdsToBeClean = documentsToBeUpdate.map(
                        (document) => document.idDocument
                    );
                    return newDirtyDocumentIds.filter((id) => !documentIdsToBeClean.includes(id));
                });

                return true;
            } else {
                snackbar({
                    message: t("error.updateDocument"),
                    severity: "error",
                });
            }
        } catch (error) {
            handleError(error);
        }
        return false;
    }, [botToken, dirtyDocumentIds, documents, handleError, snackbar, t, update]);

    const handleInsertAllDocument = useCallback(async () => {
        try {
            const documentsToBeInsert = [
                ...localDocuments.filter((document) =>
                    dirtyDocumentIds.includes(document.idDocument)
                ),
            ];

            if (documentsToBeInsert.length === 0) return true;
            setDocumentsToBeInserted(documentsToBeInsert);
        } catch (error) {
            handleError(error);
        }
        return false;
    }, [dirtyDocumentIds, handleError, localDocuments]);

    const renderDeleteDocumentDialog = useMemo(() => {
        return (
            <ConfirmDialogV2
                open={isDeleteDocumentDialogOpen}
                onClose={() => setIsDeleteDocumentDialogOpen(false)}
                onConfirm={() => {
                    handleDeleteDocument(documentIdToBeDelete);
                    setIsDeleteDocumentDialogOpen(false);
                }}
                title={t("dialog.deleteDocument.title")}
                content={t("dialog.deleteDocument.content")}
            />
        );
    }, [documentIdToBeDelete, handleDeleteDocument, isDeleteDocumentDialogOpen, t]);

    const renderDocumentList = useMemo(() => {
        const documentList = [...documents, ...localDocuments].sort(
            (a, b) => a.priority - b.priority
        );

        if (documentList.length === 0) {
            return (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <Typography variant="h6">
                        {isFetchedDocument || currentSelectedSourceId === -1
                            ? currentSelectedSourceState === "PROCESSING"
                                ? t("message.training")
                                : t("error.documentNotFound")
                            : "Loading..."}
                    </Typography>
                </Box>
            );
        }

        return documentList.map((document) => (
            <DocumentCard
                key={document.idDocument}
                contentRef={(el) => {
                    if (el) {
                        inputRef.current[document.idDocument] = el;
                    }
                }}
                raw={document.raw}
                editable={document.state === "INDEXED" || document.state === "LOCAL"}
                state={document.state}
                stateDesc={document.stateDesc}
                disabledUpdate={isProcessing || !dirtyDocumentIds.includes(document.idDocument)}
                disabledDelete={isProcessing}
                onAddDocument={() => handleAddDocument(document.priority)}
                onDeleteDocument={() => {
                    if (document.local) {
                        handleDeleteLocalDocument(document.idDocument);
                    } else {
                        setDocumentIdToBeDelete(document.idDocument);
                        setIsDeleteDocumentDialogOpen(true);
                    }
                }}
                onUpdateDocument={async () => {
                    const content =
                        inputRef.current[document.idDocument].querySelector("textarea")?.value ||
                        "";
                    if (content) {
                        if (document.local) {
                            await handleInsertDocument(
                                document.idDocument,
                                document.priority,
                                content
                            );
                        } else {
                            await handleUpdateDocument(document, content);
                        }
                    }
                }}
                onContentChange={() => {
                    if (!dirtyDocumentIds.includes(document.idDocument)) {
                        setDirtyDocumentIds([...dirtyDocumentIds, document.idDocument]);
                    }
                }}
                onReUp={() => {
                    handleUpdateDocument(document, document.raw);
                }}
            />
        ));
    }, [
        currentSelectedSourceId,
        currentSelectedSourceState,
        dirtyDocumentIds,
        documents,
        handleAddDocument,
        handleDeleteLocalDocument,
        handleInsertDocument,
        handleUpdateDocument,
        isFetchedDocument,
        isProcessing,
        localDocuments,
        t,
    ]);

    useEffect(() => {
        if (documentsToBeInserted.length && !isProcessing) {
            const documentToBeInsert = documentsToBeInserted.shift();
            if (documentToBeInsert)
                handleInsertDocument(
                    documentToBeInsert.idDocument,
                    documentToBeInsert.priority,
                    inputRef.current[documentToBeInsert.idDocument].querySelector("textarea")
                        ?.value || ""
                );
        }
    }, [documentsToBeInserted, handleInsertDocument, isProcessing]);

    useEffect(() => {
        if (currentSelectedSourceId > -1) {
            setLocalDocuments([]);
            setDirtyDocumentIds([]);
            setPage(1);
            inputRef.current = {};
        }
    }, [currentSelectedSourceId]);

    useEffect(() => {
        if (!isFetchedDocument) return;

        const remainDocumentsUpdating = documents.filter(
            (document) => document.state === "PROCESSING"
        );

        const isSourceProcessingToIndexed =
            previousSelectedSourceState === "PROCESSING" &&
            currentSelectedSourceState === "INDEXED";

        let timeOut: NodeJS.Timer;
        if (
            remainDocumentsUpdating.length ||
            isSourceProcessingToIndexed ||
            currentSelectedSourceState === "PROCESSING"
        ) {
            timeOut = setInterval(() => {
                refetchDocument();
            }, 2000);
        }

        return () => {
            clearInterval(timeOut);
        };
    }, [
        currentSelectedSourceState,
        documents,
        isFetchedDocument,
        previousSelectedSourceState,
        refetchDocument,
    ]);

    useEffect(() => {
        const newFilterKeys: string[] = [];
        const newFilterValues: string[] = [];
        if (searchText) {
            newFilterKeys.push("raw");
            newFilterValues.push(searchText);
        }
        if (isFilterErrorDocument) {
            newFilterKeys.push("state");
            newFilterValues.push("ERROR");
        }
        if (
            newFilterKeys.length !== filterKeys.length ||
            newFilterValues.length !== filterValues.length ||
            newFilterKeys.some((key) => !filterKeys.includes(key)) ||
            newFilterValues.some((value) => !filterValues.includes(value))
        ) {
            setFilter({
                filterKeys: newFilterKeys,
                filterValues: newFilterValues,
            });
            setPage(1);
        }
    }, [filterKeys, filterValues, isFilterErrorDocument, searchText]);

    const isDocumentWaitingForIndexing = useMemo(() => {
        return documents.length === 0 && isFetchingDocument;
    }, [documents.length, isFetchingDocument]);

    return (
        <Box {...props}>
            <LoadingIcon open={isFetchingDocument && firstAccess} />
            {isDocumentWaitingForIndexing ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {renderDeleteDocumentDialog}
                    {documentProcessValue < 100 ? (
                        <LinearProgress variant="determinate" value={documentProcessValue} />
                    ) : null}

                    <Button
                        color="info"
                        variant="text"
                        sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            textTransform: "none",
                            mx: 0,
                            px: 0,
                        }}
                        disabled={isProcessing || !dirtyDocumentIds.length}
                        onClick={async () => {
                            setIsProcessing(true);
                            await handleUpdateAllDocument();
                            await handleInsertAllDocument();
                            refetchDocument();
                        }}
                    >
                        {IconCommon.save(isProcessing || !dirtyDocumentIds.length)}
                        {t("common.updateAll")}
                    </Button>

                    {renderDocumentList}

                    <Box display="flex" justifyContent="center" my={3}>
                        {documentNumber ? (
                            <Pagination
                                count={documentNumber}
                                onChange={handleChangePage}
                                page={page}
                                color="primary"
                                shape="rounded"
                                sx={{
                                    "& .MuiPaginationItem-text.Mui-selected": {
                                        color: "white !important",
                                    },
                                }}
                            />
                        ) : null}
                    </Box>
                </>
            )}
        </Box>
    );
};

export default DocumentList;
