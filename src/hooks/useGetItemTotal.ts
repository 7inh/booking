import doQuery from "src/services/services";

export interface UseGetItemTotalProps {}

const useGetItemTotal = () => {
    const {
        data = 0,
        isFetched,
        isFetching,
        refetch,
    } = doQuery({
        entity: "item",
        action: "getTotal",
        params: {},
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
