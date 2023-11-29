import instance from "src/common/instances/instance";
import { ItemGetRadom } from "src/services/types";

const getPopular = async (rootPath: string, params: ItemGetRadom) => {
    return await instance.get(`${rootPath}/get_popular`, { params });
};

export default getPopular;
