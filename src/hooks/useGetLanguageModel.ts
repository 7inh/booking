import { AxiosError } from "axios";
import { doQuery } from "../services/services";
import { CommonLLMParams } from "src/services/types";

export interface UseGetLanguageModelProps extends CommonLLMParams {
    enable?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (error: AxiosError) => void;
}

const useGetLanguageModel = ({
    enable,
    onSuccess,
    onError,
    ...params
}: UseGetLanguageModelProps) => {
    const {
        data: response,
        refetch,
        isFetching,
        isFetched,
    } = doQuery({
        entity: "common",
        action: "llm",
        params: params,
        option: {
            enable: enable ?? true,
            onError,
            onSuccess: (data: any) => {
                onSuccess && onSuccess(data?.data?.data);
            },
        },
    });

    return {
        data: response?.data?.data || [],
        refetch,
        isFetching,
        isFetched,
    };
};

export default useGetLanguageModel;
