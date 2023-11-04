import getInfo from "src/services/gift/get-info";
import insert from "src/services/gift/insert";
import use from "src/services/gift/use";
import { GiftGetInfoParams, GiftInsertParams, GiftUseParams } from "src/services/types";

const path = "/gift";
const giftService = {
    insert: (params: GiftInsertParams) => insert(path, params),
    use: (params: GiftUseParams) => use(path, params),
    getInfo: (params: GiftGetInfoParams) => getInfo(path, params),
};

export default giftService;
