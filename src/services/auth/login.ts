import instance from "src/common/instances/instance";
import { LoginParams } from "src/services/types";

const login = async (rootPath: string, params: LoginParams) => {
    return await instance.post(`${rootPath}/login`, params);
};

export default login;
