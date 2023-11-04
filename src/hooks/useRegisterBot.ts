import { doMutation } from "src/services/services";

const useRegisterBot = () => {
    const { mutateAsync } = doMutation({
        entity: "bot",
        action: "register",
        option: {},
    });

    return {
        mutateAsync,
    };
};

export default useRegisterBot;
