import doQuery from "src/services/services";
import { AddressWard } from "src/services/types";

export interface UseGetWardProps extends AddressWard {
    onSuccess?: (data: any) => void;
}

const useGetWard = ({ onSuccess, ...params }: UseGetWardProps) => {
    const {
        data = [],
        isFetched,
        isFetching,
        refetch,
    } = doQuery({
        entity: "address",
        action: "ward",
        params: {
            districtId: params?.districtId,
        },
        option: {
            enable: !!params?.districtId,
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

export default useGetWard;
