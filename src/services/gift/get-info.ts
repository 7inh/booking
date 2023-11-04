import instance from "src/common/instances/instance";
import { GiftGetInfoParams } from "src/services/types";

const getInfo = async (rootPath: string, params: GiftGetInfoParams) => {
    return await instance.get(`${rootPath}/get_info`, { params });
};

export default getInfo;
