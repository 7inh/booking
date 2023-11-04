import instance from "src/common/instances/instance";
import { AccountPhoneVerifyParams } from "src/services/types";

const phoneVerify = async (rootPath: string, params: AccountPhoneVerifyParams) => {
    return await instance.put(`${rootPath}/phone_verify`, params);
};

export default phoneVerify;
