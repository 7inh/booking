import instance from "src/common/instances/instance";
import { BotPublishDeleteRequestParams } from "src/services/types";

const publishDeleteRequest = async (rootPath: string, params: BotPublishDeleteRequestParams) => {
    return await instance.delete(`${rootPath}/publish/delete_request`, {
        data: params,
    });
};

export default publishDeleteRequest;
