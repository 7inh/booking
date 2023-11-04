import { Box, Button } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { Bot, PreviewComment } from "src/common/types";
import { isRequestSuccessful } from "src/common/utils";
import DialogDeleteV2 from "src/components/Dialogs/DialogDeleteV2";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import useDeletePublishRequest from "src/hooks/useDeletePublishRequest";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import CardMessage from "src/pages/Management/ManagementDetail/PublishBot/components/CardMessage";
import CommentList from "src/pages/Management/ManagementDetail/PublishBot/components/CommentList";
import TimeDot from "src/pages/Management/ManagementDetail/PublishBot/components/TimeDot";
import TimeLine from "src/pages/Management/ManagementDetail/PublishBot/components/TimeLine";

export interface PublishStatusProps {
    botProfile: Bot;
    botToken: string;
    botName: string;
    comments: PreviewComment[];
    createBy: string;
    createTime: string;
    description: string;
    manual: string;
    note: string;
    previewImg: string[];
    publishState: string;
    publishVersion: string;
    tags: string[];
    type: number;
    onPublishAgain: () => void;
    onAddCommentSuccess?: () => void;
}

const PublishStatus = (props: PublishStatusProps) => {
    const {
        botToken,
        publishVersion,
        botProfile,
        comments = [],
        createTime,
        publishState,
        onPublishAgain,
        onAddCommentSuccess,
    } = props;

    const t = useTranslation();
    const snackbar = useSnackBar();
    const { handleError } = useHandleError();

    const [isLoading, setIsLoading] = useState(false);
    const [openDeletePublishDialog, setOpenDeletePublishDialog] = useState(false);

    const { mutateAsync: cancelPublish } = useDeletePublishRequest();

    const handleCancelPublish = useCallback(async () => {
        setIsLoading(true);
        try {
            const response: any = await cancelPublish({
                botToken,
                publishVersion,
            });

            if (isRequestSuccessful(response)) {
                snackbar({
                    message: t("success.cancelPublish"),
                    severity: "success",
                });
                setOpenDeletePublishDialog(false);
                onPublishAgain();
            } else {
                snackbar({
                    message: t("error.canNotCancelPublish"),
                    severity: "error",
                });
            }
        } catch (error) {
            handleError(error);
        }
        setIsLoading(false);
    }, [botToken, cancelPublish, handleError, onPublishAgain, publishVersion, snackbar, t]);

    const renderDeletePublishDialog = useMemo(() => {
        return (
            <DialogDeleteV2
                open={openDeletePublishDialog}
                onClose={() => {
                    setOpenDeletePublishDialog(false);
                }}
                onDelete={handleCancelPublish}
                title={t("dialog.cancelPublish.title")}
                content={t("dialog.cancelPublish.content")}
                deleteText={t("common.cancelPublish")}
            />
        );
    }, [handleCancelPublish, openDeletePublishDialog, t]);

    const renderCardMessage = useMemo(() => {
        if (comments.length > 0 && publishState === "IN_PROCESS") return null;

        return (
            <CardMessage
                createTime={createTime}
                publishState={publishState}
                botProfile={botProfile}
                onPublishAgain={onPublishAgain}
            />
        );
    }, [botProfile, comments.length, createTime, onPublishAgain, publishState]);

    const renderCommentList = useMemo(() => {
        if (comments.length === 0 || publishState !== "IN_PROCESS") return null;

        return (
            <CommentList
                botToken={botToken}
                publishVersion={publishVersion}
                comments={comments}
                onAddCommentSuccess={onAddCommentSuccess}
            />
        );
    }, [botToken, comments, onAddCommentSuccess, publishState, publishVersion]);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <LoadingIcon open={isLoading} zIndex={10000} />
            {renderDeletePublishDialog}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "self-start",
                    width: "100%",
                    maxWidth: "800px",
                    boxSizing: "border-box",
                    height: "100px",
                    mb: "20px",
                }}
            >
                <TimeDot
                    state={publishState === "WAITING" ? "processing" : "received"}
                    label={t("common.publishStatus.received")}
                />
                <TimeLine state={publishState === "WAITING" ? "waiting" : "passed"} />
                <TimeDot
                    state={
                        publishState === "WAITING"
                            ? "new"
                            : publishState === "IN_PROCESS"
                            ? "processing"
                            : publishState === "ACCEPT" || publishState === "DENY"
                            ? "passed"
                            : "new"
                    }
                    label={t("common.publishStatus.inReview")}
                />
                <TimeLine
                    state={
                        publishState === "ACCEPT" || publishState === "DENY" ? "passed" : "waiting"
                    }
                />
                <TimeDot
                    state={
                        publishState === "WAITING" || publishState === "IN_PROCESS"
                            ? "new"
                            : publishState === "ACCEPT"
                            ? "accept"
                            : publishState === "DENY"
                            ? "deny"
                            : "waiting"
                    }
                    label={t("common.publishStatus.result")}
                />
            </Box>
            {renderCardMessage}
            {renderCommentList}

            {publishState !== "DENY" && publishState !== "ACCEPT" ? (
                <>
                    <br />
                    <br />
                    <Button
                        variant="contained"
                        sx={{
                            boxShadow: "none",
                            borderRadius: "20px",
                            textTransform: "none",
                            bgcolor: "red",
                            "&:hover": {
                                boxShadow: "none",
                                bgcolor: "darkred",
                            },
                        }}
                        onClick={() => setOpenDeletePublishDialog(true)}
                    >
                        {t("common.cancelPublish")}
                    </Button>
                </>
            ) : null}
        </Box>
    );
};

export default PublishStatus;
