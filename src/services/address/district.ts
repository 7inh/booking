import instance from "src/common/instances/instance";
import { AddressDistrict } from "src/services/types";

const district = async (rootPath: string, { provinceId, ...params }: AddressDistrict) => {
    return await instance.get(`${rootPath}/district/${provinceId}`, { params });
};

export default district;
