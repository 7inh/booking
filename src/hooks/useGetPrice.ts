import doQuery from "src/services/services";
import { AddressPrice } from "src/services/types";

export interface UseGetPriceProps extends AddressPrice {
    enable?: boolean;
    onSuccess?: (data: any) => void;
}

const useGetPrice = ({ enable = false, onSuccess, ...params }: UseGetPriceProps) => {
    const {
        data = [],
        isFetched,
        isFetching,
        refetch,
    } = doQuery({
        entity: "address",
        action: "price",
        params: {
            ...params,
        },
        option: {
            enable:
                enable &&
                Boolean(params.receiverProvince && params.receiverDistrict && params.productWeight),
            onSuccess: onSuccess,
            select: (data) => data?.data,
        },
    });

    return {
        data,
        isFetched,
        isFetching,
        refetch,
    };
};

export default useGetPrice;
