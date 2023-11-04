import { Message } from "src/common/types";
import doQuery from "src/services/services";
import { v4 as uuidv4 } from "uuid";

export interface UseGetLatestStoryProps {
    botToken: string;
    enable?: boolean;
    onSuccess?: (data: { storyId: string; history: Message[] }) => void;
}

const useGetLatestStory = (props: UseGetLatestStoryProps) => {
    const { botToken, enable, onSuccess } = props;
    const {
        data = {
            storyId: "",
            history: [],
        },
        isFetched,
        isLoading,
        isFetching,
    } = doQuery({
        entity: "bot",
        action: "storyLatest",
        params: {
            botToken,
        },
        option: {
            enable: Boolean(botToken) && (enable ?? true),
            select: (data) => {
                const history: Message[] = data?.data?.data?.history.flatMap(
                    ({
                        answer,
                        question,
                        createTime,
                    }: {
                        answer: string;
                        question: string;
                        createTime: string;
                    }) => [
                        {
                            key: uuidv4(),
                            role: "assistant",
                            content: answer,
                            timestamp: createTime,
                        },
                        {
                            key: uuidv4(),
                            role: "user",
                            content: question,
                            timestamp: createTime,
                        },
                    ]
                );
                return {
                    storyId: data?.data?.data?.storyId || "",
                    history: history || [],
                };
            },
            onSuccess: (data) => {
                onSuccess?.(data);
            },
        },
    });

    return {
        data,
        isFetched,
        isLoading,
        isFetching,
    };
};

export default useGetLatestStory;
