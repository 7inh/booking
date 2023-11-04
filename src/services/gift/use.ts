import instance from "src/common/instances/instance";
import { GiftUseParams } from "src/services/types";

const use = async (rootPath: string, params: GiftUseParams) => {
    return await instance.post(`${rootPath}/use`, params);
};

export default use;
