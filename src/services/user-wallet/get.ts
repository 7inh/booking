import instance from "src/common/instances/instance";
import { UserWalletGetParams } from "src/services/types";

const get = async (rootPath: string, params: UserWalletGetParams) => {
    return await instance.get(`${rootPath}/get`, {
        params,
    });
};

export default get;
