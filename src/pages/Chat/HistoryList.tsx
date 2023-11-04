import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import { isRequestSuccessful } from "src/common/utils";
import DialogDeleteV2 from "src/components/Dialogs/DialogDeleteV2";
import { IconDelete, IconEdit } from "src/components/Icons/IconExternal";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import { useChatContext } from "src/contexts/ChatContext";
import useDeleteStory from "src/hooks/useDeleteStory";
import useGetBotStory from "src/hooks/useGetBotStory";
import useInsertStory from "src/hooks/useInsertStory";
import useUpdateStory from "src/hooks/useUpdateStory";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import AddNewStory from "src/pages/Chat/AddNewStoryForm";
import { v4 as uuidv4 } from "uuid";

export interface HistoryListProps {
    botToken: string;
}

let tempEditTextValue = "";
const HistoryList = (props: HistoryListProps) => {
    const { botToken } = props;

    const t = useTranslation();
    const snackbar = useSnackBar();
    const { handleError } = useHandleError();

    const { currentSelectedStoryId, setCurrentSelectedStoryId } = useChatContext();

    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [defaultStoryName, setDefaultStoryName] = useState(t("common.newChat"));

    const { data: storyList, refetch } = useGetBotStory({
        botToken,
        onSuccess: () => {
            setIsEditing(false);
        },
    });

    const { mutateAsync: insertNewStory } = useInsertStory();
    const { mutateAsync: deleteStory } = useDeleteStory();
    const { mutateAsync: renameStory } = useUpdateStory();

    const inputNewStoryNameRef = useRef<any>(null);

    const handleInsertNewStory = useCallback(
        async (storyName = defaultStoryName) => {
            if (storyName !== defaultStoryName) {
                setDefaultStoryName(storyName);
            }
            setIsLoading(true);
            try {
                const response: any = await insertNewStory({
                    botToken,
                    storyName,
                });

                if (isRequestSuccessful(response)) {
                    snackbar({
                        message: t("success.insertNewStory"),
                        severity: "success",
                    });
                    refetch();
                    setCurrentSelectedStoryId(response.data.data.storyId);
                } else {
                    snackbar({
                        message: t("error.insertNewStory"),
                        severity: "error",
                    });
                }
            } catch (error) {
                handleError(error);
            }
            setIsLoading(false);
        },
        [
            botToken,
            defaultStoryName,
            handleError,
            insertNewStory,
            refetch,
            setCurrentSelectedStoryId,
            snackbar,
            t,
        ]
    );

    const handleDeleteStory = useCallback(async () => {
        setIsLoading(true);
        try {
            const response: any = await deleteStory({
                storyId: currentSelectedStoryId,
            });

            if (isRequestSuccessful(response)) {
                snackbar({
                    message: t("success.deleteStory"),
                    severity: "success",
                });
                refetch();
                setIsDeleteDialogOpen(false);
                if (storyList?.length > 1) {
                    setCurrentSelectedStoryId(
                        storyList.filter((item: any) => item.storyId !== currentSelectedStoryId)[0]
                            ?.storyId
                    );
                } else {
                    handleInsertNewStory();
                }
            } else {
                snackbar({
                    message: t("error.deleteStory"),
                    severity: "error",
                });
            }
        } catch (error) {
            handleError(error);
        }
        setIsLoading(false);
    }, [
        currentSelectedStoryId,
        deleteStory,
        handleError,
        handleInsertNewStory,
        refetch,
        setCurrentSelectedStoryId,
        snackbar,
        storyList,
        t,
    ]);

    const handleRenameStory = useCallback(async () => {
        const newStoryName = inputNewStoryNameRef.current.value;
        tempEditTextValue = newStoryName;
        setIsLoading(true);
        try {
            const response: any = await renameStory({
                storyId: currentSelectedStoryId,
                storyName: newStoryName,
            });

            if (isRequestSuccessful(response)) {
                refetch();
            } else {
                snackbar({
                    message: t("error.unKnownError"),
                    severity: "error",
                });
                setIsEditing(false);
            }
        } catch (error) {
            handleError(error);
            setIsEditing(false);
        }
        setIsLoading(false);
    }, [currentSelectedStoryId, handleError, refetch, renameStory, snackbar, t]);

    const renderDeleteStoryDialog = useMemo(() => {
        return (
            <DialogDeleteV2
                open={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onDelete={handleDeleteStory}
                title={t("dialog.deleteStory.title")}
                content={t("dialog.deleteStory.content")}
            />
        );
    }, [handleDeleteStory, isDeleteDialogOpen, t]);

    return (
        <Box
            my={0.5}
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                overflowY: "auto",
                width: "100%",
            }}
        >
            <LoadingIcon open={isLoading} />
            {renderDeleteStoryDialog}
            <AddNewStory
                botToken={botToken}
                defaultStoryName={defaultStoryName}
                onAddNewStory={handleInsertNewStory}
            />
            {storyList?.map((item: any) => {
                const isSelected = item.storyId === currentSelectedStoryId;
                return (
                    <Box
                        key={uuidv4()}
                        sx={{
                            cursor: "pointer",
                            backgroundColor: isSelected ? "#D9D9D9" : "",
                            borderRadius: "10px",
                            mx: "5px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            p: "12px 10px",
                            position: "relative",
                        }}
                        onClick={() => {
                            if (isSelected) {
                                return;
                            }
                            setCurrentSelectedStoryId(item.storyId);
                            setIsEditing(false);
                        }}
                    >
                        {isSelected && isEditing ? (
                            <Box
                                sx={{
                                    borderRadius: "10px",
                                    px: "10px",
                                    boxSizing: "border-box",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    zIndex: 1,
                                    bgcolor: "#D9D9D9",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "5px",
                                }}
                            >
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    defaultValue={tempEditTextValue || item.storyName}
                                    inputProps={{
                                        ref: inputNewStoryNameRef,
                                        style: {
                                            fontSize: "12px",
                                            fontWeight: 400,
                                            height: 0,
                                            paddingLeft: 0,
                                            paddingRight: 0,
                                            backgroundColor: "white",
                                        },
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleRenameStory();
                                        }
                                    }}
                                    sx={{
                                        fieldset: {
                                            border: "none",
                                        },
                                    }}
                                />

                                <Stack direction="row">
                                    <CheckRoundedIcon
                                        fontSize="small"
                                        sx={{
                                            color: "#95A3B1",
                                        }}
                                        onClick={handleRenameStory}
                                    />
                                    <CloseRoundedIcon
                                        fontSize="small"
                                        sx={{
                                            color: "#95A3B1",
                                        }}
                                        onClick={() => setIsEditing(false)}
                                    />
                                </Stack>
                            </Box>
                        ) : null}

                        <Typography
                            sx={{
                                fontSize: "12px",
                                fontWeight: 400,
                            }}
                        >
                            {item.storyName}
                        </Typography>
                        {isSelected ? (
                            <Stack direction="row" gap={1}>
                                <IconEdit
                                    onClick={() => setIsEditing((prev) => !prev)}
                                    sx={{
                                        width: "12px",
                                        height: "12px",
                                        color: "#95A3B1",
                                        "&:hover": {
                                            color: "#000000",
                                        },
                                    }}
                                />
                                <IconDelete
                                    onClick={() => {
                                        tempEditTextValue = "";
                                        setIsDeleteDialogOpen(true);
                                    }}
                                    sx={{
                                        width: "12px",
                                        height: "12px",
                                        color: "#95A3B1",
                                        "&:hover": {
                                            color: "red",
                                        },
                                    }}
                                />
                            </Stack>
                        ) : null}
                    </Box>
                );
            })}
        </Box>
    );
};

export default memo(HistoryList);
