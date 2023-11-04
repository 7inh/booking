import instance from "src/common/instances/instance";
import { BotSourceDeleteParams } from "src/services/types";

const deleteSource = async (rootPath: string, params: BotSourceDeleteParams) => {
    return await instance.delete(`${rootPath}/delete`, { params });
};

export default deleteSource;
