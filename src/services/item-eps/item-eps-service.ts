import getByItemId from "src/services/item-eps/get_by_item_id";
import getPriceByItemEpsIds from "src/services/item-eps/get_price_by_item_eps_ids";
import { ItemEpsGetByItemId, ItemEpsGetPriceByItemEpsIds } from "src/services/types";

const path = "/item-eps";
const itemEpsService = {
    getByItemId: (params: ItemEpsGetByItemId) => getByItemId(path, params),
    getPriceByItemEpsIds: (params: ItemEpsGetPriceByItemEpsIds) =>
        getPriceByItemEpsIds(path, params),
};

export default itemEpsService;
