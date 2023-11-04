import instance from "src/common/instances/instance";
import { AccountVerifyResetPasswordParams } from "src/services/types";

const verifyResetPassword = async (rootPath: string, params: AccountVerifyResetPasswordParams) => {
    return await instance.post(`${rootPath}/verify_reset_password`, params);
};

export default verifyResetPassword;
