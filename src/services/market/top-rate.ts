import instance from "src/common/instances/instance";
import { MarketTopRateParams } from "src/services/types";

const topRate = async (rootPath: string, params: MarketTopRateParams) => {
    return await instance.get(`${rootPath}/top_rate`, { params });
};

export default topRate;
