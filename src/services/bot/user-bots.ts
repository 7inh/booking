import instance from "src/common/instances/instance";
import { parseParams } from "src/common/utils";
import { BotUserBotParams } from "src/services/types";

const userBots = async (rootPath: string, params: BotUserBotParams) => {
    return await instance.get(`${rootPath}/user_bots`, {
        params,
        paramsSerializer: (params) => parseParams(params),
    });
};

export default userBots;
