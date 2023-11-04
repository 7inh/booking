import instance from "src/common/instances/instance";
import { OrganizeGroupDetailParams } from "src/services/types";

const detail = async (rootPath: string, params: OrganizeGroupDetailParams) => {
    return await instance.get(`${rootPath}/detail`, {
        params: {
            // isGeAll: params.isGetAll ?? false,
            // numPage: params.numPage ?? 1,
            // numRows: params.numRows ?? 10,
            ...params,
        },
    });
};

export default detail;
