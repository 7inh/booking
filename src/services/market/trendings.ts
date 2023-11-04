import instance from "src/common/instances/instance";
import { MarketTrendingsParams } from "src/services/types";

const trendings = async (rootPath: string, params: MarketTrendingsParams) => {
    return await instance.get(`${rootPath}/trendings`, { params });
};

export default trendings;
