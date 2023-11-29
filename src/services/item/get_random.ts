import instance from "src/common/instances/instance";
import { ItemGetPopular } from "src/services/types";

const getRandom = async (rootPath: string, params: ItemGetPopular) => {
    return await instance.get(`${rootPath}/get_random`, { params });
};

export default getRandom;
