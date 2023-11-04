import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, BoxProps, Grid, IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { Fragment, useCallback, useState } from "react";
import { useBotManagementContext } from "src/contexts/BotManagementContext";
import useTranslation from "src/hooks/utils/useTranslation";
import { documentInfoChip } from "src/pages/Management/ManagementDetail/KnowledgeBase/sx";

export interface SourceCardProps extends BoxProps {
    fileName: string;
    createTime: string;
    state: string;
    stateDesc: string;
    numDocs: number;
    numToken: number;
    documentInfo: {
        key: string;
        value: number;
    }[];
    isSelected: boolean;
    onOpenEditDialog?: () => void;
    onOpenDeleteDialog?: () => void;
}

const SourceCard = (props: SourceCardProps) => {
    const {
        fileName,
        createTime,
        state,
        stateDesc,
        numDocs,
        numToken,
        documentInfo,
        isSelected,
        onOpenEditDialog,
        onOpenDeleteDialog,
        ...rest
    } = props;

    const { isFilterErrorDocument, setIsFilterErrorDocument } = useBotManagementContext();

    const t = useTranslation();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const renderDocumentInfo = useCallback(
        (key: string, value: string) => {
            const color =
                key === "PROCESSING"
                    ? "rgba(90, 141, 255, 1)"
                    : key === "INDEXED"
                    ? "#22C55E"
                    : isFilterErrorDocument
                    ? "white"
                    : "#FF5630";
            const bgcolor =
                key === "PROCESSING"
                    ? "rgba(90, 141, 255, 0.1)"
                    : key === "INDEXED"
                    ? "#E3FCEF"
                    : isFilterErrorDocument
                    ? "#FF5630"
                    : "#FFEBE6";

            return (
                <Box
                    display="flex"
                    gap={0.5}
                    sx={{
                        color: color,
                        bgcolor: bgcolor,
                        p: "2px 10px",
                        borderRadius: "25px",
                        borderColor: color,
                        border: "1px solid",
                        WebkitTouchCallout: "none",
                        WebkitUserSelect: "none",
                        KhtmlUserSelect: "none",
                        MozUserSelect: "none",
                        msUserSelect: "none",
                        userSelect: "none",
                    }}
                    onClick={() => {
                        if (key === "ERROR") {
                            setIsFilterErrorDocument(!isFilterErrorDocument);
                        }
                    }}
                >
                    <Typography sx={documentInfoChip}>
                        {t(`common.${key.toLocaleLowerCase()}`)}
                    </Typography>
                    <Typography sx={documentInfoChip}>({value.toString()})</Typography>
                </Box>
            );
        },
        [isFilterErrorDocument, setIsFilterErrorDocument, t]
    );

    const renderRowData = useCallback((label: string, value: string, isError = false) => {
        return (
            <Grid container minWidth="270px">
                <Grid item xs={4}>
                    <Typography
                        sx={{
                            fontSize: 14,
                            fontWeight: 700,
                            lineHeight: "22px",
                        }}
                    >
                        {label}
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography
                        sx={{
                            color: isError ? "#FF5630" : "#6B778C",
                            fontSize: 14,
                            fontWeight: 400,
                            lineHeight: "22px",
                            wordBreak: "break-word",
                            mr: 1,
                        }}
                    >
                        {value}
                    </Typography>
                </Grid>
            </Grid>
        );
    }, []);

    return (
        <Box
            sx={{
                position: "relative",
            }}
        >
            <Box
                {...rest}
                sx={{
                    border: "1px solid",
                    borderColor: state === "ERROR" ? "#FF5630" : isSelected ? "#5A8DFF" : "#E0E0E0",
                    padding: "16px 14px",
                    borderRadius: "8px",
                    cursor: "pointer",
                }}
            >
                <Stack>
                    {renderRowData(t("common.fileName"), fileName)}
                    {renderRowData(
                        t("common.dateAdded"),
                        DateTime.fromFormat(createTime, "dd/MM/yyyy HH:mm:ss").toFormat(
                            "HH:mm:ss dd-MM-yyyy"
                        )
                    )}
                    {renderRowData(
                        t("common.state"),
                        state === "PROCESSING"
                            ? t("message.training")
                            : t(`common.${state.toLocaleLowerCase()}`) +
                                  (state === "ERROR" && stateDesc
                                      ? ` - ${t(`errorHandler.${stateDesc}`)}`
                                      : ""),
                        state === "ERROR"
                    )}
                    {renderRowData(t("common.numToken"), numToken.toString())}
                </Stack>
                <Stack direction="row" columnGap={0.75} rowGap={1} flexWrap="wrap" mt={1}>
                    {documentInfo.map((info) => {
                        return (
                            <Fragment key={`${fileName}-${info.key}`}>
                                {renderDocumentInfo(
                                    info.key,
                                    Math.round((info.value / (numDocs || 1)) * 100) + "%"
                                )}
                            </Fragment>
                        );
                    })}
                </Stack>
            </Box>
            <IconButton
                onClick={(event) => setAnchorEl(event.currentTarget)}
                sx={{
                    position: "absolute",
                    right: 0,
                    top: "8px",
                    zIndex: 1,
                }}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                <MenuItem
                    onClick={() => {
                        setAnchorEl(null);
                        onOpenEditDialog && onOpenEditDialog();
                    }}
                >
                    {t("common.edit")}
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setAnchorEl(null);
                        onOpenDeleteDialog && onOpenDeleteDialog();
                    }}
                >
                    <Typography color="error">{t("common.deleteSource")}</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default SourceCard;
