import instance from "src/common/instances/instance";
import { AccountGetParams } from "src/services/types";

const get = async (rootPath: string, params: AccountGetParams) => {
    return await instance.get(`${rootPath}`, { params });
};

export default get;
