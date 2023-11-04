import { doMutation } from "src/services/services";

const useGiftCode = () => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "gift",
        action: "use",
        option: {},
    });

    return { mutateAsync, isLoading };
};

export default useGiftCode;
