import { Message } from "react-hook-form";
import { formatTime2 } from "src/common/utils";
import doQuery from "src/services/services";
import { BotStoryShareGetParams } from "src/services/types";
import { v4 as uuidv4 } from "uuid";

export interface UseGetShareStoryProps extends BotStoryShareGetParams {}

const useGetShareStory = (props: UseGetShareStoryProps) => {
    const { ...params } = props;
    const {
        data = {
            history: [],
        },
        refetch,
        isFetching,
    } = doQuery({
        entity: "bot",
        action: "storyShareGet",
        params: params,
        option: {
            enable: true,
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
                };
            },
        },
    });

    return {
        data,
        refetch,
        isFetching,
    };
};

export default useGetShareStory;
