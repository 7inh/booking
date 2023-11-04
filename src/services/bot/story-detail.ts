import instance from "src/common/instances/instance";
import { BotStoryDetailParams } from "src/services/types";

const storyDetail = async (rootPath: string, { storyId }: BotStoryDetailParams) => {
    return await instance.get(`${rootPath}/story/detail/${storyId}`);
};

export default storyDetail;
