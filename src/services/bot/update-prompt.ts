import instance from "src/common/instances/instance";
import { BotUpdatePromptParams } from "src/services/types";

const updatePrompt = async (rootPath: string, { botToken, ...params }: BotUpdatePromptParams) => {
    return await instance.put(`${rootPath}/update_prompt/${botToken}`, params);
};

export default updatePrompt;
