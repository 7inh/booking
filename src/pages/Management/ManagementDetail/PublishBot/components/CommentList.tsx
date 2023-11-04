import { Box, Stack, Typography } from "@mui/material";
import { PreviewComment } from "src/common/types";
import useTranslation from "src/hooks/utils/useTranslation";
import AddCommentForm from "src/pages/Management/ManagementDetail/PublishBot/components/AddCommentForm";
import CommentCard from "src/pages/Management/ManagementDetail/PublishBot/components/CommentCard";

export interface CommentListProps {
    botToken: string;
    publishVersion: string;
    comments: PreviewComment[];
    onAddCommentSuccess?: () => void;
}

const CommentList = (props: CommentListProps) => {
    const { botToken, publishVersion, comments, onAddCommentSuccess } = props;

    const t = useTranslation();

    return (
        <Box
            sx={{
                textAlign: "center",
                width: "100%",
                maxWidth: "850px",
            }}
        >
            <Typography
                sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                }}
            >
                {t("message.weViewedYourRequest")}
            </Typography>
            <Typography
                sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#6B6B6B",
                }}
            >
                {t("message.weViewedYourRequestContent")}
            </Typography>
            <Stack
                sx={{
                    width: "100%",
                    my: 2,
                    mt: 3,
                }}
                spacing={3}
            >
                {comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                ))}
            </Stack>
            <Box
                sx={{
                    boxShadow:
                        "0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)",
                    borderRadius: "16px",
                    width: "100%",
                }}
            >
                <AddCommentForm
                    botToken={botToken}
                    publishVersion={publishVersion}
                    onAddCommentSuccess={onAddCommentSuccess}
                />
            </Box>
        </Box>
    );
};

export default CommentList;
