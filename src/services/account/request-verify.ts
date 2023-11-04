import instance from "src/common/instances/instance";
import { AccountRequestVerifyParams } from "src/services/types";

const requestVerify = async (rootPath: string, params: AccountRequestVerifyParams) => {
    return await instance.post(`${rootPath}/request_verify`, params);
};

export default requestVerify;
