import instance from "src/common/instances/instance";
import { BotPublishInfoParams } from "src/services/types";

const publishInfo = async (rootPath: string, { botToken }: BotPublishInfoParams) => {
    return await instance.get(`${rootPath}/publish/info/${botToken}`);
};

export default publishInfo;
