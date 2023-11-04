import instance from "src/common/instances/instance";
import { BotSourceInsertParams } from "src/services/types";

const insert = async (rootPath: string, params: BotSourceInsertParams) => {
    return await instance.post(`${rootPath}/insert`, params, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        timeout: 120000,
    });
};

export default insert;
