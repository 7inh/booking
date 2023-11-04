import doQuery from "src/services/services";

const useGetOrganizeJoined = () => {
    const {
        data: response,
        refetch,
        isFetching,
        isFetched,
    } = doQuery({
        entity: "organize",
        action: "joined",
        params: {},
        option: {
            enable: true,
        },
    });

    return {
        data: response?.data?.data,
        refetch,
        isFetching,
        isFetched,
    };
};

export default useGetOrganizeJoined;
