import instance from "src/common/instances/instance";
import { BotStoryLatestParams } from "src/services/types";

const storyInsert = async (rootPath: string, params: BotStoryLatestParams) => {
    return await instance.post(`${rootPath}/story/insert`, params);
};

export default storyInsert;
