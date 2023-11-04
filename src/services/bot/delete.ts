import instance from "src/common/instances/instance";
import { BotDeleteParams } from "src/services/types";

const deleteBot = async (rootPath: string, { botToken, ...params }: BotDeleteParams) => {
    return await instance.delete(`${rootPath}/delete/${botToken}`, params);
};

export default deleteBot;
