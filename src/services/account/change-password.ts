import instance from "src/common/instances/instance";
import { AccountChangePasswordParams } from "src/services/types";

const changePassword = async (rootPath: string, params: AccountChangePasswordParams) => {
    return await instance.post(`${rootPath}/change_password`, params);
};

export default changePassword;
