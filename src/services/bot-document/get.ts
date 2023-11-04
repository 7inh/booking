import instance from "src/common/instances/instance";
import { parseParams } from "src/common/utils";
import { BotDocumentGetParams } from "src/services/types";

const get = async (rootPath: string, params: BotDocumentGetParams) => {
    return await instance.get(`${rootPath}/get`, {
        params: { ...params, orderValue: "ASC", orderKey: "priority" },
        paramsSerializer: (params) => parseParams(params),
    });
};

export default get;
