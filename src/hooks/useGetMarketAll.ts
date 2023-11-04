import { getFilterKeysAndValues } from "src/common/utils";
import { MarketAllParams } from "src/services/types";
import { doQuery } from "../services/services";

export interface UseMarketAllProps extends MarketAllParams {
    search?: string;
    tags?: string[];
    onError?: (error: any) => void;
}

const useGetMarketAll = (props: UseMarketAllProps) => {
    const { data, isFetched, isLoading, isFetching } = doQuery({
        entity: "market",
        action: "all",
        params: {
            isGetAll: false,
            numPage: props.numPage || 1,
            numRows: props.numRows || 9,
            organizeId: props?.organizeId,
            groupId: props?.groupId,
            ...(getFilterKeysAndValues(
                {
                    botName: props?.search ? [props?.search] : [],
                    tags: props?.tags || [],
                },
                ["botName", "tags"]
            ) || {}),
        },
        option: {
            enable: true,
            onError: props.onError,
        },
    });

    return {
        data: data?.data?.data?.bots || [],
        isFetched,
        isLoading,
        isFetching,
    };
};

export default useGetMarketAll;
