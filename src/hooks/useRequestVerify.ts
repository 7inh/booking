import { doMutation } from "src/services/services";

const useRequestVerify = () => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "account",
        action: "requestVerify",
        option: {},
    });

    return { mutateAsync, isLoading };
};

export default useRequestVerify;
