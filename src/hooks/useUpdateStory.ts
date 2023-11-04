import { doMutation } from "src/services/services";

const useUpdateStory = () => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "bot",
        action: "storyUpdate",
        option: {},
    });

    return { mutateAsync, isLoading };
};

export default useUpdateStory;
