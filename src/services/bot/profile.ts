import instance from "src/common/instances/instance";
import { BotProfileParams } from "src/services/types";

const profile = async (rootPath: string, params: BotProfileParams) => {
    return await instance.get(`${rootPath}/profile`, {
        params,
    });
};

export default profile;
