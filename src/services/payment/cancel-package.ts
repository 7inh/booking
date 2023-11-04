import instance from "src/common/instances/instance";
import { PaymentCancelPackageParams } from "src/services/types";

const cancelPackage = async (path: string, params: PaymentCancelPackageParams) => {
    return await instance.post(`${path}/cancel_package`, params);
};

export default cancelPackage;
