import init from "src/services/payment/init";
import { PaymentCancelPackageParams, PaymentInitParams } from "src/services/types";
import cancelPackage from "src/services/payment/cancel-package";

const path = "/payment";
const paymentService = {
    init: (params: PaymentInitParams) => init(path, params),
    cancelPackage: (params: PaymentCancelPackageParams) => cancelPackage(path, params),
};

export default paymentService;
