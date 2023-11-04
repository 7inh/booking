import instance from "src/common/instances/instance";
import { OrganizeGroupDeleteParams } from "src/services/types";

const deleteGroup = async (rootPath: string, params: OrganizeGroupDeleteParams) => {
    return await instance.delete(`${rootPath}/delete`, {
        params,
    });
};

export default deleteGroup;
