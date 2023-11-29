import instance from "src/common/instances/instance";
import { ItemGetNewest } from "src/services/types";

const getNewest = async (rootPath: string, params: ItemGetNewest) => {
    return await instance.get(`${rootPath}/get_newest`, { params });
};

export default getNewest;
