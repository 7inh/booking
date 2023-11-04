import { MarketBotReviewParams } from "src/services/types";
import { doQuery } from "../services/services";

export interface UseGetBotReviewProps extends MarketBotReviewParams {
    enable?: boolean;
    onError?: (error: any) => void;
}

const useGetBotReview = (props: UseGetBotReviewProps) => {
    const { data, isFetched, isLoading, isFetching } = doQuery({
        entity: "market",
        action: "botReview",
        params: {
            botToken: props.botToken,
            isGetAll: props.isGetAll,
            numRows: props.numRows,
            numPage: props.numPage,
        },
        option: {
            enable: props?.enable ?? true,
            onError: props?.onError,
        },
    });

    return {
        data: data?.data?.data?.reviews || [],
        isFetched,
        isLoading,
        isFetching,
    };
};

export default useGetBotReview;
