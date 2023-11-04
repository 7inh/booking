import { doMutation } from "src/services/services";

const useInsertOrganize = () => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "organize",
        action: "insert",
        option: {},
    });

    return { mutateAsync, isLoading };
};

export default useInsertOrganize;
