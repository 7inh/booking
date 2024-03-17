import { useMemo, useState } from "react";
import { Book } from "src/common/types";
import BoxBase from "src/components/Boxs/BoxBase";
import DialogSelectEps from "src/components/Dialogs/DialogSelectEps";
import { useCartContext } from "src/contexts/CartContext";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";

export interface ButtonAddToCartProps {
    trigger: React.ReactNode;
    book: Book;
}

const ButtonAddToCart = ({ trigger, book }: ButtonAddToCartProps) => {
    const t = useTranslation();
    const snackbar = useSnackBar();

    const { addToCart } = useCartContext();

    const [confirmText, setConfirmText] = useState<string>("");

    const renderDialogSelectEps = useMemo(() => {
        if (!confirmText) return null;

        return (
            <DialogSelectEps
                open={true}
                onClose={() => setConfirmText("")}
                confirmText={confirmText}
                itemId={book.id}
                onConfirm={(selectedListItemEps) => {
                    addToCart({
                        book,
                        eps: selectedListItemEps,
                    });
                    snackbar({
                        message: t("success.addToCart"),
                        severity: "success",
                    });
                }}
            />
        );
    }, [addToCart, book, confirmText, snackbar, t]);

    return (
        <>
            {renderDialogSelectEps}
            <BoxBase
                onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    setConfirmText(t("common.addToCart"));
                }}
            >
                {trigger}
            </BoxBase>
        </>
    );
};

export default ButtonAddToCart;
