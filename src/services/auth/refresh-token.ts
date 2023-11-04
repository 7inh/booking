import instance from "src/common/instances/instance";
import { RefreshTokenParams } from "src/services/types";

const refreshToken = async (rootPath: string, params: RefreshTokenParams) => {
    return await instance.post(`${rootPath}/refresh_token`, params);
};

export default refreshToken;
