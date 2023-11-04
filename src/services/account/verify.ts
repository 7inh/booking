import instance from "src/common/instances/instance";
import { AccountVerifyParams } from "src/services/types";

const verify = async (rootPath: string, params: AccountVerifyParams) => {
    return await instance.put(`${rootPath}/verify`, params);
};

export default verify;
