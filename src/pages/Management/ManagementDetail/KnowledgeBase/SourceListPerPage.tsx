import { Box, Skeleton, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { isRequestSuccessful } from "src/common/utils";
import DialogDeleteV2 from "src/components/Dialogs/DialogDeleteV2";
import { useBotManagementContext } from "src/contexts/BotManagementContext";
import useDeleteBotSource from "src/hooks/useDeleteBotSource";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import SourceCard from "src/pages/Management/ManagementDetail/KnowledgeBase/SourceCard";

export interface SourceListPerPageProps {
    page: number;
    state: "fetching" | "fetched";
    getSource: (page: number) => {
        data: any[];
        isFetched: boolean;
        isFetching: boolean;
        refetch: () => void;
    };
    onFetched: (isLastPage: boolean) => void;
    onSelectedSource: (source: any) => void;
    onOpenEditSourceDialog: (source: any) => void;
    onDeleteLastSource?: () => void;
}

const SourceListPerPage = (props: SourceListPerPageProps) => {
    const {
        page,
        state,
        getSource,
        onFetched,
        onSelectedSource,
        onOpenEditSourceDialog,
        onDeleteLastSource,
    } = props;

    const {
        currentSelectedSourceId,
        currentSelectedSourceState,
        setIsProcessing,
        setDocumentProcessValue,
        setCurrentSelectedSourceState,
        setCurrentSelectedSourceId,
    } = useBotManagementContext();

    const t = useTranslation();
    const snackbar = useSnackBar();
    const { handleError } = useHandleError();

    const [searchParams, setSearchParams] = useSearchParams();

    const [deletedSourceIds, setDeletedSourceIds] = useState<number[]>([]);
    const [openDeleteSourceDialog, setOpenDeleteSourceDialog] = useState(false);
    const [onActionSourceId, setOnActionSourceId] = useState(-1);

    const { data: sources = [], isFetched, refetch, isFetching } = getSource(page);

    const { mutateAsync: deleteSource } = useDeleteBotSource({});

    const handleDeleteSource = useCallback(
        async (idSource = currentSelectedSourceId) => {
            setIsProcessing(true);
            try {
                const response: any = await deleteSource({ id: idSource });
                if (isRequestSuccessful(response)) {
                    snackbar({
                        message: t("success.deleteSource"),
                        severity: "success",
                    });
                    setDeletedSourceIds((prev) => [...prev, idSource]);
                    setCurrentSelectedSourceId(-1);
                    searchParams.delete("source");
                    setSearchParams(searchParams);
                    if (sources.length === 1) {
                        onDeleteLastSource?.();
                    }
                } else {
                    snackbar({
                        message: t("error.deleteSource"),
                        severity: "error",
                    });
                    setIsProcessing(false);
                }
            } catch (error) {
                handleError(error);
            }
            setIsProcessing(false);
        },
        [
            currentSelectedSourceId,
            deleteSource,
            handleError,
            onDeleteLastSource,
            searchParams,
            setCurrentSelectedSourceId,
            setIsProcessing,
            setSearchParams,
            snackbar,
            sources.length,
            t,
        ]
    );

    const handleUpdateSourceStateContext = useCallback(
        (state: string) => {
            if (state !== currentSelectedSourceState) {
                setCurrentSelectedSourceState(state);
                if (state === "INDEXED") {
                    setDocumentProcessValue(100);
                }
            }
        },
        [currentSelectedSourceState, setCurrentSelectedSourceState, setDocumentProcessValue]
    );

    useEffect(() => {
        if (!isFetched) return;

        const currentSelectedSource = sources.find(
            (source) => source.id === currentSelectedSourceId
        );

        if (currentSelectedSource) {
            handleUpdateSourceStateContext(currentSelectedSource.state);

            const remainDocumentsNotIndexedInSource = currentSelectedSource.documentInfo.detail
                .filter((document: any) => document.key !== "INDEXED")
                .reduce((total: number, obj: any) => obj.value + total, 0);

            const documentProcessValue = Math.round(
                ((currentSelectedSource.documentInfo.total - remainDocumentsNotIndexedInSource) /
                    currentSelectedSource.documentInfo.total) *
                    100
            );

            setDocumentProcessValue(documentProcessValue);
        }

        const remainDocumentProcessingInSource = sources.filter((source) =>
            source.documentInfo.detail.find((document: any) => document.key === "PROCESSING")
        );

        let timeOut: NodeJS.Timer;
        if (
            remainDocumentProcessingInSource.length ||
            currentSelectedSource?.state === "PROCESSING"
        ) {
            timeOut = setInterval(() => {
                refetch();
            }, 2000);
        }

        return () => {
            clearInterval(timeOut);
        };
    }, [
        currentSelectedSourceId,
        currentSelectedSourceState,
        handleUpdateSourceStateContext,
        isFetched,
        refetch,
        setCurrentSelectedSourceState,
        setDocumentProcessValue,
        sources,
    ]);

    useEffect(() => {
        if (state === "fetching" && isFetched && !isFetching) {
            onFetched(!sources.length);
            if (currentSelectedSourceId === -1 && sources.length) {
                onSelectedSource(sources[0]);
            }
        }
    }, [
        currentSelectedSourceId,
        isFetched,
        isFetching,
        onFetched,
        onSelectedSource,
        sources,
        sources.length,
        state,
    ]);

    useEffect(() => {
        const handler = () => {
            handleDeleteSource();
        };

        window.addEventListener("deleteLastDocument", handler);

        return () => {
            window.removeEventListener("deleteLastDocument", handler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSelectedSourceId]);

    const renderDeleteSourceDialog = useMemo(() => {
        return (
            <DialogDeleteV2
                key={`delete-source-dialog-${onActionSourceId}`}
                open={openDeleteSourceDialog}
                onClose={() => setOpenDeleteSourceDialog(false)}
                onDelete={() => {
                    handleDeleteSource(onActionSourceId);
                    setOpenDeleteSourceDialog(false);
                }}
                title={t("dialog.deleteSource.title")}
                content={t("dialog.deleteSource.content")}
                deleteText={t("dialog.deleteSource.confirmText")}
            />
        );
    }, [handleDeleteSource, onActionSourceId, openDeleteSourceDialog, t]);

    return (
        <>
            {renderDeleteSourceDialog}
            {isFetched && !sources.length && page === 1 ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <Typography variant="h6">{t("error.sourceNotFound")}</Typography>
                </Box>
            ) : null}
            {state === "fetching"
                ? Array.from({ length: sources.length || 10 }).map((_, index) => (
                      <Skeleton
                          key={index}
                          variant="rectangular"
                          width="100%"
                          height="96px"
                          sx={{ borderRadius: 2 }}
                      />
                  ))
                : sources.map((source: any) => {
                      if (deletedSourceIds.includes(source.id)) return null;
                      const isSelected = source.id === currentSelectedSourceId;
                      return (
                          <SourceCard
                              key={`source-tab-${source.id}`}
                              fileName={source.source}
                              createTime={source.createTime}
                              state={source.state}
                              stateDesc={source.stateDesc}
                              numDocs={source.documentInfo?.total || 0}
                              numToken={source.numToken}
                              documentInfo={
                                  source.documentInfo?.detail
                                      ? Object.values(source.documentInfo?.detail)
                                      : []
                              }
                              isSelected={isSelected}
                              onClick={() => {
                                  if (!isSelected) {
                                      onSelectedSource(source);
                                      setDocumentProcessValue(100);
                                  }
                              }}
                              onOpenEditDialog={() => {
                                  onOpenEditSourceDialog(source);
                              }}
                              onOpenDeleteDialog={() => {
                                  setOnActionSourceId(source.id);
                                  setOpenDeleteSourceDialog(true);
                              }}
                          />
                      );
                  })}
        </>
    );
};

export default SourceListPerPage;
