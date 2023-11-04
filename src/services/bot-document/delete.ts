import instance from "src/common/instances/instance";
import { BotDocumentDeleteParams } from "src/services/types";

const deleteDocument = async (rootPath: string, params: BotDocumentDeleteParams) => {
    return await instance.delete(`${rootPath}/delete`, { params });
};

export default deleteDocument;
