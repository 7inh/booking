import instance from "src/common/instances/instance";
import { BotOrgPublishInfoParams } from "src/services/types";

const publishInfo = async (rootPath: string, { botToken }: BotOrgPublishInfoParams) => {
    return await instance.get(`${rootPath}/publish/info/${botToken}`);
};

export default publishInfo;
