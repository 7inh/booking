import instance from "src/common/instances/instance";
import { AuthVerifyTokenParams } from "src/services/types";

const verifyToken = async (rootPath: string, params: AuthVerifyTokenParams) => {
    return await instance.post(`${rootPath}/verify_token`, params);
};

export default verifyToken;
