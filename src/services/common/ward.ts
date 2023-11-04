import instance from "src/common/instances/instance";
import { CommonWardParams } from "src/services/types";

const ward = async (rootPath: string, params: CommonWardParams) => {
    return await instance.get(`${rootPath}/ward`, { params });
};

export default ward;
