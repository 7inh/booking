import instance from "src/common/instances/instance";
import { UserWalletGetTransactionParams } from "src/services/types";

const getTransaction = async (rootPath: string, params: UserWalletGetTransactionParams) => {
    return await instance.get(`${rootPath}/get_transaction_web`, {
        params,
    });
};

export default getTransaction;
