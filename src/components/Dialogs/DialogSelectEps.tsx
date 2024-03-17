import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useMemo, useState } from "react";
import { scrollbarSx } from "src/common/sxs";
import { ItemEpsType } from "src/common/types";
import { getTotalPrice } from "src/common/utils";
import BoxBase from "src/components/Boxs/BoxBase";
import ButtonClose from "src/components/Buttons/ButtonClose";
import LoadingCenter from "src/components/Icons/LoadingCenter";
import ItemEps from "src/components/Items/ItemEps";
import ListItemEps from "src/components/Lists/ListItemEps";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useGetItemEpsByItemId from "src/hooks/useGetItemEpsByItemId";
import useTranslation from "src/hooks/utils/useTranslation";

export interface DialogSelectEpsProps {
    open: boolean;
    itemId: string;
    onClose: () => void;
    onConfirm?: (selectedListItemEps: ItemEpsType[]) => void;
    confirmText?: string;
    selectedListItemEps?: ItemEpsType[];
}

const DialogSelectEps = ({
    open,
    itemId,
    confirmText,
    onClose,
    onConfirm,
    selectedListItemEps: initSelected = [],
}: DialogSelectEpsProps) => {
    const t = useTranslation();

    const [currentViewItemEps, setCurrentViewItemEps] = useState<ItemEpsType | null>(null);
    const [selectedListItemEps, setSelectedListItemEps] = useState<ItemEpsType[]>(initSelected);

    const totalPrice: number = useMemo(() => {
        return getTotalPrice(selectedListItemEps);
    }, [selectedListItemEps]);

    const { data: listItemEps, isFetching } = useGetItemEpsByItemId({
        itemId,
        onSuccess: (data) => {
            if (data.length) {
                setCurrentViewItemEps(data[0]);
            }
        },
    });

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                style: { borderRadius: 4 },
            }}
            fullWidth
            maxWidth="lg"
            onClick={(e) => {
                if ((e.target as HTMLElement).className.includes("MuiDialog-container")) {
                    onClose();
                }
                e.stopPropagation();
            }}
        >
            <ButtonClose
                absolute
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
            />
            <DialogContent sx={{ p: 2, pb: 2, display: "flex", flexDirection: "column" }}>
                {isFetching ? (
                    <LoadingCenter />
                ) : (
                    <>
                        {currentViewItemEps ? (
                            <ItemEps itemEps={currentViewItemEps} mainView />
                        ) : null}
                        <TypographyBase
                            sx={{
                                fontSize: "1rem",
                                fontWeight: 500,
                                pt: 2,
                                pb: 1,
                                color: "primary.dark",
                            }}
                        >
                            {t(
                                selectedListItemEps.length
                                    ? "dialog.dialogSelectEps.selectEpsNote"
                                    : "dialog.dialogSelectEps.selectEps",
                                {
                                    count: `${selectedListItemEps.length}/${listItemEps.length}`,
                                }
                            )}
                        </TypographyBase>
                        <BoxBase
                            sx={{
                                overflowY: "auto",
                                ...scrollbarSx,
                            }}
                        >
                            <ListItemEps
                                listItemEps={listItemEps}
                                selectedListItemEpsId={selectedListItemEps.map(({ id }) => id)}
                                onToggleSelect={(item, isSelected) => {
                                    setSelectedListItemEps((prev) =>
                                        isSelected
                                            ? prev.filter(({ id }) => id !== item.id)
                                            : [...prev, item]
                                    );
                                }}
                                onPreview={setCurrentViewItemEps}
                            />
                        </BoxBase>
                    </>
                )}
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
                <Button
                    onClick={() => {
                        onClose();
                    }}
                    sx={{
                        bgcolor: "#D9D9D9",
                        textTransform: "none",
                        p: 1.2,
                        borderRadius: "1px",
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
                        {t("dialog.dialogSelectEps.cancelText")}
                    </TypographyBase>
                </Button>
                <Button
                    onClick={() => {
                        onConfirm?.(selectedListItemEps);
                        onClose();
                    }}
                    variant="contained"
                    sx={{
                        boxShadow: "none",
                        textTransform: "none",
                        borderRadius: "1px",
                        "&:hover": {
                            boxShadow: "none",
                        },
                        p: 1.2,
                    }}
                    disabled={selectedListItemEps.length === 0}
                >
                    <TypographyBase
                        sx={{
                            color: "#FFFFFF",
                            fontSize: "14px",
                            fontWeight: 500,
                        }}
                    >
                        {confirmText || t("dialog.dialogSelectEps.confirmText")}{" "}
                        {totalPrice > 0
                            ? `(${totalPrice.toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                              })})`
                            : ""}
                    </TypographyBase>
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogSelectEps;
