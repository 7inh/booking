import instance from "src/common/instances/instance";
import { BotDocumentCountParams } from "src/services/types";

const count = async (rootPath: string, params: BotDocumentCountParams) => {
    return await instance.get(`${rootPath}/count`, { params });
};

export default count;
