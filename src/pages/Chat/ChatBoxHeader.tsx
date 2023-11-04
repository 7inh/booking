import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import CachedIcon from "@mui/icons-material/Cached";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import jsPDF from "jspdf";
import { useState } from "react";
import ReactToPrint from "react-to-print";
import { amiriFont } from "src/common/fonts";
import BotAvatar from "src/components/Bot/BotAvatar";
import { IconShare } from "src/components/Icons/IconExternal";
import LinkBase from "src/components/Links/LinkBase";
import useTranslation from "src/hooks/utils/useTranslation";

export interface ChatBoxHeaderProps {
    botToken: string;
    botName: string;
    avatar: string;
    chatColor?: string;
    displayName: string;
    isPublic: boolean;
    level: number;
    isOwner: boolean;
    messages: any[];
    chatRef: any;
    xsDown: boolean;
    showButtonToggleInformationPanel?: boolean;
    isStoryIdRequired?: boolean;
    onBack?: () => void;
    onShare?: () => void;
    onClear?: () => void;
    toggleInformationPanel?: () => void;
}

const ChatBoxHeader = (props: ChatBoxHeaderProps) => {
    const {
        botToken,
        botName,
        avatar,
        chatColor,
        displayName,
        isPublic,
        level,
        messages,
        chatRef,
        xsDown,
        showButtonToggleInformationPanel,
        isStoryIdRequired,
        onBack,
        onShare,
        onClear,
        toggleInformationPanel,
    } = props;

    const t = useTranslation();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleDownloadChat = () => {
        const doc = new jsPDF();
        doc.addFileToVFS("Amiri-Regular.ttf", amiriFont);
        doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");
        doc.setFont("Amiri");
        doc.setFontSize(12);

        let y = 5;
        messages.forEach((message) => {
            y += 5;

            const maxWidth = 180;

            const lines = doc.splitTextToSize(
                `${message.role === "assistant" ? botName : displayName || "User"}: ${
                    message.content
                }`,
                maxWidth
            );

            if (message.role === "assistant") {
                doc.setTextColor("blue");
            } else {
                doc.setTextColor("black");
            }

            lines.forEach((line: any, index: number) => {
                doc.text(line, 10, y + 10);

                const spaceLeft = doc.internal.pageSize.height - (y + 20);
                if (spaceLeft < 10 && index !== lines.length - 1) {
                    doc.addPage();
                    y = 10;
                } else y += 10;
            });
        });
        doc.save("chat_history.pdf");
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            borderBottom="1px solid"
            borderColor="divider"
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
        >
            {botToken && xsDown ? (
                <IconButton sx={{ marginRight: -1 }} onClick={onBack}>
                    <ChevronLeftIcon />
                </IconButton>
            ) : null}
            <Box display="flex" alignItems="center" p={1} flexGrow={1}>
                <Box position="relative" mr={2}>
                    <BotAvatar
                        botName={botName}
                        chatColor={chatColor}
                        src={avatar || ""}
                        size="40px"
                        isPublic={isPublic && level === 1}
                    />
                </Box>
                <LinkBase to={`/management/${botToken}`}>
                    <Typography
                        sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                            "&:hover": {
                                ...(botToken && {
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                }),
                            },
                        }}
                    >
                        {botName || "..."}
                    </Typography>
                </LinkBase>
            </Box>
            {isStoryIdRequired && (
                <Box flexShrink={0}>
                    <Tooltip title={t("page.chat.shareStory")}>
                        <IconButton onClick={onShare}>
                            <IconShare />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}
            <Box flexShrink={0}>
                <Tooltip title={t("page.chat.downloadChat")}>
                    <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
                        <ArrowCircleDownIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                <MenuItem
                    onClick={() => {
                        handleDownloadChat();
                        handleClose();
                    }}
                >
                    {t("common.contentOnly")}
                </MenuItem>
                <ReactToPrint
                    trigger={() => <MenuItem>{t("common.graphic")}</MenuItem>}
                    onAfterPrint={() => {
                        handleClose();
                    }}
                    content={() => chatRef.current}
                />
            </Menu>
            <Box flexShrink={0}>
                <Tooltip title={t("page.chat.clearChat")}>
                    <IconButton disabled={!botToken} onClick={onClear}>
                        <CachedIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            {showButtonToggleInformationPanel ? (
                <Box flexShrink={0}>
                    <Tooltip title={t("page.chat.botInformation")}>
                        <IconButton disabled={!botToken} onClick={toggleInformationPanel}>
                            <InfoRoundedIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            ) : null}
        </Box>
    );
};

export default ChatBoxHeader;
