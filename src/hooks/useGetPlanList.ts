import doQuery from "src/services/services";

const useGetPlanList = () => {
    const {
        data = [],
        refetch,
        isFetching,
    } = doQuery({
        entity: "common",
        action: "kcoin",
        params: {},
        option: {
            enable: true,
            select: (data) => data?.data?.data,
        },
    });

    return {
        data,
        refetch,
        isFetching,
    };
};

export default useGetPlanList;
