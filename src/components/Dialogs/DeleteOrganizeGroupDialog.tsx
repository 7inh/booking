import { useCallback, useState } from "react";
import { isRequestSuccessful } from "src/common/utils";
import DialogDeleteV2 from "src/components/Dialogs/DialogDeleteV2";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import useDeleteOrganizeGroup from "src/hooks/useDeleteOrganizeGroup";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";

export interface CreateOrganizeDialogProps {
    organizeId: string;
    groupSelected: any;
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function DeleteOrganizeGroupDialog({
    organizeId,
    groupSelected,
    open,
    onClose,
    onSuccess,
}: CreateOrganizeDialogProps) {
    const snackbar = useSnackBar();
    const t = useTranslation();
    const { handleError } = useHandleError();

    const [isLoading, setIsLoading] = useState(false);

    const { mutateAsync: deleteGroup } = useDeleteOrganizeGroup({});

    const handleDeleteOrganizeGroup = useCallback(async () => {
        setIsLoading(true);
        try {
            const response: any = await deleteGroup({
                organizeId,
                groupId: [groupSelected?.groupId],
            });

            if (isRequestSuccessful(response)) {
                snackbar({
                    message: t("success.deleteGroup"),
                    severity: response?.data?.success ? "success" : "warning",
                });
                onClose();
                onSuccess();
            }
        } catch (error) {
            handleError(error);
        }
        setIsLoading(false);
    }, [
        deleteGroup,
        groupSelected?.groupId,
        handleError,
        onClose,
        onSuccess,
        organizeId,
        snackbar,
        t,
    ]);

    return (
        <>
            <LoadingIcon open={isLoading} zIndex={10000} />
            <DialogDeleteV2
                open={open}
                onClose={onClose}
                onDelete={handleDeleteOrganizeGroup}
                title={t("dialog.deleteGroup.title")}
                content={"Are you sure you want to delete selected group?"}
            />
        </>
    );
}
