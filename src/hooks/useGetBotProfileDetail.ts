import { Bot } from "src/common/types";
import { doQuery } from "../services/services";

export interface UseGetBotProfileProps {
    onSuccess?: (data: any) => void;
    botToken: string;
    onError?: (error: any) => void;
}

export interface UseGetBotProfileReturn {
    bot: Bot;
    refetch: () => void;
    isFetching: boolean;
    isFetched: boolean;
    isLoading: boolean;
}

const useGetBotProfileDetail = ({
    botToken,
    onSuccess,
    onError,
}: UseGetBotProfileProps): UseGetBotProfileReturn => {
    const {
        data: response,
        refetch: refetchBotProfile,
        isFetching,
        isFetched,
        isLoading,
    } = doQuery({
        entity: "bot",
        action: "profile",
        params: {
            botToken,
        },
        option: {
            enable: Boolean(botToken),
            onError,
            onSuccess: (data) => {
                onSuccess?.(data?.data?.data);
            },
        },
    });

    const refetch = () => {
        refetchBotProfile();
    };

    if (response?.data && response?.data?.success) {
        const { data: bot } = response.data;
        return {
            bot: {
                id: bot.botToken,
                authName: bot.authName,
                avatar: bot.avatar,
                botName: bot.botName,
                description: bot.description,
                version: bot.version,
                level: bot.level,
                ownerToken: bot.ownerToken,
                facts: bot.facts,
                tags: bot.tags,
                price: bot.price,
                isPublic: bot.isPublic,
                voiceId: bot.voiceId,
                language: bot.language,
                prompt: bot.prompt,
                promptVariable: bot.promptVariable,
                qPrompt: bot.qPrompt,
                qPromptVariable: bot.qPromptVariable,
                organizeId: bot.organizeId,
                groupId: bot.groupId,
                editable: bot.editable,
                onlyContext: bot.onlyContext,
                withDraw: bot.withDraw,
                llm: bot.llm,
                startMessage: bot.startMessage,
                chatColor: bot.chatColor || "",
                botType: bot.botType,
                publishNote: bot.publishNote,
                publishManual: bot.publishManual,
                publishDescription: bot.publishDescription,
            },
            refetch,
            isFetching,
            isFetched,
            isLoading,
        };
    }

    return {
        bot: {} as Bot,
        refetch: () => {},
        isFetching: false,
        isFetched,
        isLoading,
    };
};

export default useGetBotProfileDetail;
