import instance from "src/common/instances/instance";
import { CommonDistrictParams } from "src/services/types";

const district = async (rootPath: string, params: CommonDistrictParams) => {
    return await instance.get(`${rootPath}/district`, { params });
};

export default district;
