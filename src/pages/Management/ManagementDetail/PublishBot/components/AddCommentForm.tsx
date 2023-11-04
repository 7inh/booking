import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Box, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { isRequestSuccessful } from "src/common/utils";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import RHFTextField from "src/components/RHFs/RHFTextField";
import useInsertCommentPreview from "src/hooks/useInsertCommentPreview";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import Attachment from "src/pages/Management/ManagementDetail/PublishBot/components/Attachment";
import FormProvider from "src/providers/FormProvider";

export interface AddCommentFormProps {
    botToken: string;
    publishVersion: string;
    onAddCommentSuccess?: () => void;
}

type FormValuesProps = {
    comment: string;
    images: File[];
};

const defaultValues: FormValuesProps = {
    comment: "",
    images: [],
};

const AddCommentForm = ({ botToken, publishVersion, onAddCommentSuccess }: AddCommentFormProps) => {
    const t = useTranslation();
    const snackbar = useSnackBar();
    const { handleError } = useHandleError();

    const methods = useForm<FormValuesProps>({
        defaultValues,
    });

    const {
        formState: { isSubmitting },
        handleSubmit,
        reset,
    } = methods;

    const [files, setFiles] = useState<File[]>([]);

    const { mutateAsync: insertComment } = useInsertCommentPreview();

    const handleLoadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const newFiles = Array.from(e.target.files);

        setFiles(newFiles);
    };

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            try {
                if (!data.comment && files.length === 0) {
                    snackbar({
                        message: t("error.commentCannotBeEmpty"),
                        severity: "error",
                    });
                    return;
                }

                const response: any = await insertComment({
                    botToken,
                    publishVersion,
                    ...(data.comment
                        ? {
                              comment: data.comment,
                          }
                        : {}),
                    ...(files.length > 0
                        ? {
                              images: files,
                          }
                        : {}),
                });

                if (isRequestSuccessful(response)) {
                    snackbar({
                        message: t("success.addCommentPreview"),
                        severity: response?.data?.success ? "success" : "warning",
                    });
                    onAddCommentSuccess?.();
                    reset();
                    setFiles([]);
                } else {
                    snackbar({
                        message: t("error.addCommentPreview"),
                        severity: "error",
                    });
                }
            } catch (error) {
                handleError(error);
            }
        },
        [
            botToken,
            files,
            handleError,
            insertComment,
            onAddCommentSuccess,
            publishVersion,
            reset,
            snackbar,
            t,
        ]
    );

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} id="comment-form">
            <LoadingIcon open={isSubmitting} />
            <Input
                type="file"
                id="upload-file"
                componentsProps={{
                    input: {
                        multiple: true,
                        type: "file",
                        accept: "image/*",
                    },
                }}
                sx={{ display: "none" }}
                onChange={handleLoadFiles}
            />
            <Box>
                <RHFTextField
                    fullWidth
                    size="small"
                    placeholder={t("common.comment")}
                    name="comment"
                    maxRows={5}
                    multiline
                    sx={{
                        "& fieldset": {
                            border: "none",
                            borderRadius: "0",
                        },
                        "& label": {
                            color: "#919EAB",
                        },
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                            const form = document.querySelector("#comment-form") as HTMLFormElement;

                            form?.requestSubmit();
                            event.preventDefault();
                        }
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <InputLabel htmlFor="upload-file">
                                    <Box
                                        sx={{
                                            display: "flex",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <AttachFileRoundedIcon
                                            sx={{
                                                height: "20px",
                                            }}
                                        />
                                    </Box>
                                </InputLabel>
                                <IconButton
                                    edge="end"
                                    type="submit"
                                    color="primary"
                                    disabled={isSubmitting}
                                >
                                    <SendRoundedIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                {files.length > 0 ? (
                    <Box
                        textAlign="left"
                        sx={{
                            px: 2,
                            pb: 1,
                        }}
                    >
                        <Attachment
                            previewImg={files.map((img) => ({
                                src: URL.createObjectURL(img),
                                name: img.name,
                            }))}
                            showDownloadButton={false}
                            showDeleteButton
                            onDelete={(index) => {
                                const newFiles = [...files];
                                newFiles.splice(index, 1);
                                setFiles(newFiles);
                            }}
                        />
                    </Box>
                ) : null}
            </Box>
        </FormProvider>
    );
};

export default AddCommentForm;
