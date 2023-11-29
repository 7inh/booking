import instance from "src/common/instances/instance";
import { ItemGetComingSoon } from "src/services/types";

const getComingSoon = async (rootPath: string, params: ItemGetComingSoon) => {
    return await instance.get(`${rootPath}/get_coming_soon`, { params });
};

export default getComingSoon;
