import instance from "src/common/instances/instance";
import { parseParams } from "src/common/utils";
import { OrganizeGroupGetParams } from "src/services/types";

const get = async (rootPath: string, params: OrganizeGroupGetParams) => {
    return await instance.get(`${rootPath}/get`, {
        params: {
            // isGeAll: params.isGetAll ?? false,
            // numPage: params.numPage ?? 1,
            // numRows: params.numRows ?? 10,
            ...params,
        },
        paramsSerializer: (params) => parseParams(params),
    });
};

export default get;
