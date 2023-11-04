import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { useMemo } from "react";
import useGetBotReview from "src/hooks/useGetBotReview";
import useTranslation from "src/hooks/utils/useTranslation";
import ReviewList from "src/pages/Market/MarketDetail/ReviewList";

export interface DialogShowAllReviewProps {
    botToken: string;
    open: boolean;
    onClose: () => void;
    onClickDelete: (review: any) => void;
    onClickUpdate: (review: any) => void;
}

const DialogShowAllReview = (props: DialogShowAllReviewProps) => {
    const { botToken, open, onClose, onClickDelete, onClickUpdate } = props;

    const t = useTranslation();

    const renderCloseButton = useMemo(() => {
        return (
            <IconButton
                onClick={onClose}
                sx={{
                    mx: 1.25,
                }}
            >
                <CloseRoundedIcon fontSize="large" />
            </IconButton>
        );
    }, [onClose]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                style: { borderRadius: 8 },
            }}
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        maxWidth: "1000px",
                        width: "100%",
                    },
                },
            }}
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 0,
                }}
            >
                <Typography
                    sx={{
                        color: "#1B1A57",
                        fontSize: "24px",
                        fontWeight: 700,
                        mx: 3,
                    }}
                >
                    {t("common.reviews")}
                </Typography>
                {renderCloseButton}
            </DialogTitle>
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    px: 0,
                }}
            >
                <ReviewList
                    getReviews={(page) =>
                        useGetBotReview({
                            botToken,
                            isGetAll: false,
                            numPage: page,
                            numRows: 5,
                        })
                    }
                    onClickDelete={onClickDelete}
                    onClickUpdate={onClickUpdate}
                />
            </DialogContent>
        </Dialog>
    );
};

export default DialogShowAllReview;
