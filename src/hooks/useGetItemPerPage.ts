import { FilterBookParams } from "src/common/types";
import doQuery from "src/services/services";

export interface UseGetItemPerPageProps {
    page: number;
    perPage: number;
    filter?: FilterBookParams;
    title?: string;
}

const useGetItemPerPage = (props: UseGetItemPerPageProps) => {
    const { page, perPage, filter, title } = props;
    const {
        data = [],
        isFetched,
        isFetching,
        refetch,
    } = doQuery({
        entity: "item",
        action: "getPerPage",
        params: {
            page,
            perPage,
            filter,
            title,
        },
        option: {
            enable: true,
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

export default useGetItemPerPage;
