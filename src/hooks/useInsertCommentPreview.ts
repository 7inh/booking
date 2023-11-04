import { doMutation } from "src/services/services";

const useInsertCommentPreview = () => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "bot",
        action: "publishInsertCommentPreview",
        option: {},
    });

    return { mutateAsync, isLoading };
};

export default useInsertCommentPreview;
