import doQuery from "src/services/services";

const useGetOrganizeGroup = ({ organizeId }: { organizeId: string }) => {
    const {
        data: response,
        refetch,
        isFetching,
    } = doQuery({
        entity: "organizeGroup",
        action: "get",
        params: {
            organizeId,
        },
        option: {
            enable: true,
        },
    });

    return {
        data: response?.data?.data,
        refetch,
        isFetching,
    };
};

export default useGetOrganizeGroup;
