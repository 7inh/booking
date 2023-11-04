import instance from "src/common/instances/instance";
import { BotStoryUpdateParams } from "src/services/types";

const storyUpdate = async (rootPath: string, params: BotStoryUpdateParams) => {
    return await instance.put(`${rootPath}/story/update`, params);
};

export default storyUpdate;
