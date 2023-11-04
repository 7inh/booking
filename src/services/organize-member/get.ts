import instance from "src/common/instances/instance";
import { OrganizeMemberGetParams } from "src/services/types";

const get = async (rootPath: string, params: OrganizeMemberGetParams) => {
    return await instance.get(`${rootPath}/get`, {
        params: {
            isGeAll: params.isGetAll ?? false,
            numPage: params.numPage ?? 1,
            numRows: params.numRows ?? 10,
            ...params,
        },
    });
};

export default get;
