import { Box, BoxProps, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { IconDelete } from "src/components/Icons/IconExternal";
import useTranslation from "src/hooks/utils/useTranslation";

export interface RawCardProps extends BoxProps {
    onDelete?: () => void;
}

const RawCard = (props: RawCardProps) => {
    const t = useTranslation();

    const [currentContentLength, setCurrentContentLength] = useState(0);

    return (
        <Box display="flex" gap={1}>
            <Box>
                <IconButton
                    sx={{
                        color: "red",
                    }}
                    onClick={props.onDelete}
                >
                    <IconDelete />
                </IconButton>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <TextField
                    sx={{
                        m: 0,
                    }}
                    required
                    margin="normal"
                    fullWidth
                    id="title"
                    label={t("common.title")}
                    name="title"
                    autoFocus
                    size="small"
                    multiline
                    rows={1}
                />
                <Box position="relative">
                    <TextField
                        sx={{
                            m: 0,
                        }}
                        required
                        margin="normal"
                        fullWidth
                        id="content"
                        label={t("common.content")}
                        name="content"
                        autoFocus
                        size="small"
                        multiline
                        rows={10}
                        inputProps={{
                            maxLength: 2000,
                        }}
                        onChange={(e) => {
                            setCurrentContentLength(e.target.value.length);
                        }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "text.disabled",
                            }}
                        >
                            {currentContentLength}/2000
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default RawCard;
