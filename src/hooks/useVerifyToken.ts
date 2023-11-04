import { doMutation } from "src/services/services";

export interface UseLoginProps {}

const useVerifyToken = () => {
    const { mutateAsync } = doMutation({
        entity: "auth",
        action: "verifyToken",
        option: {},
    });

    return {
        mutateAsync,
    };
};

export default useVerifyToken;
