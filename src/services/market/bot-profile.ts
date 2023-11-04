import instance from "src/common/instances/instance";
import { MarketBotProfileParams } from "src/services/types";

const botProfile = async (rootPath: string, { botToken, ...params }: MarketBotProfileParams) => {
    return await instance.get(`${rootPath}/bot_profile/${botToken}`, { params });
};

export default botProfile;
