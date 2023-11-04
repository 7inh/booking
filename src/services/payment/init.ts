import instance from "src/common/instances/instance";
import { PaymentInitParams } from "src/services/types";

const init = async (path: string, params: PaymentInitParams) => {
    return await instance.post(`${path}/init`, params);
};

export default init;
