import instance from "src/common/instances/instance";
import { BotUpdateQPromptParams } from "src/services/types";

const updateQPrompt = async (rootPath: string, { botToken, ...params }: BotUpdateQPromptParams) => {
    return await instance.put(`${rootPath}/update_qprompt/${botToken}`, params);
};

export default updateQPrompt;
