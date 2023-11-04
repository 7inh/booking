import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DialogBase from "src/components/Dialogs/DialogBase";
import useTranslation from "src/hooks/utils/useTranslation";

export interface AccountNotVerifiedDialogProps {
    open: boolean;
    onClose: () => void;
}

const AccountNotVerifiedDialog = (props: AccountNotVerifiedDialogProps) => {
    const { open, onClose } = props;

    const t = useTranslation();
    const navigate = useNavigate();

    const handleNavigateToVerify = useCallback(() => {
        navigate("/account");
        onClose();
    }, [navigate, onClose]);

    return (
        <DialogBase
            open={open}
            onClose={onClose}
            onConfirm={handleNavigateToVerify}
            title={t("dialog.accountNotVerified.title")}
            content={t("dialog.accountNotVerified.content")}
            confirmText={t("dialog.accountNotVerified.confirmText")}
        />
    );
};

export default AccountNotVerifiedDialog;
