import { doMutation } from "../services/services";

const useDeleteStoryHistory = () => {
    const { mutate, mutateAsync, isSuccess, isError, isLoading } = doMutation({
        entity: "bot",
        action: "storyDeleteHist",
        option: {},
    });

    return { mutate, mutateAsync, isSuccess, isError, isLoading };
};

export default useDeleteStoryHistory;
