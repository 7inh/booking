import instance from "src/common/instances/instance";
import { AccountUpdateParams } from "src/services/types";

const update = async (rootPath: string, params: AccountUpdateParams) => {
    return await instance.put(`${rootPath}/update`, params);
};

export default update;
