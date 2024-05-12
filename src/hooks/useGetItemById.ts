import { BookDetail } from "src/common/types";
import doQuery from "src/services/services";

export interface UseGetItemByIdProps {
    id?: string;
}

export interface UseGetItemByIdReturn {
    data: BookDetail;
    isFetched: boolean;
    isFetching: boolean;
    isSuccess: boolean;
    refetch: () => void;
}

const useGetItemById = (props: UseGetItemByIdProps): UseGetItemByIdReturn => {
    const { id = "" } = props;

    const {
        data = {
            id: "",
            description: "",
            publisher: 0,
            publishDate: "",
            cover: "",
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
            eps_num: 0,
        },
        isFetched,
        isFetching,
        isSuccess,
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
        isSuccess,
        refetch,
    };
};

export default useGetItemById;
