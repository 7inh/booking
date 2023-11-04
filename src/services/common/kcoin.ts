import instance from "src/common/instances/instance";
import { CommonKCoinParams } from "src/services/types";

const kcoin = async (rootPath: string, params: CommonKCoinParams) => {
    return await instance.get(`${rootPath}/kcoin`, { params });
};

export default kcoin;
