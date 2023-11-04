import { doMutation } from "src/services/services";

const useInitPayment = () => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "payment",
        action: "init",
        option: {},
    });

    return { mutateAsync, isLoading };
};

export default useInitPayment;
