import instance from "src/common/instances/instance";

const paymentLog = async (rootPath: string, params: any) => {
    return await instance.post(
        `https://api.kamibrain.dev.kamiverse.ai/api${rootPath}/payment_log`,
        params
    );
};

export default paymentLog;
