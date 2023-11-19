import instance from "src/common/instances/instance";
import { ItemGetById } from "src/services/types";

const getById = async (rootPath: string, { id, ...params }: ItemGetById) => {
    return await instance.get(`${rootPath}/get_by_id/${id}`, { params });
};

export default getById;
