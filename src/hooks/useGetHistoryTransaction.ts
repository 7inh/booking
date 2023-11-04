import { UserWalletGetTransactionParams } from "src/services/types";
import { doQuery } from "../services/services";

export interface UseGetHistoryTransactionProps extends UserWalletGetTransactionParams {
    onError?: (error: any) => void;
}

const useGetHistoryTransaction = ({ onError, ...params }: UseGetHistoryTransactionProps) => {
    const {
        data = [],
        isFetched,
        isLoading,
        isFetching,
    } = doQuery({
        entity: "userWallet",
        action: "getTransaction",
        params,
        option: {
            enable: Boolean(params?.walletId),
            onError,
            select: (data) => data?.data?.data?.data,
        },
    });

    return {
        data,
        isFetched,
        isLoading,
        isFetching,
    };
};

export default useGetHistoryTransaction;
