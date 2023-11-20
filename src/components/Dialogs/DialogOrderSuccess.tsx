import DialogBase from "src/components/Dialogs/DialogBase";
import useTranslation from "src/hooks/utils/useTranslation";

export interface DialogOrderSuccessProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DialogOrderSuccess = ({ open, onClose, onConfirm }: DialogOrderSuccessProps) => {
    const t = useTranslation();

    return (
        <DialogBase
            open={open}
            onClose={onClose}
            onConfirm={onConfirm}
            title={t("dialog.orderSuccess.title")}
            content={t("dialog.orderSuccess.content")}
            confirmText={t("dialog.orderSuccess.confirmText")}
            showCancel={false}
        />
    );
};

export default DialogOrderSuccess;
