import instance from "src/common/instances/instance";
import { ItemGetByIds } from "src/services/types";

const getByIds = async (rootPath: string, { ids, ...params }: ItemGetByIds) => {
    return await instance.get(`${rootPath}/get_by_ids/${ids.join(",")}`, { params });
};

export default getByIds;
