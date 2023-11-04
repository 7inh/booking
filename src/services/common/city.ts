import instance from "src/common/instances/instance";
import { CommonCityParams } from "src/services/types";

const city = async (rootPath: string, params: CommonCityParams) => {
    return await instance.get(`${rootPath}/city`, { params });
};

export default city;
