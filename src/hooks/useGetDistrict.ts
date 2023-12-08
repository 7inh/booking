import doQuery from "src/services/services";
import { AddressDistrict } from "src/services/types";

export interface UseGetDistrictProps extends AddressDistrict {
    onSuccess?: (data: any) => void;
}

const useGetDistrict = ({ onSuccess, ...params }: UseGetDistrictProps) => {
    const {
        data = [],
        isFetched,
        isFetching,
        refetch,
    } = doQuery({
        entity: "address",
        action: "district",
        params: {
            provinceId: params?.provinceId,
        },
        option: {
            enable: !!params?.provinceId,
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

export default useGetDistrict;
