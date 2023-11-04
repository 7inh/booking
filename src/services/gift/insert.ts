import instance from "src/common/instances/instance";
import { GiftInsertParams } from "src/services/types";

const insert = async (rootPath: string, params: GiftInsertParams) => {
    return await instance.post(`${rootPath}/insert`, params);
};

export default insert;
