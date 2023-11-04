import instance from "src/common/instances/instance";
import { OrganizeMemberDeleteRolesParams } from "src/services/types";

const deleteRoles = async (rootPath: string, params: OrganizeMemberDeleteRolesParams) => {
    return await instance.delete(`${rootPath}/roles/delete`, {
        data: params,
    });
};

export default deleteRoles;
