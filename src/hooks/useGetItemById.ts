import { BookDetail } from "src/common/types";
import doQuery from "src/services/services";

export interface UseGetItemByIdProps {
    id?: number;
}

export interface UseGetItemByIdReturn {
    data: BookDetail;
    isFetched: boolean;
    isFetching: boolean;
    refetch: () => void;
}

const useGetItemById = (props: UseGetItemByIdProps): UseGetItemByIdReturn => {
    const { id = 0 } = props;

    const {
        data = {
            description: "",
            publisher: 0,
            publishDate: "",
            author: "",
            size: "",
            weight: "",
            quantity: 0,
            sold: 0,
            pages: 0,
            current_price: 0,
            old_price: 0,
            format: 0,
            language: "",
            availability: 0,
            variant: "once",
            rare: 0,
        },
        isFetched,
        isFetching,
        refetch,
    } = doQuery({
        entity: "item",
        action: "getById",
        params: {
            id,
        },
        option: {
            enable: Boolean(id),
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

export default useGetItemById;
