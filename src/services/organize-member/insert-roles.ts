import instance from "src/common/instances/instance";
import { OrganizeMemberInsertRolesParams } from "src/services/types";

const insertRoles = async (rootPath: string, params: OrganizeMemberInsertRolesParams) => {
    return await instance.post(`${rootPath}/roles/insert`, params);
};

export default insertRoles;
