import instance from "src/common/instances/instance";
import { BotStoryDeleteParams } from "src/services/types";

const storyDelete = async (rootPath: string, { storyId }: BotStoryDeleteParams) => {
    return await instance.delete(`${rootPath}/story/delete/${storyId}`);
};

export default storyDelete;
