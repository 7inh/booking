import instance from "src/common/instances/instance";
import { OrganizeGetParams } from "src/services/types";

const joined = async (rootPath: string, params: OrganizeGetParams) => {
    return await instance.get(`${rootPath}/joined`, {
        params,
    });
};

export default joined;
