import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import { useBotManagementContext } from "src/contexts/BotManagementContext";
import useTranslation from "src/hooks/utils/useTranslation";
import DocumentList from "src/pages/Management/ManagementDetail/KnowledgeBase/DocumentList";
import SourceList from "src/pages/Management/ManagementDetail/KnowledgeBase/SourceList";

export interface KnowledgeBaseProps {
    refetchProfile?: () => void;
}

const KnowledgeBase = ({ refetchProfile }: KnowledgeBaseProps) => {
    const t = useTranslation();
    const {
        state,
        isProcessing,
        setSearchText: setSearchTextInSource,
        currentSelectedSourceId,
    } = useBotManagementContext();

    const searchRef = useRef<HTMLInputElement>(null);
    const [searchText, setSearchText] = useState("");

    const renderSourceList = useMemo(
        () => <SourceList refetchProfile={refetchProfile} />,
        [refetchProfile]
    );
    const renderDocumentList = useMemo(
        () => (
            <DocumentList
                key={currentSelectedSourceId}
                flexGrow={1}
                onDeleteLastDocument={() => {
                    window.dispatchEvent(new Event("deleteLastDocument"));
                }}
            />
        ),
        [currentSelectedSourceId]
    );

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchTextInSource(searchText);
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [searchText, setSearchTextInSource]);

    return (
        <Box>
            <LoadingIcon open={isProcessing} />

            {state === "empty" ? (
                <Box
                    sx={{
                        height: "calc(100vh - 264px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "1.5rem",
                            fontWeight: 400,
                        }}
                    >
                        {t("error.sourceNotFound")}
                    </Typography>
                </Box>
            ) : null}

            <Box sx={state !== "loaded" ? { display: "none" } : {}}>
                <TextField
                    fullWidth
                    multiline
                    label={t("common.search")}
                    variant="outlined"
                    size="small"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    InputProps={{
                        ref: searchRef,
                        endAdornment: (
                            <InputAdornment position="end">
                                {searchText ? (
                                    <IconButton onClick={() => setSearchText("")}>
                                        <ClearIcon />
                                    </IconButton>
                                ) : null}
                                <IconButton onClick={() => {}}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                        sx: {
                            mb: 3,
                            pr: 0,
                        },
                    }}
                />
                <Stack direction="row">
                    {renderSourceList}
                    <Box borderLeft="1px solid" borderColor="divider" mx={1}></Box>
                    {renderDocumentList}
                </Stack>
            </Box>
        </Box>
    );
};

export default KnowledgeBase;
