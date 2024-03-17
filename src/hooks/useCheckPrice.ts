import { doMutation } from "src/services/services";

const useCheckPrice = () => {
    return doMutation({
        entity: "itemEps",
        action: "getPriceByItemEpsIds",
    });
};

export default useCheckPrice;
