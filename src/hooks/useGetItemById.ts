import doQuery from "src/services/services";

export interface UseGetItemByIdProps {
    id?: number;
}

const useGetItemById = (props: UseGetItemByIdProps) => {
    const { id = 0 } = props;

    const { data, isFetched, isFetching, refetch } = doQuery({
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
