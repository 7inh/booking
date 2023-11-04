import instance from "src/common/instances/instance";
import { OrganizeInsertParams } from "src/services/types";

const insert = async (rootPath: string, params: OrganizeInsertParams) => {
    return await instance.post(`${rootPath}/insert`, params);
};

export default insert;
