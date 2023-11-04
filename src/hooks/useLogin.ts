import { doMutation } from "src/services/services";

const useLogin = () => {
    const { mutateAsync } = doMutation({
        entity: "auth",
        action: "login",
        option: {},
    });

    return {
        mutateAsync,
    };
};

export default useLogin;
