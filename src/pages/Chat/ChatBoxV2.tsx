import SendRoundedIcon from "@mui/icons-material/SendRounded";
import {
    Box,
    CircularProgress,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isRequestSuccessful } from "src/common/utils";
import BotAvatar from "src/components/Bot/BotAvatar";
import AccountNotVerifiedDialog from "src/components/Dialogs/AccountNotVerifiedDialog";
import ConfirmDialogV2 from "src/components/Dialogs/ConfirmDialogV2";
import DialogShareChat from "src/components/Dialogs/DialogShareChat";
import DotWave from "src/components/DotWave/DotWave";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import { useAccountContext } from "src/contexts/AccountContext";
import useChatWithBotV4 from "src/hooks/useChatWithBotV4";
import useShareStory from "src/hooks/useShareStory";
import useHandleError from "src/hooks/utils/useHandleError";
import { useResponsive } from "src/hooks/utils/useResponsive";
import useTranslation from "src/hooks/utils/useTranslation";
import ChatBoxHeader from "src/pages/Chat/ChatBoxHeader";
import SomethingWentWrong from "src/pages/Chat/SomethingWentWrong";
import { getChatStyle } from "src/pages/Chat/utils";

export interface ChatBoxV2Props {
    botToken: string;
    botName: string;
    avatar: string;
    chatColor?: string;
    isPublic: boolean;
    level: number;
    isOwner?: boolean;
    isStoryIdRequired?: boolean;
    toggleInformationPanel?: () => void;
    onChargeMoney?: () => void;
    onStartNewChat?: () => void;
}

const ChatBoxV2 = (props: ChatBoxV2Props) => {
    const {
        botToken,
        botName,
        avatar,
        chatColor,
        isPublic,
        level,
        isOwner,
        isStoryIdRequired,
        toggleInformationPanel,
        onChargeMoney,
        onStartNewChat,
    } = props;

    const {
        detail: { displayName },
    } = useAccountContext();

    const t = useTranslation();
    const navigate = useNavigate();
    const setSearchParams = useSearchParams()[1];
    const { handleError: handleErrorSnackbar } = useHandleError();

    const xsDown = useResponsive("down", "md");

    const chatRef = useRef<HTMLDivElement>(null);
    const [chatState, setChatState] = useState<"ready" | "processing" | "responding">("processing");
    const [errorCode, setErrorCode] = useState<string | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openNotVerifiedDialog, setOpenNotVerifiedDialog] = useState(false);
    const [openShareChatDialog, setOpenShareChatDialog] = useState(false);
    const [shareId, setShareId] = useState<string | null>(null);
    const [isRefetch, setIsRefetch] = useState(false);

    const { storyId, messages, typingText, clearChat, submitChat, retry } = useChatWithBotV4({
        botToken,
        isStoryIdRequired,
        onStarted: () => setChatState("responding"),
        onDone: (isSubmitted) => {
            setChatState("ready");
            setErrorCode(null);
            onChargeMoney?.();

            if (isSubmitted && !isRefetch) {
                onStartNewChat?.();
                setIsRefetch(true);
            }
        },
        onError: (code) => {
            handleError(code);
        },
        onFetchedSuccess: ({ shareId }) => setShareId(shareId),
    });
    const { mutateAsync: shareStory, isLoading } = useShareStory();

    const handleError = useCallback(
        (code: string) => {
            setErrorCode(code);
            switch (code) {
                case "NOT_ENOUGH_AVAILABLE_MONEY":
                    setOpenDialog(true);
                    break;
                case "UNVERIFIED_USER":
                    setOpenNotVerifiedDialog(true);
                    break;
                default:
                    handleErrorSnackbar(code);
                    break;
            }
        },
        [handleErrorSnackbar]
    );

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (chatState !== "ready") {
            return;
        }
        setChatState("processing");

        const data = new FormData(event.currentTarget);
        const message = data.get("message") as string;

        if (!message) return;

        submitChat(message);

        event.currentTarget.reset();
    };

    const handleShareStory = useCallback(async () => {
        setOpenShareChatDialog(true);
        if (shareId) return;

        try {
            const response: any = await shareStory({ storyId });

            if (isRequestSuccessful(response)) {
                setShareId(response?.data?.data?.shareId);
            }
        } catch (error: any) {
            handleError(error);
            setOpenShareChatDialog(false);
        }
    }, [handleError, shareId, shareStory, storyId]);

    const renderBotAvatar = useMemo(() => {
        return <BotAvatar botName={botName} chatColor={chatColor} src={avatar || ""} size="32px" />;
    }, [avatar, botName, chatColor]);

    const renderDialog = useMemo(() => {
        return (
            <ConfirmDialogV2
                open={openDialog}
                title={t("dialog.notEnoughMoney.title")}
                content={t("dialog.notEnoughMoney.content")}
                onClose={() => setOpenDialog(false)}
                onConfirm={() => navigate("/buy-point")}
            />
        );
    }, [navigate, openDialog, t]);

    const renderAccountNotVerifiedDialog = useMemo(
        () => (
            <AccountNotVerifiedDialog
                open={openNotVerifiedDialog}
                onClose={() => setOpenNotVerifiedDialog(false)}
            />
        ),
        [openNotVerifiedDialog]
    );

    const renderShareChatDialog = useMemo(() => {
        const link = `${window.location.origin}/chat/share/${shareId}`;

        return (
            <DialogShareChat
                open={openShareChatDialog}
                isLoading={isLoading}
                link={link}
                onClose={() => setOpenShareChatDialog(false)}
            />
        );
    }, [isLoading, openShareChatDialog, shareId]);

    useEffect(() => {
        setChatState("processing");
    }, [botToken]);

    return (
        <>
            {renderDialog}
            {renderAccountNotVerifiedDialog}
            {renderShareChatDialog}
            <LoadingIcon open={isLoading} />
            <ChatBoxHeader
                botToken={botToken}
                botName={botName}
                avatar={avatar}
                chatColor={chatColor}
                displayName={displayName || ""}
                isPublic={isPublic}
                level={level}
                isOwner={Boolean(isOwner)}
                messages={messages}
                chatRef={chatRef}
                xsDown={xsDown}
                isStoryIdRequired={isStoryIdRequired}
                onBack={() => {
                    setSearchParams({ botToken: "" });
                    navigate("/chat");
                }}
                onShare={handleShareStory}
                onClear={clearChat}
                toggleInformationPanel={toggleInformationPanel}
                showButtonToggleInformationPanel={Boolean(toggleInformationPanel)}
            />
            <Box flexGrow={1} width="100%" display="flex" flexDirection="column" overflow="auto">
                <Box flexGrow={1} overflow="auto" ref={chatRef}>
                    {messages.map((message: any, index) => {
                        const { place, ...sx } = getChatStyle(message.role);
                        const isLast = index === messages.length - 1;

                        return (
                            <Box key={message.key} display="flex" justifyContent={place}>
                                <Box m={1} my={0.5} display="flex" gap={1}>
                                    {message.role === "assistant" ? (
                                        <Box>{renderBotAvatar}</Box>
                                    ) : null}
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontSize: "12px",
                                                fontWeight: 400,
                                                lineHeight: "18px",
                                                color: "#919EAB",
                                                textAlign: place,
                                            }}
                                        >
                                            {message.timestamp}
                                        </Typography>
                                        <Box display="flex" justifyContent="flex-end">
                                            <Box
                                                sx={{
                                                    ...sx,
                                                    "& pre": {
                                                        textWrap: "wrap",
                                                    },
                                                    "& p": {
                                                        whiteSpace: "pre-wrap",
                                                        m: 0,
                                                    },
                                                    "& p ~ p": {
                                                        mt: 1,
                                                    },
                                                    textAlign: "justify !important",
                                                }}
                                                p="12px"
                                                borderRadius={2}
                                                ref={(ref: HTMLDivElement | null) => {
                                                    if (ref && index === messages.length - 1) {
                                                        ref.scrollIntoView({
                                                            inline: "end",
                                                            behavior: "smooth",
                                                            block: "nearest",
                                                        });
                                                    }
                                                }}
                                            >
                                                <ReactMarkdown>
                                                    {message.content || typingText}
                                                </ReactMarkdown>
                                            </Box>
                                        </Box>
                                        {errorCode && message.role === "user" && isLast ? (
                                            <SomethingWentWrong
                                                onRetry={() => {
                                                    retry();
                                                    setErrorCode(null);
                                                }}
                                            />
                                        ) : null}
                                    </Box>
                                </Box>
                            </Box>
                        );
                    })}
                    {chatState === "processing" ? (
                        <Box p={1} px={1.75} borderRadius={2} m={1}>
                            <DotWave />
                        </Box>
                    ) : null}
                </Box>
                <Box
                    id="chat-input-form"
                    component="form"
                    onSubmit={handleSubmit}
                    mx={1}
                    sx={{
                        fieldset: {
                            borderWidth: "1px !important",
                            borderColor: "rgba(0, 0, 0, 0.23) !important",
                        },
                    }}
                >
                    <TextField
                        multiline
                        maxRows={8}
                        size="small"
                        margin="normal"
                        required
                        fullWidth
                        name="message"
                        onKeyDown={(event) => {
                            if (event.key === "Enter" && !event.shiftKey) {
                                const form = document.querySelector(
                                    "#chat-input-form"
                                ) as HTMLFormElement;

                                form?.requestSubmit();
                                form?.reset();
                                event.preventDefault();
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        disabled={!botToken}
                                        edge="end"
                                        type="submit"
                                        color="primary"
                                    >
                                        {chatState !== "ready" ? (
                                            <CircularProgress size={24} />
                                        ) : (
                                            <SendRoundedIcon />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </Box>
        </>
    );
};

export default ChatBoxV2;
