import instance from "src/common/instances/instance";
import { MarketGetAllTagsParams } from "src/services/types";

const getAllTags = async (rootPath: string, params: MarketGetAllTagsParams) => {
    return await instance.get(`${rootPath}/get_all_tags`, {
        params,
    });
};

export default getAllTags;
