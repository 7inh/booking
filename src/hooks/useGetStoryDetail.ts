import { Message } from "src/common/types";
import { formatTime2 } from "src/common/utils";
import doQuery from "src/services/services";
import { v4 as uuidv4 } from "uuid";

export interface UseGetStoryDetailProps {
    storyId: string;
    enable?: boolean;
    onSuccess?: (props: { history: Message[]; shareId: string }) => void;
}

const useGetStoryDetail = (props: UseGetStoryDetailProps) => {
    const { storyId, enable, onSuccess } = props;
    const {
        data = {
            history: [],
        },
        isFetched,
        isLoading,
        isFetching,
        refetch,
    } = doQuery({
        entity: "bot",
        action: "storyDetail",
        params: {
            storyId,
        },
        option: {
            enable: Boolean(storyId) && (enable ?? true),
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
                        ...(question
                            ? [
                                  {
                                      key: uuidv4(),
                                      role: "user",
                                      content: question,
                                      timestamp: formatTime2(createTime),
                                  },
                              ]
                            : []),
                        {
                            key: uuidv4(),
                            role: "assistant",
                            content: answer,
                            timestamp: formatTime2(createTime),
                        },
                    ]
                );
                return {
                    history: history || [],
                    shareId: data?.data?.data?.shareId,
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
        refetch,
    };
};

export default useGetStoryDetail;
