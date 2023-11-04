import doQuery from "src/services/services";

const useGetOrganizeDetail = ({ organizeId }: { organizeId: string }) => {
    const {
        data: response,
        refetch,
        isFetching,
        isFetched,
    } = doQuery({
        entity: "organize",
        action: "detail",
        params: {
            id: organizeId,
        },
        option: {
            enable: Boolean(organizeId),
        },
    });

    return {
        data: response?.data?.data,
        refetch,
        isFetching,
        isFetched,
    };
};

export default useGetOrganizeDetail;
