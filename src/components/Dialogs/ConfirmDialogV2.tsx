import DialogBase from "src/components/Dialogs/DialogBase";

export interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    content: string;
    showCancel?: boolean;
}

const ConfirmDialogV2 = (props: ConfirmDialogProps) => {
    const { open, onClose, onConfirm, title, content, showCancel } = props;

    return (
        <DialogBase
            open={open}
            onClose={onClose}
            onConfirm={onConfirm}
            title={title}
            content={content}
            showCancel={showCancel}
        />
    );
};

export default ConfirmDialogV2;
