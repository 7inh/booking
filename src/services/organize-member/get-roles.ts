import instance from "src/common/instances/instance";
import { OrganizeMemberGetRoleParams } from "src/services/types";

const getRoles = async (rootPath: string, params: OrganizeMemberGetRoleParams) => {
    return await instance.get(`${rootPath}/roles/get`, { params });
};

export default getRoles;
