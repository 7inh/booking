import { doMutation } from "src/services/services";

const useAddBotFromMarket = () => {
    const { mutateAsync } = doMutation({
        entity: "market",
        action: "buy",
        option: {},
    });

    return {
        mutateAsync,
    };
};

export default useAddBotFromMarket;
