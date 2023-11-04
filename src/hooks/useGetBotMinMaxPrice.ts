import doQuery from "src/services/services";
import { BotPublishGetMinMaxPriceParams } from "src/services/types";

export interface UseGetBotMinMaxPriceProps extends BotPublishGetMinMaxPriceParams {
    enable?: boolean;
    onSuccess?: (data: any) => void;
}

const useGetBotMinMaxPrice = (props: UseGetBotMinMaxPriceProps) => {
    const { botToken, enable, onSuccess } = props;

    const { data, isFetched, isLoading, isFetching } = doQuery({
        entity: "bot",
        action: "publishGetMinMaxPrice",
        params: {
            botToken,
        },
        option: {
            enable: enable ?? true,
            onSuccess,
            select: (data) => data?.data?.data,
        },
    });

    return {
        data,
        isFetched,
        isLoading,
        isFetching,
    };
};

export default useGetBotMinMaxPrice;
