import { AxiosError } from "axios";
import { MarketBotProfileParams } from "src/services/types";
import { doQuery } from "../services/services";
import { toArray } from "src/common/utils";

export interface UseMarketBotProfileProps extends MarketBotProfileParams {
    enable?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (error: AxiosError) => void;
}

const useGetMarketBotProfile = (props: UseMarketBotProfileProps) => {
    const { data, isFetched, isLoading, isFetching, refetch } = doQuery({
        entity: "market",
        action: "botProfile",
        params: {
            botToken: props.botToken,
        },
        option: {
            enable: props?.enable ?? true,
            onError: props.onError,
            onSuccess: (data: any) => {
                props?.onSuccess?.(data);
            },
        },
    });

    return {
        data: { ...data?.data?.data, tags: toArray(data?.data?.data?.tags) },
        isFetched,
        isLoading,
        isFetching,
        refetch,
    };
};

export default useGetMarketBotProfile;
