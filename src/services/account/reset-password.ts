import instance from "src/common/instances/instance";
import { AccountResetPasswordParams } from "src/services/types";

const resetPassword = async (rootPath: string, params: AccountResetPasswordParams) => {
    return await instance.post(`${rootPath}/reset_password`, params);
};

export default resetPassword;
