import instance from "src/common/instances/instance";
import { MarketPersonalizeParams } from "src/services/types";

const personalize = async (rootPath: string, params: MarketPersonalizeParams) => {
    return await instance.get(`${rootPath}/personalize`, { params });
};

export default personalize;
