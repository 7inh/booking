import instance from "src/common/instances/instance";
import { ItemEpsGetPriceByItemEpsIds } from "src/services/types";

const getPriceByItemEpsIds = async (rootPath: string, params: ItemEpsGetPriceByItemEpsIds) => {
    return await instance.get(`${rootPath}/get_price_by_item_eps_ids`, { params });
};

export default getPriceByItemEpsIds;
