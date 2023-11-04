import instance from "src/common/instances/instance";
import { BotGetAllTagsParams } from "src/services/types";

const getAllTags = async (rootPath: string, params: BotGetAllTagsParams) => {
    return await instance.get(`${rootPath}/get_all_tags`, {
        params,
    });
};

export default getAllTags;
