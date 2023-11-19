import doQuery from "src/services/services";

export interface UseGetItemPerPageProps {
    page: number;
    perPage: number;
}

const useGetItemPerPage = (props: UseGetItemPerPageProps) => {
    const { page, perPage } = props;
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
