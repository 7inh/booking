import { doMutation } from "src/services/services";

const useResetPassword = () => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "account",
        action: "resetPassword",
        option: {},
    });

    return { mutateAsync, isLoading };
};

export default useResetPassword;
