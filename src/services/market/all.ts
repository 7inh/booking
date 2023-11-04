import instance from "src/common/instances/instance";
import { parseParams } from "src/common/utils";
import { MarketAllParams } from "src/services/types";

const all = async (rootPath: string, params: MarketAllParams) => {
    return await instance.get(`${rootPath}/all`, {
        params: {
            ...params,
            orderKey: "createTime",
            orderValue: "DESC",
        },
        paramsSerializer: (params) => parseParams(params),
    });
};

export default all;
