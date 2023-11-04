import instance from "src/common/instances/instance";
import { AuthRegisterParams } from "src/services/types";

const register = async (rootPath: string, params: AuthRegisterParams) => {
    return await instance.post(`${rootPath}/register`, params);
};

export default register;
