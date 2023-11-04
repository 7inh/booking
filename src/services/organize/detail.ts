import instance from "src/common/instances/instance";
import { OrganizeDetailParams } from "src/services/types";

const detail = async (rootPath: string, params: OrganizeDetailParams) => {
    return await instance.get(`${rootPath}/detail`, {
        params,
    });
};

export default detail;
