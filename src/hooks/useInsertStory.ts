import { doMutation } from "src/services/services";

const useInsertStory = () => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "bot",
        action: "storyInsert",
        option: {},
    });

    return { mutateAsync, isLoading };
};

export default useInsertStory;
