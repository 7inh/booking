import instance from "src/common/instances/instance";
import { OrganizeGroupJoinedParams } from "src/services/types";

const joined = async (rootPath: string, params: OrganizeGroupJoinedParams) => {
    return await instance.get(`${rootPath}/joined`, {
        params,
    });
};

export default joined;
