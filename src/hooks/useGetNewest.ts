import { Book } from "src/common/types";
import doQuery from "src/services/services";

export interface UseGetNewestProps {
    onSuccess?: (data: any) => void;
}

export interface UseGetNewestReturn {
    data: Book[];
    isFetched: boolean;
    isFetching: boolean;
    refetch: () => void;
}

const useGetNewest = (props: UseGetNewestProps): UseGetNewestReturn => {
    const {
        data = [],
        isFetched,
        isFetching,
        refetch,
    } = doQuery({
        entity: "item",
        action: "getNewest",
        params: {},
        option: {
            enable: true,
            onSuccess: props?.onSuccess,
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

export default useGetNewest;
