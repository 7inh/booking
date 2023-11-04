import DialogBase from "src/components/Dialogs/DialogBase";
import useTranslation from "src/hooks/utils/useTranslation";

export interface DialogDeleteProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
    title: string;
    content: string;
    deleteText?: string;
}

const DialogDeleteV2 = (props: DialogDeleteProps) => {
    const { open, onClose, onDelete, title, content, deleteText } = props;

    const t = useTranslation();

    return (
        <DialogBase
            open={open}
            onClose={onClose}
            onConfirm={onDelete}
            title={title}
            content={content}
            confirmText={deleteText || t("common.delete")}
        />
    );
};

export default DialogDeleteV2;
