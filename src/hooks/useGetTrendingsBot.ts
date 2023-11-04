import { AxiosError } from "axios";
import { MarketTrendingsParams } from "src/services/types";
import { doQuery } from "../services/services";

export interface UseGetTrendingsProps extends MarketTrendingsParams {
    onSuccess?: (data: any) => void;
    onError?: (error: AxiosError) => void;
}

const useGetTrendingsBot = ({ onSuccess, onError, ...props }: UseGetTrendingsProps) => {
    const {
        data: response,
        isFetched,
        isLoading,
        isFetching,
    } = doQuery({
        entity: "market",
        action: "trendings",
        params: {
            isGetAll: false,
            ...props,
        },
        option: {
            enable: true,
            onError,
            onSuccess: (data) => {
                onSuccess?.(data?.data?.data?.bots);
            },
        },
    });

    return { data: response?.data?.data?.bots || [], isFetched, isLoading, isFetching };
};

export default useGetTrendingsBot;
