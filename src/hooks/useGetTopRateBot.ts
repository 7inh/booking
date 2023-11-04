import { AxiosError } from "axios";
import { doQuery } from "../services/services";
import { MarketTopRateParams } from "src/services/types";

export interface UseGetTopRateProps extends MarketTopRateParams {
    onSuccess?: (data: any) => void;
    onError?: (error: AxiosError) => void;
}

const useGetTopRateBot = ({ onSuccess, onError, ...props }: UseGetTopRateProps) => {
    const {
        data = [],
        isFetched,
        isLoading,
        isFetching,
    } = doQuery({
        entity: "market",
        action: "topRate",
        params: {
            isGetAll: false,
            ...props,
        },
        option: {
            enable: true,
            onError,
            onSuccess,
            select: (data) => data?.data?.data?.bots,
        },
    });

    return { data, isFetched, isLoading, isFetching };
};

export default useGetTopRateBot;
