import { doMutation } from "src/services/services";

const usePublishBot = () => {
    const { mutateAsync } = doMutation({
        entity: "bot",
        action: "publish",
        option: {},
    });

    return {
        mutateAsync,
    };
};

export default usePublishBot;
