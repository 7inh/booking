import { doMutation } from "src/services/services";

const useRegister = () => {
    const { mutateAsync } = doMutation({
        entity: "auth",
        action: "register",
        option: {},
    });

    return {
        mutateAsync,
    };
};

export default useRegister;
