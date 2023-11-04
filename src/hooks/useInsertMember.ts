import { doMutation } from "src/services/services";

const useInsertMember = () => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "organizeMember",
        action: "insert",
        option: {},
    });

    return { mutateAsync, isLoading };
};

export default useInsertMember;
