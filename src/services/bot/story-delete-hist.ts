import instance from "src/common/instances/instance";
import { BotStoryDeleteHistoryParams } from "src/services/types";

const storyDeleteHist = async (rootPath: string, { storyId }: BotStoryDeleteHistoryParams) => {
    return await instance.delete(`${rootPath}/story/delete_hist/${storyId}`);
};

export default storyDeleteHist;
