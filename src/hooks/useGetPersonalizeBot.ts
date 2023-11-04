import { AxiosError } from "axios";
import { getFilterKeysAndValues } from "src/common/utils";
import { MarketPersonalizeParams } from "src/services/types";
import { doQuery } from "../services/services";

export interface UseGetPersonalizeProps extends MarketPersonalizeParams {
    search?: string;
    tags?: string[];
    onSuccess?: (data: any) => void;
    onError?: (error: AxiosError) => void;
}

const useGetPersonalize = (props?: UseGetPersonalizeProps) => {
    const {
        data: response,
        isFetched,
        isLoading,
        isFetching,
    } = doQuery({
        entity: "market",
        action: "personalize",
        params: {
            isGetAll: false,
            numPage: props?.numPage || 1,
            numRows: props?.numRows || 9,
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
            onError: props?.onError,
            onSuccess: (data) => {
                props?.onSuccess?.(data?.data?.voices);
            },
        },
    });

    return { data: response?.data?.data?.bots || [], isFetched, isLoading, isFetching };
};

export default useGetPersonalize;
