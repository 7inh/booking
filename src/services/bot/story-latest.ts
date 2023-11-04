import instance from "src/common/instances/instance";
import { BotStoryLatestParams } from "src/services/types";

const storyLatest = async (rootPath: string, { botToken }: BotStoryLatestParams) => {
    return await instance.get(`${rootPath}/story/${botToken}/latest`);
};

export default storyLatest;
