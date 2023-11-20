import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import BoxBase from "src/components/Boxs/BoxBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";

export interface DialogBaseProps {
    open: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title: string;
    content: string;
    showCancel: boolean;
    cancelText?: string;
    confirmText?: string;
}

const DialogBase = ({
    open,
    onClose,
    onConfirm,
    title,
    content,
    showCancel,
    cancelText,
    confirmText,
}: DialogBaseProps) => {
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
                <TypographyBase
                    sx={{
                        fontSize: "14px",
                        fontWeight: 700,
                        textAlign: "center",
                    }}
                >
                    {title}
                </TypographyBase>
            </DialogTitle>
            <DialogContent sx={{ p: 2, pb: 2 }}>
                <TypographyBase
                    sx={{
                        textAlign: "center",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "20px",
                        whiteSpace: "pre-line",
                    }}
                >
                    {content}
                </TypographyBase>
            </DialogContent>
            <DialogActions
                sx={{
                    width: "100%",
                    p: 2,
                    pt: 0,
                    boxSizing: "border-box",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                }}
            >
                {showCancel ? (
                    <Button
                        onClick={() => {
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
                        <TypographyBase
                            sx={{
                                color: "#000000",
                                fontSize: "14px",
                                fontWeight: 500,
                            }}
                        >
                            {cancelText || t("common.cancel")}
                        </TypographyBase>
                    </Button>
                ) : (
                    <BoxBase />
                )}
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
                    <TypographyBase
                        sx={{
                            color: "#FFFFFF",
                            fontSize: "14px",
                            fontWeight: 500,
                        }}
                    >
                        {confirmText || t("common.confirm")}
                    </TypographyBase>
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogBase;
