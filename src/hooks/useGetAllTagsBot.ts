import { BotGetAllTagsParams } from "src/services/types";
import { doQuery } from "../services/services";

export interface UseGetAllTagsBotProps extends BotGetAllTagsParams {
    enable?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
}

const useGetAllTagsBot = (props?: UseGetAllTagsBotProps) => {
    const {
        data: response,
        isFetching,
        isFetched,
    } = doQuery({
        entity: "bot",
        action: "getAllTags",
        params: {},
        option: {
            enable: props?.enable ?? true,
            onError: props?.onError,
            onSuccess: (data) => {
                props?.onSuccess?.(data?.data?.voices);
            },
        },
    });

    return { data: response?.data?.data, isFetching, isFetched };
};

export default useGetAllTagsBot;
