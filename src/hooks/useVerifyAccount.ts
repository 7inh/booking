import { doMutation } from "src/services/services";

const useVerifyAccount = () => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "account",
        action: "verify",
        option: {},
    });

    return { mutateAsync, isLoading };
};

export default useVerifyAccount;
