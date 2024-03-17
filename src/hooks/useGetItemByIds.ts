import { CartData } from "src/common/types";
import doQuery from "src/services/services";

export interface UseGetItemByIdsProps {
    ids?: string[];
    onSuccess?: (data: CartData) => void;
}

const useGetItemByIds = (props: UseGetItemByIdsProps) => {
    const { ids = [], onSuccess } = props;

    const { data, isFetched, isFetching, refetch } = doQuery({
        entity: "item",
        action: "getByIds",
        params: {
            ids,
        },
        option: {
            enable: ids.length > 0,
            select: (data) => data?.data,
            onSuccess,
        },
    });

    return {
        data,
        isFetched,
        isFetching,
        refetch,
    };
};

export default useGetItemByIds;
