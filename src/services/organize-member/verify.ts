import instance from "src/common/instances/instance";
import { OrganizeMemberVerifyParams } from "src/services/types";

const verifyInvite = async (rootPath: string, params: OrganizeMemberVerifyParams) => {
    return await instance.post(`${rootPath}/verify`, params);
};

export default verifyInvite;
