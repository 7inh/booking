import instance from "src/common/instances/instance";
import { AddressWard } from "src/services/types";

const ward = async (rootPath: string, { districtId, ...params }: AddressWard) => {
    return await instance.get(`${rootPath}/ward/${districtId}`, { params });
};

export default ward;
