import getById from "src/services/item/get_by_id";
import getComingSoon from "src/services/item/get_coming_soon";
import getNewest from "src/services/item/get_newest";
import getPerPage from "src/services/item/get_per_page";
import getPopular from "src/services/item/get_popular";
import getRandom from "src/services/item/get_random";
import getTotal from "src/services/item/get_total";
import {
    ItemGetById,
    ItemGetComingSoon,
    ItemGetNewest,
    ItemGetPerPage,
    ItemGetPopular,
    ItemGetRadom,
    ItemGetTotal,
} from "src/services/types";

const path = "/item";
const itemService = {
    getPerPage: (params: ItemGetPerPage) => getPerPage(path, params),
    getTotal: (params: ItemGetTotal) => getTotal(path, params),
    getById: (params: ItemGetById) => getById(path, params),
    getRandom: (params: ItemGetRadom) => getRandom(path, params),
    getPopular: (params: ItemGetPopular) => getPopular(path, params),
    getNewest: (params: ItemGetNewest) => getNewest(path, params),
    getComingSoon: (params: ItemGetComingSoon) => getComingSoon(path, params),
};

export default itemService;
