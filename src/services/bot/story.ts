import instance from "src/common/instances/instance";
import { BotStoryParams } from "src/services/types";

const story = async (rootPath: string, { botToken }: BotStoryParams) => {
    return await instance.get(`${rootPath}/story/${botToken}`);
};

export default story;
