import { doMutation } from "src/services/services";

const useInsertOrganizeGroup = () => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "organizeGroup",
        action: "insert",
        option: {},
    });

    return { mutateAsync, isLoading };
};

export default useInsertOrganizeGroup;
