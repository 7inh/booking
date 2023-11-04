import instance from "src/common/instances/instance";
import { OrganizeGetParams } from "src/services/types";

const get = async (rootPath: string, params: OrganizeGetParams) => {
    return await instance.get(`${rootPath}/get`, {
        params: {
            params,
            isGeAll: params.isGetAll ?? false,
            numPage: params.numPage ?? 1,
            numRows: params.numRows ?? 10,
        },
    });
};

export default get;
