import { doMutation } from "src/services/services";

const useVerifyPhone = () => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "account",
        action: "phoneVerify",
        option: {},
    });

    return { mutateAsync, isLoading };
};

export default useVerifyPhone;
