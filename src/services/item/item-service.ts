import getPerPage from "src/services/item/get_per_page";
import { ItemGetPerPage } from "src/services/types";

const path = "/item";
const itemService = {
    getPerPage: (params: ItemGetPerPage) => getPerPage(path, params),
};

export default itemService;
