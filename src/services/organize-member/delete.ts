import instance from "src/common/instances/instance";
import { OrganizeMemberDeleteParams } from "src/services/types";

const removeFromOrgOrGroup = async (rootPath: string, params: OrganizeMemberDeleteParams) => {
    return await instance.delete(`${rootPath}/delete`, {
        data: params,
    });
};

export default removeFromOrgOrGroup;
