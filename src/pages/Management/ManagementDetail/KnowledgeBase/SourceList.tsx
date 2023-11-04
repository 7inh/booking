import { Box, Stack } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import EditSourceDialogV2 from "src/components/Dialogs/EditSourceDialogV2";
import { useBotManagementContext } from "src/contexts/BotManagementContext";
import useGetBotSourceV2 from "src/hooks/useGetBotSourceV2";
import SourceListPerPage from "src/pages/Management/ManagementDetail/KnowledgeBase/SourceListPerPage";
import { v4 as uuidv4 } from "uuid";

export interface SourceListProps {
    refetchProfile?: () => void;
}

const SourceList = ({ refetchProfile }: SourceListProps) => {
    const { id: botToken = "" } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const { setCurrentSelectedSourceId, searchText, setManagementState } =
        useBotManagementContext();

    const [openEditSourceDialog, setOpenEditSourceDialog] = useState(false);
    const [onActionSourceId, setOnActionSourceId] = useState(-1);
    const [pageWithKey, setPageWithKey] = useState<
        {
            page: number;
            key: string;
            state: "fetching" | "fetched";
            isLastPage?: boolean;
        }[]
    >([{ page: 1, key: uuidv4(), state: "fetching" }]);
    const [isStateFromProcessing, setIsStateFromProcessing] = useState(false);

    const handleChangeSelectedSource = useCallback(
        (newSource: any) => {
            setCurrentSelectedSourceId(newSource.id);
            searchParams.set("source", newSource.source);
            setSearchParams(searchParams);
        },
        [searchParams, setCurrentSelectedSourceId, setSearchParams]
    );

    const renderEditSourceDialog = useMemo(() => {
        return (
            <EditSourceDialogV2
                key={`edit-source-dialog-${onActionSourceId}`}
                open={openEditSourceDialog}
                botToken={botToken}
                sourceId={onActionSourceId}
                onClose={() => setOpenEditSourceDialog(false)}
            />
        );
    }, [botToken, onActionSourceId, openEditSourceDialog]);

    const renderSourceList = useMemo(() => {
        return (
            <Stack spacing={1}>
                {pageWithKey.map(({ page, key, state }) => {
                    return (
                        <SourceListPerPage
                            key={key}
                            page={page}
                            state={state}
                            getSource={(page) =>
                                useGetBotSourceV2({
                                    botToken,
                                    page,
                                    filterValues: searchText,
                                    onSuccess: (data) => {
                                        const someSourceStateIsProcessing = data.some(
                                            (source: any) => source.state === "PROCESSING"
                                        );
                                        if (someSourceStateIsProcessing) {
                                            setIsStateFromProcessing(true);
                                        } else if (isStateFromProcessing) {
                                            refetchProfile?.();
                                        }
                                        if (page !== 1) return;
                                        if (page === 1 && !data.length) setManagementState("empty");
                                        else {
                                            setManagementState("loaded");
                                        }
                                    },
                                })
                            }
                            onFetched={(isLastPage) => {
                                setPageWithKey((prev) => {
                                    return prev.map((pageWithKey) => {
                                        if (pageWithKey.key === key) {
                                            return {
                                                ...pageWithKey,
                                                state: "fetched",
                                                isLastPage,
                                            };
                                        }
                                        return pageWithKey;
                                    });
                                });
                            }}
                            onSelectedSource={handleChangeSelectedSource}
                            onOpenEditSourceDialog={(source) => {
                                setOnActionSourceId(source.id);
                                setOpenEditSourceDialog(true);
                            }}
                            onDeleteLastSource={() => {
                                if (pageWithKey.length === 1) refetchProfile?.();
                            }}
                        />
                    );
                })}
            </Stack>
        );
    }, [
        botToken,
        handleChangeSelectedSource,
        isStateFromProcessing,
        pageWithKey,
        refetchProfile,
        searchText,
        setManagementState,
    ]);

    const handleScrollToBottom = useCallback(() => {
        const lastPageWithKey = pageWithKey[pageWithKey.length - 1];
        if (lastPageWithKey.state === "fetching" || lastPageWithKey.isLastPage) return;

        setPageWithKey((prev) => {
            const lastPage = prev[prev.length - 1].page;
            return [
                ...prev,
                {
                    page: lastPage + 1,
                    key: uuidv4(),
                    state: "fetching",
                },
            ];
        });
    }, [pageWithKey]);

    useEffect(() => {
        const main = document.body.querySelector("#source-list");
        if (!main) return;

        const handleScroll = () => {
            if (main.scrollTop + main.clientHeight >= main.scrollHeight - 1) {
                handleScrollToBottom();
            }
        };

        main?.addEventListener("scroll", handleScroll);

        return () => {
            main.removeEventListener("scroll", handleScroll);
        };
    }, [handleScrollToBottom]);

    return (
        <Box maxHeight="1000px" minHeight="600px" width="320px" overflow="auto" id="source-list">
            {renderEditSourceDialog}
            {renderSourceList}
        </Box>
    );
};

export default SourceList;
