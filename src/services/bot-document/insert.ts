import instance from "src/common/instances/instance";
import { BotDocumentInsertParams } from "src/services/types";

const insert = async (rootPath: string, params: BotDocumentInsertParams) => {
    return await instance.post(`${rootPath}/insert`, params);
};

export default insert;
