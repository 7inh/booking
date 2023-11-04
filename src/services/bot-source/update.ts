import instance from "src/common/instances/instance";
import { BotSourceUpdateParams } from "src/services/types";

const update = async (rootPath: string, params: BotSourceUpdateParams) => {
    return await instance.put(`${rootPath}/update`, params);
};

export default update;
