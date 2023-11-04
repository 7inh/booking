import instance from "src/common/instances/instance";
import { BotChatBodyParams } from "src/services/types";

const chatBody = async (rootPath: string, { botToken, messages }: BotChatBodyParams) => {
    return await instance.post(`${rootPath}/chat/${botToken}`, {
        messages,
    });
};

export default chatBody;
