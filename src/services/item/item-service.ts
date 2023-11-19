import getById from "src/services/item/get_by_id";
import getPerPage from "src/services/item/get_per_page";
import getTotal from "src/services/item/get_total";
import { ItemGetById, ItemGetPerPage, ItemGetTotal } from "src/services/types";

const path = "/item";
const itemService = {
    getPerPage: (params: ItemGetPerPage) => getPerPage(path, params),
    getTotal: (params: ItemGetTotal) => getTotal(path, params),
    getById: (params: ItemGetById) => getById(path, params),
};

export default itemService;
