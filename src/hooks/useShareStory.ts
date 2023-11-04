import { doMutation } from "src/services/services";

const useShareStory = () => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "bot",
        action: "storyShare",
        option: {},
    });

    return { mutateAsync, isLoading };
};

export default useShareStory;
