import { Book } from "src/common/types";
import doQuery from "src/services/services";

export interface UseGetPopularProps {
    onSuccess?: (data: any) => void;
}

export interface UseGetPopularReturn {
    data: Book[];
    isFetched: boolean;
    isFetching: boolean;
    refetch: () => void;
}

const useGetPopular = (props: UseGetPopularProps): UseGetPopularReturn => {
    const {
        data = [],
        isFetched,
        isFetching,
        refetch,
    } = doQuery({
        entity: "item",
        action: "getPopular",
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

export default useGetPopular;
