import { FilterBookParams } from "src/common/types";
import doQuery from "src/services/services";

export interface UseGetItemTotalProps {
    filter?: FilterBookParams;
}

const useGetItemTotal = ({ filter }: UseGetItemTotalProps) => {
    const {
        data = 0,
        isFetched,
        isFetching,
        refetch,
    } = doQuery({
        entity: "item",
        action: "getTotal",
        params: {
            filter,
        },
        option: {
            enable: true,
            select: (data) => data?.data?.total,
        },
    });

    return {
        data,
        isFetched,
        isFetching,
        refetch,
    };
};

export default useGetItemTotal;
