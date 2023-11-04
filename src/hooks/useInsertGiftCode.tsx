import { doMutation } from "src/services/services";

const useInsertGiftCode = () => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "gift",
        action: "insert",
        option: {},
    });

    return { mutateAsync, isLoading };
};

export default useInsertGiftCode;
