import { MarketAllParams } from "src/services/types";
import { doQuery } from "../services/services";

export interface UseMarketAllTagsProps extends MarketAllParams {
    enable?: boolean;
    onError?: (error: any) => void;
}

const useGetMarketAllTags = (props: UseMarketAllTagsProps) => {
    const { data, isFetched, isLoading, isFetching } = doQuery({
        entity: "market",
        action: "getAllTags",
        params: {},
        option: {
            enable: props?.enable ?? true,
            onError: props?.onError,
        },
    });

    return {
        data: data?.data?.data || [],
        isFetched,
        isLoading,
        isFetching,
    };
};

export default useGetMarketAllTags;
