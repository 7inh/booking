import instance from "src/common/instances/instance";
import { BotUpdateParams } from "src/services/types";

const update = async (rootPath: string, { botToken, ...params }: BotUpdateParams) => {
    return await instance.put(`${rootPath}/update/${botToken}`, params);
};

export default update;
