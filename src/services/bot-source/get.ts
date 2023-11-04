import instance from "src/common/instances/instance";
import { parseParams } from "src/common/utils";
import { BotSourceGetParams } from "src/services/types";

const get = async (rootPath: string, params: BotSourceGetParams) => {
    return await instance.get(`${rootPath}/get`, {
        params,
        paramsSerializer: (params) => parseParams(params),
    });
};

export default get;
