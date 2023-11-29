import { Book } from "src/common/types";
import doQuery from "src/services/services";

export interface UseGetComingSoonProps {
    onSuccess?: (data: any) => void;
}

export interface UseGetComingSoonReturn {
    data: Book[];
    isFetched: boolean;
    isFetching: boolean;
    refetch: () => void;
}

const useGetComingSoon = (props: UseGetComingSoonProps): UseGetComingSoonReturn => {
    const {
        data = [],
        isFetched,
        isFetching,
        refetch,
    } = doQuery({
        entity: "item",
        action: "getComingSoon",
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

export default useGetComingSoon;
