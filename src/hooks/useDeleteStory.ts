import { doMutation } from "../services/services";

const useDeleteStory = () => {
    const { mutate, mutateAsync, isSuccess, isError, isLoading } = doMutation({
        entity: "bot",
        action: "storyDelete",
        option: {},
    });

    return { mutate, mutateAsync, isSuccess, isError, isLoading };
};

export default useDeleteStory;
