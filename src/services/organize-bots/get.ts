import instance from "src/common/instances/instance";
import { OrganizeBotsGetParams } from "src/services/types";

const get = async (rootPath: string, params: OrganizeBotsGetParams) => {
    return await instance.get(`${rootPath}/get`, {
        params,
    });
};

export default get;
