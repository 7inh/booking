import instance from "src/common/instances/instance";
import { AddressPrice } from "src/services/types";

const price = async (rootPath: string, params: AddressPrice) => {
    return await instance.get(`${rootPath}/price`, {
        params: {
            ...params,
            productWeight: params.productWeight + 300,
            senderProvince: 2,
            senderDistrict: 39,
        },
    });
};

export default price;
