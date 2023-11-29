import { Book } from "src/common/types";
import doQuery from "src/services/services";

export interface UseGetRandomProps {
    onSuccess?: (data: any) => void;
}

export interface UseGetRandomReturn {
    data: Book[];
    isFetched: boolean;
    isFetching: boolean;
    refetch: () => void;
}

const useGetRandom = (props: UseGetRandomProps): UseGetRandomReturn => {
    const {
        data = [],
        isFetched,
        isFetching,
        refetch,
    } = doQuery({
        entity: "item",
        action: "getRandom",
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

export default useGetRandom;
