import { UserWalletGetParams, UserWalletGetTransactionParams } from "src/services/types";
import get from "src/services/user-wallet/get";
import getTransaction from "src/services/user-wallet/get-transaction";

const path = "/user_wallet";
const userWalletService = {
    get: (params: UserWalletGetParams) => get(path, params),
    getTransaction: (params: UserWalletGetTransactionParams) => getTransaction(path, params),
};

export default userWalletService;
