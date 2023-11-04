import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormCreateBot from "src/components/Forms/FormCreateBot";
import useTranslation from "src/hooks/utils/useTranslation";

export interface CreateBotDialogProps {
    open: boolean;
    onClose: () => void;
    groups?: any[];
    organizeId?: string;
    groupId?: string;
    showGroupField?: boolean;
    onCreateSuccess?: () => void;
}

const FORM_ID = "create-bot-form";

const CreateBotDialog = ({
    organizeId,
    groupId,
    groups,
    open,
    showGroupField = false,
    onClose,
    onCreateSuccess,
}: CreateBotDialogProps) => {
    const t = useTranslation();

    return (
        <Dialog
            open={open}
            onClose={() => onClose()}
            PaperProps={{
                style: { borderRadius: 8 },
            }}
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        maxWidth: "1000px",
                    },
                },
            }}
        >
            <DialogTitle
                sx={{
                    bgcolor: "primary.main",
                    color: "white",
                }}
            >
                {t("dialog.createBot.title")}
            </DialogTitle>
            <DialogContent
                sx={{
                    p: 0,
                }}
            >
                <Box
                    sx={{
                        minWidth: "700px",
                        overflow: "auto",
                        p: 3,
                    }}
                >
                    <FormCreateBot
                        id={FORM_ID}
                        organizeId={organizeId}
                        groupId={groupId}
                        groups={groups}
                        onCreateSuccess={() => {
                            onCreateSuccess?.();
                            onClose();
                        }}
                        showGroupField={showGroupField}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose}>{t("common.cancel")}</Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        const form = document.querySelector(`#${FORM_ID}`)?.querySelector("form");
                        form?.requestSubmit();
                    }}
                >
                    {t("common.create")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateBotDialog;
