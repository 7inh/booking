import instance from "src/common/instances/instance";
import { ItemEpsGetByItemId } from "src/services/types";

const getByItemId = async (rootPath: string, { itemId, ...params }: ItemEpsGetByItemId) => {
    return await instance.get(`${rootPath}/get_by_item_id/${itemId}`, { params });
};

export default getByItemId;
