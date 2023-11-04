import instance from "src/common/instances/instance";
import { MarketAllParams } from "src/services/types";

const userBots = async (rootPath: string, params: MarketAllParams) => {
    return await instance.get(`${rootPath}/user_bots`, { params });
};

export default userBots;
