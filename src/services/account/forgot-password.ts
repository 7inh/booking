import instance from "src/common/instances/instance";
import { AccountForgotPasswordParams } from "src/services/types";

const forgotPassword = async (rootPath: string, params: AccountForgotPasswordParams) => {
    return await instance.get(`${rootPath}/forgot_password`, { params });
};

export default forgotPassword;
