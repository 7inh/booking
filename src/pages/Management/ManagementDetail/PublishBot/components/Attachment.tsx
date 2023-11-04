import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import ImageViewer from "src/components/ImageViewer/ImageViewer";
import useTranslation from "src/hooks/utils/useTranslation";

export interface AttachmentProps {
    previewImg: {
        name: string;
        src: string;
    }[];
    showDeleteButton?: boolean;
    showDownloadButton?: boolean;
    onDelete?: (idx: number) => void;
}

const Attachment = (props: AttachmentProps) => {
    const { previewImg, showDeleteButton = false, showDownloadButton = true, onDelete } = props;

    const t = useTranslation();

    const [openImageViewer, setOpenImageViewer] = useState(false);
    const [currentSelectedIdx, setCurrentSelectedIdx] = useState(0);

    const handleDownload = useCallback((src: string) => {
        const link = document.createElement("a");
        link.setAttribute("href", src);
        link.setAttribute("target", "_blank");
        link.click();
    }, []);

    return (
        <>
            <ImageViewer
                images={previewImg.map((img) => img.src)}
                key={currentSelectedIdx}
                open={openImageViewer}
                currentSelectedIdx={currentSelectedIdx}
                onClose={() => {
                    setOpenImageViewer(false);
                    setCurrentSelectedIdx(-1);
                }}
            />
            <Typography
                sx={{
                    color: "#636773",
                    fontSize: "14px",
                    fontWeight: "600",
                    mt: 1,
                    mb: 0.5,
                }}
            >
                {t("common.attachment")} ({previewImg.length}):
            </Typography>
            <Stack spacing={0.5}>
                {previewImg.map(({ src, name }, index) => (
                    <Box
                        key={src}
                        sx={{
                            bgcolor: "rgba(129, 214, 158, 0.24)",
                            borderRadius: "4px",
                            p: 1,
                            py: 0,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <InsertPhotoRoundedIcon
                                sx={{
                                    color: "#81D69E",
                                }}
                            />
                            <Typography
                                sx={{
                                    color: "#636773",
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "0",
                                    WebkitBoxOrient: "vertical",
                                    wordBreak: "break-word",
                                }}
                            >
                                {name || t("common.attachment")}-{index + 1}
                            </Typography>
                        </Box>
                        <Box flexShrink={0}>
                            <Button
                                onClick={() => {
                                    setOpenImageViewer(true);
                                    setCurrentSelectedIdx(index);
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "primary.main",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        textTransform: "none",
                                    }}
                                >
                                    {t("common.preview")}
                                </Typography>
                            </Button>
                            {showDownloadButton ? (
                                <Button onClick={() => handleDownload(src)}>
                                    <Typography
                                        sx={{
                                            color: "primary.main",
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            textTransform: "none",
                                        }}
                                    >
                                        {t("common.download")}
                                    </Typography>
                                </Button>
                            ) : null}
                            {showDeleteButton ? (
                                <Button onClick={() => onDelete?.(index)}>
                                    <Typography
                                        sx={{
                                            color: "red",
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            textTransform: "none",
                                        }}
                                    >
                                        {t("common.delete")}
                                    </Typography>
                                </Button>
                            ) : null}
                        </Box>
                    </Box>
                ))}
            </Stack>
        </>
    );
};

export default Attachment;
