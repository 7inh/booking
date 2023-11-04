import instance from "src/common/instances/instance";
import { CommonCountryParams } from "src/services/types";

const country = async (rootPath: string, params: CommonCountryParams) => {
    return await instance.get(`${rootPath}/country`, { params });
};

export default country;
