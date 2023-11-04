import instance from "src/common/instances/instance";
import { MarketBuyParams } from "src/services/types";

const buy = async (rootPath: string, params: MarketBuyParams) => {
    return await instance.post(`${rootPath}/buy`, params);
};

export default buy;
