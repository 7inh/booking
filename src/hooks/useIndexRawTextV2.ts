import { doMutation } from "src/services/services";

const useIndexRawTextV2 = () => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "botDocument",
        action: "insert",
        option: {},
    });

    return { mutateAsync, isLoading };
};

export default useIndexRawTextV2;
