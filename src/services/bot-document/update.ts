import instance from "src/common/instances/instance";
import { BotDocumentUpdateParams } from "src/services/types";

const update = async (rootPath: string, params: BotDocumentUpdateParams) => {
    return await instance.put(`${rootPath}/update`, params);
};

export default update;
