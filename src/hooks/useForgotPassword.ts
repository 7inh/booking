import { doMutation } from "../services/services";

const useForgotPassword = () => {
    const { mutate, mutateAsync, isSuccess, isError, isLoading } = doMutation({
        entity: "account",
        action: "forgotPassword",
        option: {},
    });

    return { mutate, mutateAsync, isSuccess, isError, isLoading };
};

export default useForgotPassword;
