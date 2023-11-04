import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { isRequestSuccessful } from "src/common/utils";
import DialogDeleteV2 from "src/components/Dialogs/DialogDeleteV2";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import RHFTextField from "src/components/RHFs/RHFTextField";
import useDeleteBot from "src/hooks/useDeleteBot";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";

export interface DeleteBotButtonProps {
    botToken: string;
    botName: string;
}

type FormValuesProps = {
    botName: string;
};

const defaultValues: FormValuesProps = {
    botName: "",
};

const DangerZone = (props: DeleteBotButtonProps) => {
    const { botToken, botName } = props;

    const navigate = useNavigate();
    const t = useTranslation();
    const snackbar = useSnackBar();
    const { handleError } = useHandleError();

    const { state } = useLocation();
    const methods = useForm<FormValuesProps>({ defaultValues });
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const [open, setOpen] = useState(false);

    const { mutateAsync: deleteBot } = useDeleteBot({});

    const handleDeleteBot = useCallback(async () => {
        try {
            const response: any = await deleteBot({ botToken });

            if (isRequestSuccessful(response)) {
                snackbar({
                    message: t("success.deleteBot"),
                    severity: "success",
                });
                if (response?.data?.success) navigate(state?.from || "/");
            } else {
                snackbar({
                    message: t("error.deleteBot"),
                    severity: "error",
                });
            }
        } catch (error) {
            handleError(error);
        }
    }, [botToken, deleteBot, handleError, navigate, snackbar, state?.from, t]);

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            if (data.botName !== botName) {
                snackbar({
                    message: t("error.botNameIsNotMatch"),
                    severity: "error",
                });
                return;
            }
            setOpen(true);
        },
        [botName, snackbar, t]
    );

    const renderConfirmDeleteBotDialog = useMemo(() => {
        return (
            <DialogDeleteV2
                open={open}
                onClose={() => setOpen(false)}
                onDelete={handleDeleteBot}
                title={t("dialog.deleteBot.title")}
                content={t("dialog.deleteBot.content")}
            />
        );
    }, [handleDeleteBot, open, t]);

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <LoadingIcon open={isSubmitting} />
            {renderConfirmDeleteBotDialog}
            <Card
                sx={{
                    border: "1px solid rgba(255, 119, 72, 0.50)",
                    boxShadow:
                        "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "16px",
                    flexShrink: 0,
                }}
            >
                <Box
                    sx={{
                        bgcolor: "#fff",
                        width: "100%",
                        p: 2,
                        boxSizing: "border-box",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "20px",
                        }}
                    >
                        {t("common.dangerZone")}
                    </Typography>
                    <br />
                    <RHFTextField
                        fullWidth
                        name="botName"
                        size="small"
                        placeholder={t("common.botName")}
                        id="bot-name-delete"
                        sx={{
                            "& fieldset": {
                                border: "1px solid rgba(145, 158, 171, 0.20)",
                                borderRadius: "8px",
                            },
                            "& label": {
                                color: "#919EAB",
                            },
                        }}
                    />
                    <br />
                    <br />
                    <Stack gap={1} direction="row" justifyContent="end">
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                color: "white",
                                boxShadow: "none",
                                borderRadius: "8px",
                                textTransform: "none",
                                bgcolor: "red",
                                "&:hover": {
                                    bgcolor: "red",
                                },
                            }}
                        >
                            {t("common.deleteBot")}
                        </Button>
                    </Stack>
                </Box>
            </Card>
        </FormProvider>
    );
};

export default DangerZone;
