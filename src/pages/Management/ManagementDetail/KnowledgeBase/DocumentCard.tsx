import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { Box, BoxProps, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import IconCommon from "src/components/Icons/IconCommon";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import LinearIndeterminate from "src/components/Icons/LinearIndeterminate";
import useTranslation from "src/hooks/utils/useTranslation";

export interface DocumentCardProps extends BoxProps {
    contentRef: (el: any) => void;
    raw: string;
    editable: boolean;
    state?: string;
    stateDesc?: string;
    disabledUpdate: boolean;
    disabledDelete: boolean;
    onAddDocument: () => void;
    onDeleteDocument: () => void;
    onUpdateDocument: () => void;
    onContentChange: () => void;
    onReUp?: () => void;
}

const DocumentCard = ({
    contentRef,
    raw,
    state,
    stateDesc,
    editable,
    disabledUpdate,
    disabledDelete,
    onAddDocument,
    onDeleteDocument,
    onUpdateDocument,
    onContentChange,
    onReUp,
    ...rest
}: DocumentCardProps) => {
    const isFailed = state === "ERROR";

    const t = useTranslation();

    return (
        <Box {...rest}>
            {isFailed ? (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mb: 0.5,
                    }}
                >
                    <InfoRoundedIcon
                        sx={{
                            color: "primary.main",
                        }}
                    />
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: "18px",
                            color: "#FF7748",
                        }}
                    >
                        {stateDesc ? t(`errorHandler.${stateDesc}`) : t("error.documentErrorNull")}
                    </Typography>
                </Box>
            ) : null}
            <Box display="flex">
                <Box width="100%">
                    <TextField
                        fullWidth
                        defaultValue={raw}
                        multiline
                        minRows={4}
                        InputProps={{
                            readOnly: !editable,
                        }}
                        inputProps={{
                            sx: {
                                color: editable ? "text.primary" : "text.disabled",
                            },
                        }}
                        sx={{
                            "& fieldset": {
                                borderWidth: isFailed ? 1 : 0,
                                border: isFailed ? "1px solid red" : "none",
                                borderRadius: 0,
                            },
                            "& .Mui-focused fieldset": {
                                borderWidth: isFailed ? "" : "1px !important",
                                border: isFailed ? "2px dashed red !important" : "",
                            },
                        }}
                        onChange={() => onContentChange()}
                        ref={contentRef}
                    />
                    {state === "PROCESSING" ? <LinearIndeterminate /> : null}
                </Box>
                <Stack
                    sx={{
                        borderLeft: "1px solid",
                        borderColor: "divider",
                        borderWidth: "2px",
                    }}
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            width: "min-content",
                        }}
                    >
                        {isFailed ? (
                            <IconButton color="info" onClick={() => onReUp?.()}>
                                <ReplayRoundedIcon />
                            </IconButton>
                        ) : (
                            <IconButton
                                color="info"
                                onClick={() => onUpdateDocument()}
                                disabled={disabledUpdate}
                            >
                                {IconCommon.save(disabledUpdate)}
                            </IconButton>
                        )}
                        <IconButton
                            color="warning"
                            onClick={() => onDeleteDocument()}
                            disabled={disabledDelete}
                        >
                            {IconCommon.delete(disabledDelete)}
                        </IconButton>
                    </Box>
                    <Box>
                        <IconButton
                            sx={{
                                color: "rgba(81, 218, 69, 1)",
                            }}
                            onClick={() => onAddDocument()}
                            disabled={disabledDelete}
                        >
                            <AddCircleRoundedIcon />
                        </IconButton>
                    </Box>
                </Stack>
            </Box>

            <Divider
                sx={{
                    borderStyle: "dashed",
                }}
            />
        </Box>
    );
};

export default DocumentCard;
