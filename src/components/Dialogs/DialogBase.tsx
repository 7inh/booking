import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    DialogActions,
    Button,
} from "@mui/material";
import useTranslation from "src/hooks/utils/useTranslation";

export interface DialogBaseProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    onCancel?: () => void;
    title: string;
    content: string;
    cancelText?: string;
    confirmText?: string;
    showCancel?: boolean;
}

const DialogBase = (props: DialogBaseProps) => {
    const {
        open,
        onClose,
        onCancel,
        onConfirm,
        title,
        content,
        cancelText,
        confirmText,
        showCancel = true,
    } = props;

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
                    pb: 1,
                }}
            >
                <Typography
                    sx={{
                        fontSize: "14px",
                        fontWeight: 700,
                        textAlign: "center",
                    }}
                >
                    {title}
                </Typography>
            </DialogTitle>
            <DialogContent sx={{ p: 2, pb: 2 }}>
                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "20px",
                    }}
                >
                    {content}
                </Typography>
            </DialogContent>
            <DialogActions
                sx={{
                    width: "100%",
                    p: 2,
                    pt: 0,
                    boxSizing: "border-box",
                    display: "grid",
                    gridTemplateColumns: `${showCancel ? "1fr" : ""} 1fr`,
                }}
            >
                {showCancel ? (
                    <Button
                        onClick={() => {
                            onCancel?.();
                            onClose();
                        }}
                        sx={{
                            bgcolor: "#D9D9D9",
                            textTransform: "none",
                            p: 1.2,
                            borderRadius: "10px",
                            "&:hover": {
                                bgcolor: "#D9D9D9",
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#000000",
                                fontSize: "14px",
                                fontWeight: 500,
                            }}
                        >
                            {cancelText || t("common.cancel")}
                        </Typography>
                    </Button>
                ) : null}
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    sx={{
                        boxShadow: "none",
                        textTransform: "none",
                        borderRadius: "10px",
                        "&:hover": {
                            boxShadow: "none",
                        },
                        p: 1.2,
                    }}
                >
                    <Typography
                        sx={{
                            color: "#FFFFFF",
                            fontSize: "14px",
                            fontWeight: 500,
                        }}
                    >
                        {confirmText || t("common.confirm")}
                    </Typography>
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogBase;
