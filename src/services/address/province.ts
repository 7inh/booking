import instance from "src/common/instances/instance";
import { AddressProvince } from "src/services/types";

const province = async (rootPath: string, params: AddressProvince) => {
    return await instance.get(`${rootPath}/province`, { params });
};

export default province;
