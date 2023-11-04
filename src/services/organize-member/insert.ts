import instance from "src/common/instances/instance";
import { OrganizeMemberInsertParams } from "src/services/types";

const insert = async (rootPath: string, params: OrganizeMemberInsertParams) => {
    return await instance.post(`${rootPath}/insert`, params);
};

export default insert;
