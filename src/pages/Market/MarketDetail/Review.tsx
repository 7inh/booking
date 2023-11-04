import { Box, BoxProps, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { isRequestSuccessful } from "src/common/utils";
import DialogDeleteV2 from "src/components/Dialogs/DialogDeleteV2";
import DialogUpdateReview from "src/components/Dialogs/DialogUpdateReview";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import { useAccountContext } from "src/contexts/AccountContext";
import useDeleteReview from "src/hooks/useDeleteReview";
import useGetBotReview from "src/hooks/useGetBotReview";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import DialogShowAllReview from "src/pages/Market/MarketDetail/DialogShowAllReview";
import ReviewCard from "src/pages/Market/MarketDetail/ReviewCard";

export interface ReviewProps extends BoxProps {
    botToken: string;
    numReview: number;
    onChange: () => void;
}

const Review = ({ botToken, numReview, onChange, ...props }: ReviewProps) => {
    const {
        user: { userToken },
    } = useAccountContext();

    const t = useTranslation();
    const snackbar = useSnackBar();
    const { handleError } = useHandleError();

    const [openDeleteReviewDialog, setOpenDeleteReviewDialog] = useState(false);
    const [openUpdateReviewDialog, setOpenUpdateReviewDialog] = useState(false);
    const [currentSelectedReview, setCurrentSelectedReview] = useState<any | null>(null);
    const [openShowAllReviewDialog, setOpenShowAllReviewDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { data: reviews = [] } = useGetBotReview({
        botToken,
        isGetAll: false,
        numPage: 1,
        numRows: 4,
    });

    const { mutateAsync: deleteReview } = useDeleteReview({});

    const handleDeleteReview = useCallback(async () => {
        if (!currentSelectedReview) return;
        setIsLoading(true);
        try {
            const response: any = await deleteReview({
                idReview: currentSelectedReview?.idReview,
            });

            if (isRequestSuccessful(response)) {
                snackbar({
                    message: t("success.deleteReview"),
                    severity: response?.data?.success ? "success" : "warning",
                });
                setCurrentSelectedReview(null);
                setOpenDeleteReviewDialog(false);
                onChange();
            } else {
                snackbar({
                    message: t("error.canNotDeleteReview"),
                    severity: "error",
                });
            }
        } catch (error) {
            handleError(error);
        }
        setIsLoading(false);
    }, [currentSelectedReview, deleteReview, handleError, onChange, snackbar, t]);

    const renderDeleteDialog = useMemo(() => {
        return (
            <DialogDeleteV2
                open={openDeleteReviewDialog}
                onClose={() => {
                    setOpenDeleteReviewDialog(false);
                }}
                onDelete={handleDeleteReview}
                title={t("dialog.deleteReview.title")}
                content={t("dialog.deleteReview.content")}
            />
        );
    }, [handleDeleteReview, openDeleteReviewDialog, t]);

    const renderUpdateDialog = useMemo(() => {
        if (!currentSelectedReview) return;

        return (
            <DialogUpdateReview
                open={openUpdateReviewDialog}
                idReview={currentSelectedReview.idReview}
                comment={currentSelectedReview.comment}
                star={currentSelectedReview.star}
                onClose={() => {
                    setOpenUpdateReviewDialog(false);
                }}
                onSuccess={() => {
                    setOpenUpdateReviewDialog(false);
                    onChange();
                }}
            />
        );
    }, [currentSelectedReview, onChange, openUpdateReviewDialog]);

    const renderDialogShowAllReview = useMemo(() => {
        return (
            <DialogShowAllReview
                botToken={botToken}
                open={openShowAllReviewDialog}
                onClose={() => {
                    setOpenShowAllReviewDialog(false);
                }}
                onClickDelete={(review: any) => {
                    setCurrentSelectedReview(review);
                    setOpenDeleteReviewDialog(true);
                }}
                onClickUpdate={(review: any) => {
                    setCurrentSelectedReview(review);
                    setOpenUpdateReviewDialog(true);
                }}
            />
        );
    }, [botToken, openShowAllReviewDialog]);

    return (
        <>
            {renderDeleteDialog}
            {renderUpdateDialog}
            {renderDialogShowAllReview}
            {reviews.length ? (
                <Box {...props}>
                    <LoadingIcon open={isLoading} zIndex={20000} />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 1.5,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "8px",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "22px",
                                    fontWeight: 600,
                                    color: "#1B1A57",
                                    lineHeight: 1,
                                }}
                            >
                                {t("common.reviews")}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    color: "#919EAB",
                                }}
                            >
                                ({numReview})
                            </Typography>
                        </Box>
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontWeight: 700,
                                color: "#3E8C6C",
                                lineHeight: "20px",
                                textDecoration: "underline",
                                cursor: "pointer",
                            }}
                            onClick={() => setOpenShowAllReviewDialog(true)}
                        >
                            {t("common.viewMore")}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "grid",
                            gap: "8px",
                            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                            gridAutoRows: "1fr",
                            gridTemplateRows: "repeat(auto-fill, minmax(150px, 1fr))",
                        }}
                    >
                        {reviews.map((review: any) => (
                            <ReviewCard
                                key={review.idReview}
                                avatar={review.avatar}
                                displayName={review.displayName}
                                createTime={review.createTime}
                                star={review.star}
                                comment={review.comment}
                                isOwner={review.ownerToken === userToken}
                                onClickDelete={() => {
                                    setCurrentSelectedReview(review);
                                    setOpenDeleteReviewDialog(true);
                                }}
                                onClickUpdate={() => {
                                    setCurrentSelectedReview(review);
                                    setOpenUpdateReviewDialog(true);
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            ) : null}
        </>
    );
};

export default Review;
