import { doMutation } from "src/services/services";

const useIndexFileV2 = () => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "botSource",
        action: "insert",
        option: {},
    });
    return { indexFile: mutateAsync, isLoading };
};

export default useIndexFileV2;
