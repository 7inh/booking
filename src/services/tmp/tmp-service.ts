import paymentLog from "src/services/tmp/payment-log";

const path = "/tmp";
const tmpService = {
    paymentLog: (params: any) => paymentLog(path, params),
};

export default tmpService;
