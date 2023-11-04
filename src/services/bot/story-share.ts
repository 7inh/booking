import instance from "src/common/instances/instance";
import { BotStoryShareParams } from "src/services/types";

const storyShare = async (rootPath: string, params: BotStoryShareParams) => {
    const { storyId } = params;
    return await instance.post(`${rootPath}/story/share/init/${storyId}`, params);
};

export default storyShare;
