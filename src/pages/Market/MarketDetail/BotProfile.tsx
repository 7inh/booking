import { Box, BoxProps, Button, Stack, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { isRequestSuccessful } from "src/common/utils";
import BotAvatar from "src/components/Bot/BotAvatar";
import AccountNotVerifiedDialog from "src/components/Dialogs/AccountNotVerifiedDialog";
import ConfirmDialogV2 from "src/components/Dialogs/ConfirmDialogV2";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import useAddBotFromMarket from "src/hooks/useAddBotFromMarket";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";

export interface BotProfileProps extends BoxProps {
    botProfile: any;
    onAddBotFromMarket?: () => void;
}

const BotProfile = ({ botProfile, onAddBotFromMarket, ...props }: BotProfileProps) => {
    const { avatar, isPublished, botName, tags = [] } = botProfile;

    const [openDialogConfirmAddBot, setOpenDialogConfirmAddBot] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const t = useTranslation();
    const snackbar = useSnackBar();
    const { handleError } = useHandleError();

    const [openAccountNotVerifiedDialog, setOpenAccountNotVerifiedDialog] = useState(false);
    const { mutateAsync: addBotFromMarket } = useAddBotFromMarket();

    const handleAddBotFromMarket = useCallback(async () => {
        try {
            setIsLoading(true);
            const response: any = await addBotFromMarket({ botToken: botProfile.botToken });

            if (isRequestSuccessful(response)) {
                setOpenDialogConfirmAddBot(false);
                snackbar({
                    message: t("success.addBotFromMarket"),
                    severity: "success",
                });
                onAddBotFromMarket?.();
                return;
            } else {
                snackbar({
                    message: t("error.addBotFromMarket"),
                    severity: "error",
                });
            }
        } catch (error: any) {
            if (error.response?.data?.data?.code === "UNVERIFIED_USER") {
                setOpenAccountNotVerifiedDialog(true);
                return;
            }

            handleError(error);
        } finally {
            setIsLoading(false);
        }
    }, [addBotFromMarket, botProfile.botToken, handleError, onAddBotFromMarket, snackbar, t]);

    const renderDialogConfirmAddBot = useMemo(() => {
        return (
            <ConfirmDialogV2
                open={openDialogConfirmAddBot}
                onClose={() => setOpenDialogConfirmAddBot(false)}
                title={t("dialog.addBotFromMarket.title")}
                content={t("dialog.addBotFromMarket.content")}
                onConfirm={() => handleAddBotFromMarket()}
            />
        );
    }, [handleAddBotFromMarket, openDialogConfirmAddBot, t]);

    const renderAccountNotVerifiedDialog = useMemo(
        () => (
            <AccountNotVerifiedDialog
                open={openAccountNotVerifiedDialog}
                onClose={() => setOpenAccountNotVerifiedDialog(false)}
            />
        ),
        [openAccountNotVerifiedDialog]
    );

    return (
        <Box {...props}>
            <LoadingIcon open={isLoading} zIndex={2000} />
            {renderAccountNotVerifiedDialog}
            {renderDialogConfirmAddBot}
            <Box display="flex" alignItems="center" gap={4}>
                <Box
                    sx={{
                        position: "relative",
                        width: "fit-content",
                    }}
                >
                    <BotAvatar
                        botName={botName}
                        chatColor={botProfile.chatColor}
                        isPublic={!isPublished}
                        src={avatar || ""}
                        size="120px"
                    />
                </Box>
                <Stack spacing={2}>
                    <Typography
                        sx={{
                            fontSize: "24px",
                            fontWeight: 700,
                            lineHeight: "22px",
                        }}
                    >
                        {botName}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            gap: "4px",
                        }}
                    >
                        {tags.map((tag: string) => (
                            <Box
                                key={tag}
                                sx={{
                                    bgcolor: "rgba(34, 197, 94, 0.16)",
                                    borderRadius: "4px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "12px",
                                        fontWeight: 700,
                                        color: "#118D57",
                                        px: 1,
                                        py: 0.25,
                                    }}
                                >
                                    {tag}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            disabled={botProfile.isBuy}
                            sx={{
                                boxShadow: "none",
                                borderRadius: "8px",
                                textTransform: "none",
                                height: "32px",
                                "&:hover": {
                                    boxShadow: "none",
                                },
                                minWidth: "120px",
                            }}
                            onClick={() => setOpenDialogConfirmAddBot(true)}
                        >
                            {t(
                                botProfile.isBuy
                                    ? "page.kamiStore.addedBot"
                                    : "page.kamiStore.addBot"
                            )}
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

export default BotProfile;
