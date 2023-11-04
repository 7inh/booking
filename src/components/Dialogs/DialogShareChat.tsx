import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Skeleton,
    Typography,
} from "@mui/material";
import { IconLink } from "src/components/Icons/IconExternal";
import useTranslation from "src/hooks/utils/useTranslation";

export interface DialogShareChatProps {
    open: boolean;
    isLoading?: boolean;
    link?: string;
    onClose: () => void;
}

const DialogShareChat = (props: DialogShareChatProps) => {
    const { open, isLoading, link, onClose } = props;

    const t = useTranslation();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                style: { borderRadius: 16, minWidth: 400, maxWidth: 450 },
            }}
        >
            <DialogTitle
                sx={{
                    p: 2,
                    pb: 2,
                    position: "relative",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "14px",
                        fontWeight: 700,
                        textAlign: "left",
                    }}
                >
                    {t("dialog.shareChat.title")}
                </Typography>
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", top: 0, right: 0 }}
                    size="small"
                >
                    <CloseRoundedIcon
                        sx={{
                            width: "34px",
                            height: "34px",
                        }}
                        fontSize="small"
                    />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 2 }}>
                <Box
                    sx={{
                        bgcolor: "#F1F1F1",
                        borderRadius: "10px",
                        p: "10px 20px",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <IconLink
                        sx={{
                            color: "#95A3B1",
                            flexShrink: 0,
                        }}
                    />
                    <Typography
                        sx={{
                            textAlign: "center",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "20px",
                            ml: 2,
                            flexGrow: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            if (!link) return;
                            navigator.clipboard.writeText(link);
                        }}
                    >
                        {isLoading ? <Skeleton /> : link}
                    </Typography>

                    {!isLoading && link ? (
                        <IconButton
                            sx={{
                                p: 1,
                                color: "#95A3B1",
                                flexShrink: 0,
                            }}
                            onClick={() => {
                                if (!link) return;
                                navigator.clipboard.writeText(link);
                            }}
                        >
                            <ContentCopyRoundedIcon />
                        </IconButton>
                    ) : null}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default DialogShareChat;
