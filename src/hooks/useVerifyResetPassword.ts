import { doMutation } from "src/services/services";

const useVerifyResetPassword = () => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "account",
        action: "verifyResetPassword",
        option: {},
    });

    return { mutateAsync, isLoading };
};

export default useVerifyResetPassword;
