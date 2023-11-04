import doQuery from "src/services/services";

export interface UseGetBotStoryProps {
    botToken: string;
    onSuccess?: (data: any) => void;
}

const useGetBotStory = (props: UseGetBotStoryProps) => {
    const { botToken, onSuccess } = props;
    const {
        data = [],
        isFetched,
        isLoading,
        isFetching,
        refetch,
    } = doQuery({
        entity: "bot",
        action: "story",
        params: {
            botToken,
        },
        option: {
            enable: Boolean(botToken),
            select: (data) => data?.data?.data,
            onSuccess,
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

export default useGetBotStory;
