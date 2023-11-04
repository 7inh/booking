import { useCallback, useEffect, useState } from "react";
import { CORE_HOST } from "src/common/configs";
import { Message } from "src/common/types";
import { formatTime2, getChatErrorCode } from "src/common/utils";
import { useAccountContext } from "src/contexts/AccountContext";
import { useChatContext } from "src/contexts/ChatContext";
import useDeleteStoryHistory from "src/hooks/useDeleteStoryHistory";
import useGetLatestStory from "src/hooks/useGetLatestStory";
import useGetStoryDetail from "src/hooks/useGetStoryDetail";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import { v4 as uuidv4 } from "uuid";

export interface UseChatWithBotProps {
    botToken: string;
    enableChat?: boolean;
    isStoryIdRequired?: boolean;
    onDone?: (isSubmitted?: boolean) => void;
    onStarted?: () => void;
    onStarting?: (text: string) => void;
    onError?: (code: string) => void;
    onFetchedSuccess?: ({ shareId }: { shareId: string }) => void;
}

const useChatWithBotV4 = ({
    botToken,
    enableChat = true,
    isStoryIdRequired = true,
    onDone,
    onStarting,
    onStarted,
    onError,
    onFetchedSuccess,
}: UseChatWithBotProps) => {
    const snackbar = useSnackBar();
    const t = useTranslation();

    const {
        token,
        user: { userToken },
    } = useAccountContext();

    const { currentSelectedStoryId: storyId, setCurrentSelectedStoryId } = useChatContext();

    const [typingText, setText] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);

    useGetLatestStory({
        botToken,
        enable: isStoryIdRequired,
        onSuccess: (data) => {
            setCurrentSelectedStoryId(data.storyId);
        },
    });
    const {
        data: { history },
        isFetched,
        isFetching,
    } = useGetStoryDetail({
        storyId,
        enable: isStoryIdRequired,
        onSuccess: ({ shareId }) => {
            onFetchedSuccess?.({ shareId });
        },
    });

    const { mutateAsync: deleteStoryHistory } = useDeleteStoryHistory();

    const fetchChat = useCallback(
        async ({
            history = [],
            newMessage = null,
            isSubmitted = false,
        }: {
            history: Message[];
            newMessage?: string | null;
            isSubmitted?: boolean;
        }) => {
            if (!enableChat) return;
            if (!storyId && isStoryIdRequired) return;
            try {
                const url = CORE_HOST + "/chat/completions_v2";
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                    body: JSON.stringify({
                        streaming: true,
                        verbose: false,
                        botToken,
                        message: newMessage,
                        ownerToken: userToken,
                        storyId: isStoryIdRequired ? storyId : null,
                    }),
                });
                if (!response.ok) throw new Error(await response.text());

                const replyTime = formatTime2();
                const textDecoder = new TextDecoder();
                const reader = response.body?.getReader();
                let isStarted = false;
                let fullText = "";

                while (reader) {
                    const { done, value } = await reader.read();
                    if (done) {
                        reader.releaseLock();
                        onDone?.(isSubmitted);
                        setText("");
                        const newMessage: Message = {
                            content: fullText,
                            role: "assistant",
                            key: uuidv4(),
                            timestamp: replyTime,
                        };
                        setMessages([...history, newMessage]);
                        break;
                    }

                    if (!isStarted) {
                        isStarted = true;
                        const newMessage: Message = {
                            content: "",
                            role: "assistant",
                            key: uuidv4(),
                            timestamp: replyTime,
                        };
                        onStarted?.();
                        setMessages([...history, newMessage]);
                    }

                    const decodedText = textDecoder.decode(value);
                    if (decodedText) {
                        fullText += decodedText;
                        setText(fullText);
                    }
                }
            } catch (error: any) {
                const code = getChatErrorCode(error?.message);
                if (code) {
                    onError?.(code);
                    return;
                } else {
                    snackbar({
                        message: t("error.unKnownError"),
                        severity: "error",
                    });
                }
            }
        },
        [
            enableChat,
            storyId,
            isStoryIdRequired,
            token,
            botToken,
            userToken,
            onDone,
            onStarted,
            onError,
            snackbar,
            t,
        ]
    );

    const submitChat = useCallback(
        (text: string) => {
            const newMessage: Message = {
                content: text,
                role: "user",
                key: uuidv4(),
                timestamp: formatTime2(),
            };
            setMessages((messages) => [...messages, newMessage]);
            setText("");
            onStarting?.(text);
            fetchChat({
                history: [...messages, newMessage],
                newMessage: text,
                isSubmitted: true,
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [messages, onStarting, storyId]
    );

    const retry = useCallback(() => {
        fetchChat({
            history: messages,
            newMessage: messages[messages.length - 1].content,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);

    const clearChat = useCallback(() => {
        setMessages([]);
        deleteStoryHistory({
            storyId,
        });
        fetchChat({
            history: [],
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchChat, storyId]);

    useEffect(() => {
        setMessages([]);
    }, [botToken]);

    useEffect(() => {
        if (!isFetched && isStoryIdRequired) return;

        if (isFetching && isStoryIdRequired) return;

        if (!storyId && isStoryIdRequired) return;

        setMessages(history);

        if (history.length) {
            onDone?.();
            return;
        }

        fetchChat({
            history,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enableChat, isFetched, storyId, isStoryIdRequired, isFetching]);

    useEffect(() => {
        setMessages([]);
    }, [storyId]);

    return {
        storyId,
        messages,
        typingText,
        clearChat,
        submitChat,
        retry,
    };
};

export default useChatWithBotV4;
