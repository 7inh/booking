import instance from "src/common/instances/instance";
import { BotStoryShareGetParams } from "src/services/types";

const storyShareGet = async (rootPath: string, params: BotStoryShareGetParams) => {
    const { shareId } = params;
    return await instance.get(`${rootPath}/story/share/get/${shareId}`);
};

export default storyShareGet;
